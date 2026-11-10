-- ====================================================================
-- IKAAI ACADEMY / LIBRARY – PROFESSIONAL SUPPORT INBOX SCHEMA
-- Migration: 20261102_support_inbox_schema.sql
-- ====================================================================

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE (Augmented for RBAC and support routing)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'learner' check (role in ('learner', 'instructor', 'admin')),
  programme text not null default 'hr',
  avatar_url text,
  display_name text,
  email text,
  updated_at timestamptz default now()
);

-- Trigger to automatically create or update profile on user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, display_name, email, role, programme)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    new.email,
    coalesce(new.raw_user_meta_data->>'role', 'learner'),
    coalesce(new.raw_user_meta_data->>'programme', 'hr')
  )
  on conflict (id) do update
  set
    display_name = coalesce(excluded.display_name, public.profiles.display_name),
    email = coalesce(excluded.email, public.profiles.email),
    updated_at = now();
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helper security definer functions to prevent recursive RLS queries
create or replace function public.get_user_role(user_id uuid)
returns text as $$
  select role from public.profiles where id = user_id;
$$ language sql stable security definer;

create or replace function public.get_user_programme(user_id uuid)
returns text as $$
  select programme from public.profiles where id = user_id;
$$ language sql stable security definer;


-- 2. MESSAGE THREADS TABLE
create table if not exists public.message_threads (
  id uuid primary key default gen_random_uuid(),
  learner_id uuid references auth.users(id) on delete cascade not null,
  instructor_id uuid references auth.users(id) on delete set null,
  programme text not null,
  category text not null check (category in ('Module question', 'Technical issue', 'Exam or grading', 'Leave or attendance', 'Other')),
  module_id text,
  subject text not null check (char_length(subject) <= 120),
  status text not null default 'Open' check (status in ('Open', 'Answered', 'Resolved')),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  last_message_at timestamptz default now() not null,
  rating text check (rating in ('helpful', 'unhelpful')),
  rating_comment text check (rating_comment is null or char_length(rating_comment) <= 300),
  resolved_at timestamptz
);

create index if not exists idx_threads_learner on public.message_threads(learner_id);
create index if not exists idx_threads_programme on public.message_threads(programme);
create index if not exists idx_threads_status on public.message_threads(status);
create index if not exists idx_threads_last_message on public.message_threads(last_message_at desc);


-- 3. MESSAGES TABLE
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid references public.message_threads(id) on delete cascade not null,
  sender_id uuid references auth.users(id) on delete cascade not null,
  body text not null check (char_length(body) <= 2000),
  attachment_urls jsonb default '[]'::jsonb not null,
  created_at timestamptz default now() not null,
  read_at timestamptz
);

create index if not exists idx_messages_thread on public.messages(thread_id, created_at asc);
create index if not exists idx_messages_sender on public.messages(sender_id);


-- 4. CANNED REPLIES TABLE (Saved Templates)
create table if not exists public.canned_replies (
  id uuid primary key default gen_random_uuid(),
  programme text not null,
  title text not null,
  body text not null,
  created_at timestamptz default now() not null
);


-- 5. INTERNAL NOTES TABLE (Private to staff only)
create table if not exists public.internal_notes (
  id uuid primary key default gen_random_uuid(),
  thread_id uuid references public.message_threads(id) on delete cascade not null,
  author_id uuid references auth.users(id) on delete cascade not null,
  body text not null check (char_length(body) <= 2000),
  created_at timestamptz default now() not null
);

create index if not exists idx_internal_notes_thread on public.internal_notes(thread_id);


-- 6. RATE LIMITING & SERVER-SIDE CONSTRAINTS
-- Enforce a maximum of 10 messages per minute per user
create or replace function public.check_message_rate_limit()
returns trigger as $$
declare
  msg_count integer;
begin
  select count(*) into msg_count
  from public.messages
  where sender_id = new.sender_id
    and created_at > (now() - interval '1 minute');

  if msg_count >= 10 then
    raise exception 'Rate limit exceeded: You can send at most 10 messages per minute. Please wait a moment.';
  end if;

  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_check_message_rate_limit on public.messages;
create trigger trg_check_message_rate_limit
  before insert on public.messages
  for each row execute function public.check_message_rate_limit();


-- 7. THREAD ACTIVITY & AUTO-STATUS TRIGGER
-- Updates last_message_at, updated_at, and sets status = 'Answered' if instructor replied
create or replace function public.handle_new_message_activity()
returns trigger as $$
declare
  sender_user_role text;
  current_thread_status text;
begin
  select public.get_user_role(new.sender_id) into sender_user_role;
  select status into current_thread_status from public.message_threads where id = new.thread_id;

  if sender_user_role in ('instructor', 'admin') then
    update public.message_threads
    set
      last_message_at = new.created_at,
      updated_at = now(),
      status = 'Answered'
    where id = new.thread_id;
  else
    -- Learner sent a message: if was Answered, set back to Open
    update public.message_threads
    set
      last_message_at = new.created_at,
      updated_at = now(),
      status = case when current_thread_status = 'Answered' then 'Open' else current_thread_status end
    where id = new.thread_id;
  end if;

  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists trg_new_message_activity on public.messages;
