-- ====================================================================
-- IKAAI ACADEMY / LIBRARY - MIGRATION 20261113_14
-- REALTIME CHAT RESILIENCE, PRESENCE & SERVER-SIDE TOUCH_LAST_SEEN RPC
--
-- Features:
--   1. RPC public.touch_last_seen(): security definer function allowing
--      authenticated users to update their own last_seen & chat_status
--      safely without direct table updates or permission issues.
--   2. Realtime publication verification: ensure chat_messages,
--      chat_conversation_members, and chat_reactions are included in
--      supabase_realtime with REPLICA IDENTITY FULL.
-- ====================================================================

begin;

-- --------------------------------------------------------------------
-- 1. RPC: public.touch_last_seen()
-- --------------------------------------------------------------------
create or replace function public.touch_last_seen()
returns timestamptz
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  v_uid uuid;
  v_now timestamptz := clock_timestamp();
begin
  v_uid := auth.uid();
  if v_uid is null then
    return null;
  end if;

  update public.profiles
  set
    last_seen = v_now,
    chat_status = 'online',
    updated_at = v_now
  where id = v_uid;

  return v_now;
end;
$$;

revoke all on function public.touch_last_seen() from public, anon;
grant execute on function public.touch_last_seen() to authenticated;

-- --------------------------------------------------------------------
-- 2. REPLICA IDENTITY & REALTIME PUBLICATION VERIFICATION
-- --------------------------------------------------------------------
alter table if exists public.chat_messages replica identity full;
alter table if exists public.chat_conversation_members replica identity full;
alter table if exists public.chat_reactions replica identity full;
alter table if exists public.profiles replica identity full;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables 
    where pubname = 'supabase_realtime' and tablename = 'chat_messages'
  ) then
    alter publication supabase_realtime add table public.chat_messages;
  end if;

  if not exists (
    select 1 from pg_publication_tables 
    where pubname = 'supabase_realtime' and tablename = 'chat_conversation_members'
  ) then
    alter publication supabase_realtime add table public.chat_conversation_members;
  end if;

  if not exists (
    select 1 from pg_publication_tables 
    where pubname = 'supabase_realtime' and tablename = 'chat_reactions'
  ) then
    alter publication supabase_realtime add table public.chat_reactions;
  end if;

  if not exists (
    select 1 from pg_publication_tables 
    where pubname = 'supabase_realtime' and tablename = 'profiles'
  ) then
    alter publication supabase_realtime add table public.profiles;
  end if;
end $$;

commit;