create trigger trg_new_message_activity
  after insert on public.messages
  for each row execute function public.handle_new_message_activity();


-- ====================================================================
-- 8. ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================

alter table public.profiles enable row level security;
alter table public.message_threads enable row level security;
alter table public.messages enable row level security;
alter table public.canned_replies enable row level security;
alter table public.internal_notes enable row level security;

-- PROFILES POLICIES
create policy "Users can view all staff profiles and own profile"
  on public.profiles for select
  using (true);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- MESSAGE THREADS POLICIES
create policy "Learners can view own threads; staff can view programme threads"
  on public.message_threads for select
  using (
    auth.uid() = learner_id
    or public.get_user_role(auth.uid()) = 'admin'
    or (
      public.get_user_role(auth.uid()) = 'instructor'
      and programme = public.get_user_programme(auth.uid())
    )
  );

create policy "Learners can insert own threads"
  on public.message_threads for insert
  with check (
    auth.uid() = learner_id
  );

create policy "Learners can update rating or reopen; staff can update thread status/assignment"
  on public.message_threads for update
  using (
    auth.uid() = learner_id
    or public.get_user_role(auth.uid()) = 'admin'
    or (
      public.get_user_role(auth.uid()) = 'instructor'
      and programme = public.get_user_programme(auth.uid())
    )
  );

-- MESSAGES POLICIES
create policy "Users can view messages in accessible threads"
  on public.messages for select
  using (
    exists (
      select 1 from public.message_threads t
      where t.id = messages.thread_id
        and (
          t.learner_id = auth.uid()
          or public.get_user_role(auth.uid()) = 'admin'
          or (
            public.get_user_role(auth.uid()) = 'instructor'
            and t.programme = public.get_user_programme(auth.uid())
          )
        )
    )
  );

create policy "Users can insert messages into authorized threads"
  on public.messages for insert
  with check (
    auth.uid() = sender_id
    and exists (
      select 1 from public.message_threads t
      where t.id = messages.thread_id
        and (
          t.learner_id = auth.uid()
          or public.get_user_role(auth.uid()) = 'admin'
          or (
            public.get_user_role(auth.uid()) = 'instructor'
            and t.programme = public.get_user_programme(auth.uid())
          )
        )
    )
  );

create policy "Recipients can update read_at"
  on public.messages for update
  using (
    exists (
      select 1 from public.message_threads t
      where t.id = messages.thread_id
        and (
          t.learner_id = auth.uid()
          or public.get_user_role(auth.uid()) in ('instructor', 'admin')
        )
    )
  );

-- INTERNAL NOTES POLICIES (Strictly hidden from learners)
create policy "Only staff can view internal notes"
  on public.internal_notes for select
  using (
    public.get_user_role(auth.uid()) in ('instructor', 'admin')
  );

create policy "Only staff can insert internal notes"
  on public.internal_notes for insert
  with check (
    auth.uid() = author_id
    and public.get_user_role(auth.uid()) in ('instructor', 'admin')
  );

-- CANNED REPLIES POLICIES
create policy "Staff can view canned replies"
  on public.canned_replies for select
  using (
    public.get_user_role(auth.uid()) in ('instructor', 'admin')
  );

create policy "Admins can manage canned replies"
  on public.canned_replies for all
  using (
    public.get_user_role(auth.uid()) = 'admin'
  );


-- ====================================================================
-- 9. REALTIME PUBLICATION SETUP
-- ====================================================================
do $$
begin
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'message_threads') then
    alter publication supabase_realtime add table public.message_threads;
  end if;
  if not exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and tablename = 'messages') then
    alter publication supabase_realtime add table public.messages;
  end if;
end $$;


-- ====================================================================
-- 10. SEED CANNED REPLIES (Sample templates for each track)
-- ====================================================================
insert into public.canned_replies (programme, title, body)
values
  ('hr', 'Welcome & Office Hours', 'Hello! Thanks for reaching out. We have logged your query and will review it during our afternoon office hours (2:00 PM - 5:00 PM IST). Please ensure you have checked the role onboarding documentation in the meantime.'),
  ('hr', 'Module Review Complete', 'Great work completing your module deliverables! Your submission has been reviewed and verified. Feel free to proceed to the next module assessment.'),
  ('data', 'Dataset & Environment Setup', 'Hi there! Please make sure you are using Python 3.10+ in your virtual environment and have installed pandas, numpy, and matplotlib. For Power BI credentials, check your onboarding welcome email.'),
  ('research', 'Fieldwork Protocol Guidance', 'Hello! For field interviews and household surveys, please ensure the respondent consent declaration is read aloud in the regional language before recording any data.'),
  ('design', 'Asset Brand Verification', 'Hi! All report covers and LinkedIn carousel slides must adhere strictly to the Ikaai 60-30-10 palette with #00511e emerald and #00a544 vibrant green accents. Vector logo files are in Module 0.1.'),
  ('bd', 'Proposal Matrix Review', 'Hello! We have received your technical proposal matrix outline. Please review section 3 against the donor evaluation criteria checklist before our final submission review.')
on conflict do nothing;

