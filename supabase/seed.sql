-- ====================================================================
-- IKAAI ACADEMY / LIBRARY — COMPREHENSIVE SEED DATA
-- Migration / Seed: supabase/seed.sql
-- Safe to re-run (idempotent ON CONFLICT clauses)
-- ====================================================================

-- 1. INSERT PROGRAMMES
insert into public.programmes (id, slug, name, description, tag_label, sort_order)
values (
  '10000000-0000-0000-0000-000000000001',
  'human-resources',
  'Human Resources',
  'As a Recruitment Intern, you''ll run recruitment for every role at Ikaai — Social Researchers, Data Analysts, Project Managers and Strategic Advisors. You will master sourcing talent, conducting initial screenings, coordinating interviews, and maintaining company-wide onboarding excellence.',
  'Human Resources',
  1
)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  tag_label = excluded.tag_label,
  sort_order = excluded.sort_order;

insert into public.programmes (id, slug, name, description, tag_label, sort_order)
values (
  '10000000-0000-0000-0000-000000000002',
  'data-analyst',
  'Data Analyst',
  'As a Data Analyst at Ikaai India, you will transform raw social development datasets into high-fidelity statistical evidence, interactive dashboards, and decision-support intelligence for ministries, UN agencies, and CSR foundations.',
  'Data Analytics',
  2
)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  tag_label = excluded.tag_label,
  sort_order = excluded.sort_order;

insert into public.programmes (id, slug, name, description, tag_label, sort_order)
values (
  '10000000-0000-0000-0000-000000000003',
  'social-research-policy',
  'Social Research & Policy',
  'As a Social Researcher at Ikaai India, you will lead evidence-based public policy research, baseline/endline evaluations, and impact assessments for government ministries, multilateral agencies, and CSR foundations across India.',
  'Social Research',
  3
)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  tag_label = excluded.tag_label,
  sort_order = excluded.sort_order;

insert into public.programmes (id, slug, name, description, tag_label, sort_order)
values (
  '10000000-0000-0000-0000-000000000004',
  'design-social-media',
  'Design & Social Media',
  'As a Graphic Design & Social Media Intern at Ikaai India, you will shape our institutional brand identity, craft publication-ready evaluation reports, design engaging data infographics, and manage multi-channel digital campaigns.',
  'Design & Media',
  4
)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  tag_label = excluded.tag_label,
  sort_order = excluded.sort_order;

insert into public.programmes (id, slug, name, description, tag_label, sort_order)
values (
  '10000000-0000-0000-0000-000000000005',
  'business-development',
  'Business Development',
  'As a Partnerships & Business Development Associate at Ikaai India, you will drive strategic growth, identify high-value public procurement tenders and CSR consulting briefs, write winning technical/financial proposals, and manage institutional client relationships.',
  'Partnerships & BD',
  5
)
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  tag_label = excluded.tag_label,
  sort_order = excluded.sort_order;

-- 2. INSERT MODULES, RESOURCES, FAQS, AND QUIZZES
-- -----------------------------------------------------
-- Programme: Human Resources
-- -----------------------------------------------------
insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  0,
  '0. Onboarding & Digital Workspace',
  'Digital Workspace & Security',
  '{"Familiarize yourself with Ikaai''s digital toolstack and communication standards.","Complete your workspace profile and sign required policy compliance documents.","Set up your secure @ikaaiindia.org credentials, 2FA, and official email signature.","Learn security protocols including phishing detection and data privacy principles."}'::text[],
  0,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000001',
  '0.1',
  '0.1 New Joiner Checklist',
  'document', 'human-resources/module-0/0.1-new-joiner-checklist.docx',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;
insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000002',
  '20000000-0000-0000-0000-000000000001',
  '0.2',
  '0.2 Onboarding Presentation',
  'pdf', 'human-resources/module-0/0.2-onboarding-presentation.pdf',
  1
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;
insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000003',
  '20000000-0000-0000-0000-000000000001',
  '0.3',
  '0.3 Recruitment Intern Handbook',
  'pdf', 'human-resources/module-0/0.3-recruitment-intern-handbook.pdf',
  2
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;
insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000004',
  '20000000-0000-0000-0000-000000000001',
  '0.4',
  '0.4 Weekly Report Template',
  'document', 'human-resources/module-0/0.4-weekly-report-template.docx',
  3
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;
insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000005',
  '20000000-0000-0000-0000-000000000001',
  '0.5',
  '0.5 Setting Up Your Ikaai Email',
  'pdf', 'human-resources/module-0/0.5-setting-up-ikaai-email.pdf',
  4
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;
insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000006',
  '20000000-0000-0000-0000-000000000001',
  '0.6',
  '0.6 Phishing Prevention – Required Reading',
  'pdf', 'human-resources/module-0/0.6-phishing-prevention-reading.pdf',
  5
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;
insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000007',
  '20000000-0000-0000-0000-000000000001',
  '0.7',
  '0.7 Your Email Signature',
  'pdf', 'human-resources/module-0/0.7-email-signature-guide.pdf',
  6
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;
insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000008',
  '20000000-0000-0000-0000-000000000001',
  '0.8',
  '0.8 Employer Branding – Corporate Background Meeting Image',
  'image', 'human-resources/module-0/0.8-employer-branding-background.png',
  7
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000001',
  'I applied for Branch X, but I''ve been assigned to Branch Y. Why?',
  'Branch assignments are optimized based on current project workload, regional language requirements for fieldwork, and team mentorship availability. If you have special location or timing constraints, you can discuss this with your coordinator during your welcome 1-on-1.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;
insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000002',
  '20000000-0000-0000-0000-000000000001',
  'When will I receive my official Ikaai email credentials?',
  'Official @ikaaiindia.org accounts are provisioned within 24 hours of onboarding paperwork completion. Check your alternate contact email for the temporary login link.',
  1
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;
insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000003',
  '20000000-0000-0000-0000-000000000001',
  'How do I access internal Google Workspace drives and documents?',
  'Once your 2FA is activated, access the Ikaai Shared Drive through your Google Drive web interface. Folders are permission-scoped according to your department.',
  2
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;
insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000004',
  '20000000-0000-0000-0000-000000000001',
  'Who do I contact if I face technical difficulties logging in?',
  'Message our portal administrator directly via the ''Message Instructor'' sidebar menu or send an email to support@ikaaiindia.org.',
  3
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000001',
  '20000000-0000-0000-0000-000000000001',
  'Digital Workspace & Security',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000001',
  '50000000-0000-0000-0000-000000000001',
  'What is the required deadline for submitting your Weekly Intern Progress Report (WPR)?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000001',
  '60000000-0000-0000-0000-000000000001',
  'Every Monday morning before 10:00 AM IST',
  0,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000002',
  '60000000-0000-0000-0000-000000000001',
  'Every Friday by 6:00 PM IST',
  1,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000003',
  '60000000-0000-0000-0000-000000000001',
  'Bi-weekly on the 15th and 30th of the month',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000004',
  '60000000-0000-0000-0000-000000000001',
  'Whenever your module is completed',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000002',
  '50000000-0000-0000-0000-000000000001',
  'What must you do if you receive an unexpected email requesting sensitive candidate data or login credentials?',
  1
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000005',
  '60000000-0000-0000-0000-000000000002',
  'Forward it immediately to security@ikaaiindia.org and do not click links',
  0,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000006',
  '60000000-0000-0000-0000-000000000002',
  'Reply with dummy data to test the sender',
  1,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000007',
  '60000000-0000-0000-0000-000000000002',
  'Click the unsubscribe button inside the email',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000008',
  '60000000-0000-0000-0000-000000000002',
  'Share your credentials only if the sender looks internal',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000003',
  '50000000-0000-0000-0000-000000000001',
  'What is the maximum turnaround time for responding to applicant inquiries at Ikaai?',
  2
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000009',
  '60000000-0000-0000-0000-000000000003',
  '24 hours',
  0,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000010',
  '60000000-0000-0000-0000-000000000003',
  '48 hours',
  1,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000011',
  '60000000-0000-0000-0000-000000000003',
  '7 business days',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000012',
  '60000000-0000-0000-0000-000000000003',
  '2 weeks',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000001',
  1,
  '1. Company Overview & Culture',
  'Company Overview & Culture',
  '{"Understand Ikaai''s mission, values, and organizational structure.","Understand the responsibilities of the Human Resources Department.","Familiarise yourself with your role and performance expectations."}'::text[],
  1,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000009',
  '20000000-0000-0000-0000-000000000002',
  '1.1',
  '1.1 Our Journey & Growth',
  'pdf', 'human-resources/module-1/1.1-our-journey-and-growth.pdf',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;
insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000010',
  '20000000-0000-0000-0000-000000000002',
  '1.2',
  '1.2 Organisation Chart',
  'pdf', 'human-resources/module-1/1.2-organisation-chart.pdf',
  1
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;
insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000011',
  '20000000-0000-0000-0000-000000000002',
  '1.3',
  '1.3 Ikaai Foundation''s Mission & Values',
  'pdf', 'human-resources/module-1/1.3-mission-and-values.pdf',
  2
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;
insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000012',
  '20000000-0000-0000-0000-000000000002',
  '1.4',
  '1.4 Research & Social Impact Framework',
  'pdf', 'human-resources/module-1/1.4-social-impact-framework.pdf',
  3
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;
insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000013',
  '20000000-0000-0000-0000-000000000002',
  '1.5',
  '1.5 Code of Conduct & Ethics',
  'document', 'human-resources/module-1/1.5-code-of-conduct-ethics.docx',
  4
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;
insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000014',
  '20000000-0000-0000-0000-000000000002',
  '1.6',
  '1.6 Community Engagement Principles',
  'pdf', 'human-resources/module-1/1.6-community-engagement-principles.pdf',
  5
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;
insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000015',
  '20000000-0000-0000-0000-000000000002',
  '1.7',
  '1.7 Communication Norms & Slack Guide',
  'document', 'human-resources/module-1/1.7-communication-norms-guide.docx',
  6
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000005',
  '20000000-0000-0000-0000-000000000002',
  'How does the HR Department interact with field research teams?',
  'HR coordinates with project managers to understand language requirements, geographic deployment needs, and training prerequisites before recruiting field associates.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;
insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000006',
  '20000000-0000-0000-0000-000000000002',
  'What opportunities exist for high-performing interns after 3 months?',
  'Top performers are evaluated for Junior Associate positions, extended project fellowships, and receive personalized recommendation letters signed by our executive directors.',
  1
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000002',
  '20000000-0000-0000-0000-000000000002',
  'Company Overview & Culture',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000004',
  '50000000-0000-0000-0000-000000000002',
  'What is Ikaai India Foundation''s core guiding motto?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000013',
  '60000000-0000-0000-0000-000000000004',
  'Leading with Technology',
  0,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000014',
  '60000000-0000-0000-0000-000000000004',
  'Unlocking Insights, Transforming Lives',
  1,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000015',
  '60000000-0000-0000-0000-000000000004',
  'Scale at all Costs',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000016',
  '60000000-0000-0000-0000-000000000004',
  'Consulting Without Borders',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000005',
  '50000000-0000-0000-0000-000000000002',
  'What step is mandatory prior to recording any community interview or photographing respondents?',
  1
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000017',
  '60000000-0000-0000-0000-000000000005',
  'Offering monetary incentives',
  0,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000018',
  '60000000-0000-0000-0000-000000000005',
  'Obtaining verifiable informed consent',
  1,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000019',
  '60000000-0000-0000-0000-000000000005',
  'Sending a written letter 14 days in advance',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000020',
  '60000000-0000-0000-0000-000000000005',
  'Getting approval from local law enforcement',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000001',
  2,
  '2. Understanding Ikaai Roles',
  'Understanding Ikaai Roles Test',
  '{"Understand the requirements of each Ikaai consulting and development role.","Learn the distinct profiles of Field Researchers, Data Analysts, and Project Coordinators.","Master candidate matching criteria based on project scope."}'::text[],
  2,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000016',
  '20000000-0000-0000-0000-000000000003',
  '2.1',
  '2.1 Roles & Requirements',
  'pdf', 'human-resources/module-2/2.1-roles-and-requirements.pdf',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;
insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000017',
  '20000000-0000-0000-0000-000000000003',
  '2.2',
  '2.2 Field Research Associate Guidelines',
  'pdf', 'human-resources/module-2/2.2-field-research-guidelines.pdf',
  1
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;
insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000018',
  '20000000-0000-0000-0000-000000000003',
  '2.3',
  '2.3 Project Monitoring & Evaluation Specialist',
  'pdf', 'human-resources/module-2/2.3-monitoring-evaluation-specialist.pdf',
  2
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000007',
  '20000000-0000-0000-0000-000000000003',
  'What should I do if a candidate asks me something I don''t know the answer to?',
  'Never guess or invent policies. Politely inform the candidate: ''That is a great question. Let me verify the exact details with our Project Lead and get back to you by tomorrow.'' Note the question in your interview tracker.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000003',
  '20000000-0000-0000-0000-000000000003',
  'Understanding Ikaai Roles Test',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000006',
  '50000000-0000-0000-0000-000000000003',
  'What digital CAPI tools are commonly used by Ikaai field researchers for survey collection?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000021',
  '60000000-0000-0000-0000-000000000006',
  'KoboToolbox and ODK',
  0,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000022',
  '60000000-0000-0000-0000-000000000006',
  'Photoshop and Figma',
  1,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000023',
  '60000000-0000-0000-0000-000000000006',
  'WordPress and Drupal',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000024',
  '60000000-0000-0000-0000-000000000006',
  'Salesforce CRM only',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000004',
  '10000000-0000-0000-0000-000000000001',
  3,
  '3. Business Development & Partnerships',
  'Business Development Overview',
  '{"Understand how Ikaai builds strategic partnerships with non-profits and CSR funders.","Review email templates for prospective corporate partners.","Learn the stages of research proposal development."}'::text[],
  3,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000019',
  '20000000-0000-0000-0000-000000000004',
  '3.1',
  '3.1 Job Description: B. Development Intern',
  'pdf', 'human-resources/module-3/3.1-jd-business-development-intern.pdf',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;
insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000020',
  '20000000-0000-0000-0000-000000000004',
  '3.2',
  '3.2 Shortlisting Email B. Development Intern',
  'document', 'human-resources/module-3/3.2-shortlisting-email-template.docx',
  1
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;
insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000021',
  '20000000-0000-0000-0000-000000000004',
  '3.3',
  '3.3 Acceptance Email B. Development Intern',
  'document', 'human-resources/module-3/3.3-acceptance-email-template.docx',
  2
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;
insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000022',
  '20000000-0000-0000-0000-000000000004',
  '3.4',
  '3.4 Follow-Up Email B. Development Intern',
  'pdf', 'human-resources/module-3/3.4-follow-up-email-template.pdf',
  3
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;
insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000023',
  '20000000-0000-0000-0000-000000000004',
  '3.5',
  '3.5 Official LinkedIn Image Recruitment',
  'pdf', 'human-resources/module-3/3.5-linkedin-recruitment-asset.pdf',
  4
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;
insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000024',
  '20000000-0000-0000-0000-000000000004',
  '3.6',
  '3.6 Rejection Email Template B. Development Intern',
  'pdf', 'human-resources/module-3/3.6-rejection-email-template.pdf',
  5
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000008',
  '20000000-0000-0000-0000-000000000004',
  'How are corporate partnerships initiated at Ikaai?',
  'Partnerships usually start through research needs-assessment calls with CSR heads, followed by a formal scoping proposal drafted by our development team.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;
insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000009',
  '20000000-0000-0000-0000-000000000004',
  'What role do interns play during partner calls?',
  'Interns take detailed minutes of the meeting, track agreed action items, and compile background research dossiers on prospective partners.',
  1
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000004',
  '20000000-0000-0000-0000-000000000004',
  'Business Development Overview',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000007',
  '50000000-0000-0000-0000-000000000004',
  'What constitutes the foundation of an Ikaai CSR partnership proposal?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000025',
  '60000000-0000-0000-0000-000000000007',
  'Demonstrating rigorous research metrics and verifiable community impact',
  0,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000026',
  '60000000-0000-0000-0000-000000000007',
  'Promising viral social media reach only',
  1,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000027',
  '60000000-0000-0000-0000-000000000007',
  'Guaranteeing financial returns to the non-profit',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000028',
  '60000000-0000-0000-0000-000000000007',
  'Selling generic software subscriptions',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000005',
  '10000000-0000-0000-0000-000000000001',
  4,
  '4. Recruitment Intern & Talent Acquisition',
  'LinkedIn Job Posting Test',
  '{"Master the complete candidate sourcing and screening lifecycle.","Draft and publish compliant job advertisements on LinkedIn and university portals.","Coordinate interviews and manage candidate tracking spreadsheets."}'::text[],
  4,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000025',
  '20000000-0000-0000-0000-000000000005',
  '4.1',
  '4.1 Step-by-Step Guide to Posting a Job Ad',
  'pdf', 'human-resources/module-4/4.1-guide-to-posting-job-ad.pdf',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;
insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000026',
  '20000000-0000-0000-0000-000000000005',
  '4.2',
  '4.2 Recruitment Workflow',
  'pdf', 'human-resources/module-4/4.2-recruitment-workflow.pdf',
  1
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000010',
  '20000000-0000-0000-0000-000000000005',
  'What happens if I am not able to make a job post on time?',
  'Immediately notify your HR Coordinator in the #recruitment-ops channel. Another team member can step in with backup posting credentials to ensure posting schedules are met.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000005',
  '20000000-0000-0000-0000-000000000005',
  'LinkedIn Job Posting Test',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000008',
  '50000000-0000-0000-0000-000000000005',
  'What is the primary objective of the Stage 2 introductory screening call?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000029',
  '60000000-0000-0000-0000-000000000008',
  'To assess communication skills, role alignment, and availability',
  0,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000030',
  '60000000-0000-0000-0000-000000000008',
  'To conduct a 2-hour technical programming examination',
  1,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000031',
  '60000000-0000-0000-0000-000000000008',
  'To negotiate executive compensation',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000032',
  '60000000-0000-0000-0000-000000000008',
  'To give an immediate unreviewed job offer',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000006',
  '10000000-0000-0000-0000-000000000001',
  5,
  '5. Project Manager & Strategic Advisor',
  'Project Management Foundations',
  '{"Understand the deliverables and sprint tracking for multi-month field studies.","Coordinate between data collectors, quality auditors, and senior analysts.","Implement risk mitigation for field research delays."}'::text[],
  5,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000027',
  '20000000-0000-0000-0000-000000000006',
  '5.1',
  '5.1 Job Description: Project Manager',
  'pdf', 'human-resources/module-5/5.1-jd-project-manager.pdf',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;
insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000028',
  '20000000-0000-0000-0000-000000000006',
  '5.2',
  '5.2 Job Description: Strategic Advisor',
  'pdf', 'human-resources/module-5/5.2-jd-strategic-advisor.pdf',
  1
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000011',
  '20000000-0000-0000-0000-000000000006',
  'How frequently do Project Managers meet with intern coordinators?',
  'Weekly standup meetings happen on Tuesdays at 11:00 AM IST to review pipeline progress, workload balance, and feedback.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000006',
  '20000000-0000-0000-0000-000000000006',
  'Project Management Foundations',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000009',
  '50000000-0000-0000-0000-000000000006',
  'What is the foremost priority for an Ikaai Project Manager when unexpected rain disrupts field surveys?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000033',
  '60000000-0000-0000-0000-000000000009',
  'Ensure surveyor safety, trigger contingency buffer days, and notify stakeholders',
  0,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000034',
  '60000000-0000-0000-0000-000000000009',
  'Demand surveyors continue in hazardous conditions',
  1,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000035',
  '60000000-0000-0000-0000-000000000009',
  'Fabricate missing questionnaire responses to keep the timeline',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000036',
  '60000000-0000-0000-0000-000000000009',
  'Abandon the project without notice',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

-- Exam Questions for Human Resources
insert into public.exam_questions (id, programme_id, question, prompt, max_marks, sort_order)
values (
  '80000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  '1. Ikaai Mission & Social Impact Philosophy',
  'Explain how Ikaai India Foundation differentiates its social research approach from conventional commercial market research. Mention at least three core principles discussed in your onboarding modules.',
  100,
  0
)
on conflict (id) do update set
  question = excluded.question,
  prompt = excluded.prompt,
  sort_order = excluded.sort_order;
insert into public.exam_questions (id, programme_id, question, prompt, max_marks, sort_order)
values (
  '80000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000001',
  '2. Ethical Recruitment & Bias Mitigation Scenario',
  'Suppose a candidate applying for a Field Research Associate role lacks formal academic credentials but demonstrates extensive grassroots community organizing experience and fluency in regional dialects. How would you evaluate their profile according to Ikaai recruitment guidelines?',
  100,
  1
)
on conflict (id) do update set
  question = excluded.question,
  prompt = excluded.prompt,
  sort_order = excluded.sort_order;
insert into public.exam_questions (id, programme_id, question, prompt, max_marks, sort_order)
values (
  '80000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000001',
  '3. Data Security & Confidentiality Protocols',
  'A partner organization requests an un-anonymized spreadsheet of rural survey respondents including contact details. How do you respond based on Ikaai data protection policies and ethics charters?',
  100,
  2
)
on conflict (id) do update set
  question = excluded.question,
  prompt = excluded.prompt,
  sort_order = excluded.sort_order;

-- -----------------------------------------------------
-- Programme: Data Analyst
-- -----------------------------------------------------
insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000007',
  '10000000-0000-0000-0000-000000000002',
  0,
  '0. Analytics Toolstack & Data Governance',
  'Analytics Infrastructure & Data Protocols',
  '{"Set up your secure analytical environment: Python 3.x, Jupyter Notebooks, Git repository access, and Power BI Desktop.","Master Ikaai''s Data Governance & PII Protection Guidelines complying with the Digital Personal Data Protection (DPDP) Act 2023.","Learn the standardized file directory hierarchy, naming conventions, and data dictionary documentation practices.","Configure automated cloud backups on Ikaai''s encrypted Google Workspace & Azure data storage."}'::text[],
  0,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000029',
  '20000000-0000-0000-0000-000000000007',
  '0.1',
  '0.1 Data Analyst Setup & Environment Guide',
  'document', 'data-analyst/module-0/0.1-data-analyst-setup-guide.docx',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;
insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000030',
  '20000000-0000-0000-0000-000000000007',
  '0.2',
  '0.2 Ikaai Data Dictionary & Schema Template',
  'pdf', 'data-analyst/module-0/0.2-data-dictionary-schema.pdf',
  1
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000012',
  '20000000-0000-0000-0000-000000000007',
  'Which Python environment management tool is officially approved?',
  'Both venv (Python native) and conda are approved. Always keep an updated requirements.txt or environment.yml at the root of your project directory.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000007',
  '20000000-0000-0000-0000-000000000007',
  'Analytics Infrastructure & Data Protocols',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000010',
  '50000000-0000-0000-0000-000000000007',
  'Under Ikaai''s data security guidelines, what must be done with direct respondent PII (phone number, name, GPS)?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000037',
  '60000000-0000-0000-0000-000000000010',
  'Keep them in the main analysis sheet for easy follow-ups',
  0,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000038',
  '60000000-0000-0000-0000-000000000010',
  'Isolate them into an encrypted mapping file and use anonymized Respondent IDs (RID) in working datasets',
  1,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000039',
  '60000000-0000-0000-0000-000000000010',
  'Delete them immediately without generating any unique identifier',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000040',
  '60000000-0000-0000-0000-000000000010',
  'Share them with external visualization contractors via Google Drive',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000008',
  '10000000-0000-0000-0000-000000000002',
  1,
  '1. Data Cleaning & Validation with Python & Excel',
  'Data Wrangling & Pipeline Automation',
  '{"Master automated pipeline development using Pandas, NumPy, and OpenPyXL for large-scale field survey ingests.","Implement robust outlier detection algorithms: Interquartile Range (IQR), Z-Score, and Mahalanobis distance.","Handle duplicate records, irregular timestamp formatting, string normalizations, and multi-select binary splitting.","Build automated reconciliation scripts between CAPI cloud servers and local clean working tables."}'::text[],
  1,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000031',
  '20000000-0000-0000-0000-000000000008',
  '1.1',
  '1.1 The Comprehensive Data Cleaning SOP',
  'pdf', 'data-analyst/module-1/1.1-data-cleaning-sop.pdf',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000013',
  '20000000-0000-0000-0000-000000000008',
  'What should I do when an outlier is legitimate (e.g. an ultra-high earner)?',
  'Flag the observation with an audit column is_outlier_confirmed = True and document the verification with the field team before applying winsorization or median trimming.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000008',
  '20000000-0000-0000-0000-000000000008',
  'Data Wrangling & Pipeline Automation',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000011',
  '50000000-0000-0000-0000-000000000008',
  'Why does Ikaai strictly mandate non-destructive data cleaning pipelines?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000041',
  '60000000-0000-0000-0000-000000000011',
  'Because raw files are too large to store on Google Drive',
  0,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000042',
  '60000000-0000-0000-0000-000000000011',
  'To ensure complete auditability, reproducibility, and legal verification of research findings',
  1,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000043',
  '60000000-0000-0000-0000-000000000011',
  'Because Python cannot modify Excel files in place',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000044',
  '60000000-0000-0000-0000-000000000011',
  'To prevent field enumerators from seeing survey results',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000009',
  '10000000-0000-0000-0000-000000000002',
  2,
  '2. Statistical Modeling & Survey Analytics (SPSS/R)',
  'Inferential Statistics & Econometric Analysis',
  '{"Calculate complex sampling weights, stratification adjustments, and cluster design effects in R and SPSS.","Execute Difference-in-Differences (DiD), Propensity Score Matching (PSM), and regression discontinuity designs.","Perform hypothesis testing (Chi-square, Mann-Whitney U, ANOVA, multivariate linear/logistic regressions).","Generate publication-quality regression tables with robust standard errors clustered at district/village levels."}'::text[],
  2,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000032',
  '20000000-0000-0000-0000-000000000009',
  '2.1',
  '2.1 Econometric Evaluation Methodology Guide',
  'pdf', 'data-analyst/module-2/2.1-econometric-evaluation-guide.pdf',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000014',
  '20000000-0000-0000-0000-000000000009',
  'Should I use R or SPSS for regression analysis at Ikaai?',
  'Both are supported. R is preferred for automated reproducible pipeline scripts and complex matching, while SPSS is widely used for client deliverables requiring traditional syntax scripts.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000009',
  '20000000-0000-0000-0000-000000000009',
  'Inferential Statistics & Econometric Analysis',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000012',
  '50000000-0000-0000-0000-000000000009',
  'Why must standard errors be clustered at the village/block level in community survey evaluations?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000045',
  '60000000-0000-0000-0000-000000000012',
  'Because individuals within the same village share unobserved common characteristics and economic conditions',
  0,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000046',
  '60000000-0000-0000-0000-000000000012',
  'To reduce computation time in statistical software',
  1,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000047',
  '60000000-0000-0000-0000-000000000012',
  'Because it automatically doubles the sample size',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000048',
  '60000000-0000-0000-0000-000000000012',
  'To make p-values artificially smaller',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000002',
  3,
  '3. Power BI & Interactive Dashboard Engineering',
  'Business Intelligence & Executive Dashboards',
  '{"Architect star-schema data models in Power BI with optimized relationship cardinalities and DAX measures.","Design accessible, interactive visual interfaces adhering to Ikaai''s institutional color palette and UI guidelines.","Implement Row-Level Security (RLS) ensuring state/district officials view only their jurisdictions.","Publish and maintain automated incremental refreshes via Power BI Gateway and cloud REST APIs."}'::text[],
  3,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000033',
  '20000000-0000-0000-0000-000000000010',
  '3.1',
  '3.1 Power BI Architecture for Development Sector',
  'document', 'data-analyst/module-3/3.1-power-bi-architecture.docx',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000015',
  '20000000-0000-0000-0000-000000000010',
  'Where can I find Ikaai''s official Power BI color theme JSON?',
  'The .json theme file with Ikaai''s exact Emerald and Mint hex values is available in the shared Google Drive under Assets/Branding/PowerBI/Ikaai_Theme.json.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000010',
  '20000000-0000-0000-0000-000000000010',
  'Business Intelligence & Executive Dashboards',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000013',
  '50000000-0000-0000-0000-000000000010',
  'In Power BI data modeling for social research, which schema pattern is strongly recommended by Ikaai?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000049',
  '60000000-0000-0000-0000-000000000013',
  'Single flat denormalized table with 300 columns',
  0,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000050',
  '60000000-0000-0000-0000-000000000013',
  'Star schema with centralized fact tables and linked dimension tables',
  1,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000051',
  '60000000-0000-0000-0000-000000000013',
  'Cyclic relationship graph with bi-directional cross filtering',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000052',
  '60000000-0000-0000-0000-000000000013',
  'Unlinked tables with separate disconnected visual filters',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000011',
  '10000000-0000-0000-0000-000000000002',
  4,
  '4. Field Survey Data Processing & Quality Audits',
  'High-Frequency Field Checks & Enumerator Audits',
  '{"Build daily High-Frequency Check (HFC) algorithms detecting enumerator fraud, speed-running, and digit preference.","Calculate GPS proximity clusters and interview duration distributions across field teams.","Conduct automated back-check comparisons between primary surveys and quality auditor re-interviews.","Deliver daily field correction logs to survey managers and project leads."}'::text[],
  4,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000034',
  '20000000-0000-0000-0000-000000000011',
  '4.1',
  '4.1 High-Frequency Check (HFC) Protocol',
  'pdf', 'data-analyst/module-4/4.1-high-frequency-check-protocol.pdf',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000016',
  '20000000-0000-0000-0000-000000000011',
  'How frequently are HFC reports run during live data collection?',
  'HFCs are scheduled every evening at 8:00 PM IST following the daily server sync, with flags sent to Field Supervisors before 8:30 AM the next morning.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000011',
  '20000000-0000-0000-0000-000000000011',
  'High-Frequency Field Checks & Enumerator Audits',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000014',
  '50000000-0000-0000-0000-000000000011',
  'What does a high concentration of answers at round numbers (e.g., age 30, 40, 50) indicate in field audits?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000053',
  '60000000-0000-0000-0000-000000000014',
  'Flawless representative sampling',
  0,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000054',
  '60000000-0000-0000-0000-000000000014',
  'Digit preference (heaping) error indicating rough estimation rather than verified inquiry',
  1,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000055',
  '60000000-0000-0000-0000-000000000014',
  'Surveyor speed bonus qualification',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000056',
  '60000000-0000-0000-0000-000000000014',
  'Correct application of sampling weights',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000012',
  '10000000-0000-0000-0000-000000000002',
  5,
  '5. Executive Reporting & Visual Insights Delivery',
  'Analytical Storytelling & Policy Translation',
  '{"Translate complex multivariate regression coefficients into plain-language executive summaries for government stakeholders.","Create publication-ready charts following Edward Tufte and Stephen Few data visualization design principles.","Structure technical appendixes detailing sample sizes, attrition rates, power calculations, and sensitivity tests.","Present analytical findings in client walkthroughs and policy dissemination workshops."}'::text[],
  5,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000035',
  '20000000-0000-0000-0000-000000000012',
  '5.1',
  '5.1 Visual Data Storytelling for Public Policy',
  'presentation', 'data-analyst/module-5/5.1-visual-data-storytelling.pptx',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000017',
  '20000000-0000-0000-0000-000000000012',
  'Where do I submit my final analytical report draft for peer review?',
  'Upload your draft and reproducible code repository to the project drive folder under 04_Draft_Reports and notify your Lead Data Scientist on Slack/Chat.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000012',
  '20000000-0000-0000-0000-000000000012',
  'Analytical Storytelling & Policy Translation',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000015',
  '50000000-0000-0000-0000-000000000012',
  'What is the best practice for chart titles in Ikaai executive reports?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000057',
  '60000000-0000-0000-0000-000000000015',
  'Vague academic names like ''Figure 4: Chart of Data''',
  0,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000058',
  '60000000-0000-0000-0000-000000000015',
  'Action-oriented insight statements (e.g. ''Student Learning Outcomes Rose 18% in Intervened Schools'')',
  1,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000059',
  '60000000-0000-0000-0000-000000000015',
  'A list of software packages used',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000060',
  '60000000-0000-0000-0000-000000000015',
  'The raw Python command used to plot it',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

-- Exam Questions for Data Analyst
insert into public.exam_questions (id, programme_id, question, prompt, max_marks, sort_order)
values (
  '80000000-0000-0000-0000-000000000004',
  '10000000-0000-0000-0000-000000000002',
  '1. Data Pipeline Architecture & Anonymization',
  'Outline step-by-step how you would ingest 50,000 raw household survey records from KoboToolbox, execute deduplication, handle missing value imputation, decouple PII, and export an analytical dataset adhering to the DPDP Act 2023.',
  100,
  0
)
on conflict (id) do update set
  question = excluded.question,
  prompt = excluded.prompt,
  sort_order = excluded.sort_order;
insert into public.exam_questions (id, programme_id, question, prompt, max_marks, sort_order)
values (
  '80000000-0000-0000-0000-000000000005',
  '10000000-0000-0000-0000-000000000002',
  '2. High-Frequency Quality Checks & Fraud Diagnostics',
  'Describe four statistical indicators you would monitor on a daily basis to identify enumerator fabrication, speed-running, or systematic skip-pattern exploitation during field data collection.',
  100,
  1
)
on conflict (id) do update set
  question = excluded.question,
  prompt = excluded.prompt,
  sort_order = excluded.sort_order;
insert into public.exam_questions (id, programme_id, question, prompt, max_marks, sort_order)
values (
  '80000000-0000-0000-0000-000000000006',
  '10000000-0000-0000-0000-000000000002',
  '3. Power BI Executive Dashboard Conceptualization',
  'A state education department requires an interactive monitoring dashboard tracking foundational literacy and numeracy across 30 districts. Propose the star-schema data model, key DAX metrics, visual hierarchy, and Row-Level Security (RLS) implementation.',
  100,
  2
)
on conflict (id) do update set
  question = excluded.question,
  prompt = excluded.prompt,
  sort_order = excluded.sort_order;

-- -----------------------------------------------------
-- Programme: Social Research & Policy
-- -----------------------------------------------------
insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000013',
  '10000000-0000-0000-0000-000000000003',
  0,
  '0. Research Ethics, Protocols & Ikaai Methodology',
  'Institutional Review Board & Ethics Protocols',
  '{"Internalize Ikaai''s ethical research standards: informed consent, voluntary participation, and non-maleficence.","Master child protection and vulnerable population safeguarding protocols during field surveys.","Understand Ikaai''s mixed-methods research framework integrating quantitative rigor with qualitative depth.","Learn the lifecycle of a public policy evaluation: from inception and CAPI scripting to final dissemination."}'::text[],
  0,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000036',
  '20000000-0000-0000-0000-000000000013',
  '0.1',
  '0.1 Ikaai Research Ethics & Safeguarding Manual',
  'pdf', 'social-research-policy/module-0/0.1-research-ethics-manual.pdf',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000018',
  '20000000-0000-0000-0000-000000000013',
  'What should an enumerator do if a respondent shows signs of distress?',
  'Immediately pause the interview, offer support, respect their choice to terminate without consequence, and provide contact details for local healthcare/counseling services if applicable.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000013',
  '20000000-0000-0000-0000-000000000013',
  'Institutional Review Board & Ethics Protocols',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000016',
  '50000000-0000-0000-0000-000000000013',
  'When conducting field interviews with children under 18 years, what dual requirement must be satisfied?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000061',
  '60000000-0000-0000-0000-000000000016',
  'No consent required if school principal approves',
  0,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000062',
  '60000000-0000-0000-0000-000000000016',
  'Parental/guardian written or verbal consent PLUS affirmative child assent',
  1,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000063',
  '60000000-0000-0000-0000-000000000016',
  'Only child consent if they can read the questionnaire',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000064',
  '60000000-0000-0000-0000-000000000016',
  'Financial compensation to the village head',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000014',
  '10000000-0000-0000-0000-000000000003',
  1,
  '1. Quantitative & Qualitative Sample Design',
  'Sampling Theory & Power Calculations',
  '{"Determine required sample sizes using statistical power calculations (Optimal Design, G*Power, Stata).","Design multi-stage stratified cluster sampling plans aligned with Census 2011 and NFHS-5 primary sampling units.","Establish systematic random sampling protocols for household selection (Right-Hand Rule, interval k).","Construct purposive and snowball sampling matrices for Key Informant Interviews (KII) and Focus Groups (FGD)."}'::text[],
  1,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000037',
  '20000000-0000-0000-0000-000000000014',
  '1.1',
  '1.1 Sample Design & Statistical Power Handbook',
  'document', 'social-research-policy/module-1/1.1-sample-design-handbook.docx',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000019',
  '20000000-0000-0000-0000-000000000014',
  'What is the minimum recommended power for social impact assessments at Ikaai?',
  'Ikaai standardizes on a statistical power of 0.80 (80%) with a significance level of alpha = 0.05 for detecting minimum policy-relevant effect sizes.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000014',
  '20000000-0000-0000-0000-000000000014',
  'Sampling Theory & Power Calculations',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000017',
  '50000000-0000-0000-0000-000000000014',
  'What is the primary rationale for using Probability Proportional to Size (PPS) when selecting sample villages?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000065',
  '60000000-0000-0000-0000-000000000017',
  'It ensures all villages have an equal probability of selection regardless of population',
  0,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000066',
  '60000000-0000-0000-0000-000000000017',
  'It gives larger villages a proportionately higher chance of selection, ensuring equal probability of selection for individuals across the entire population',
  1,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000067',
  '60000000-0000-0000-0000-000000000017',
  'It eliminates the need for household listings',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000068',
  '60000000-0000-0000-0000-000000000017',
  'It reduces survey translation costs',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000015',
  '10000000-0000-0000-0000-000000000003',
  2,
  '2. Designing CAPI Tools & Survey Instruments (Kobo/CSPro)',
  'Survey Instrument Architecture & Logic Constraints',
  '{"Script complex XLSForm surveys deployed on KoboToolbox and ODK Collect.","Program dynamic skip logic, relevance expressions, repeat rosters, and mathematical regex constraints.","Implement audit metadata tracking: start/end timestamps, question-level timing, and background audio auditing.","Pilot and pre-test instruments in the field to eliminate ambiguous phrasing, cognitive fatigue, and leading questions."}'::text[],
  2,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000038',
  '20000000-0000-0000-0000-000000000015',
  '2.1',
  '2.1 Advanced XLSForm Programming Guide',
  'pdf', 'social-research-policy/module-2/2.1-xlsform-programming-guide.pdf',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000020',
  '20000000-0000-0000-0000-000000000015',
  'Can I edit an active survey form during live data collection?',
  'Never deploy destructive schema edits on live forms. If an update is necessary, create a versioned release (v1.1) and coordinate with the Data Team to handle column migration.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000015',
  '20000000-0000-0000-0000-000000000015',
  'Survey Instrument Architecture & Logic Constraints',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000018',
  '50000000-0000-0000-0000-000000000015',
  'In XLSForm syntax, what expression ensures that a child education question only triggers if the household member is aged between 6 and 18?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000069',
  '60000000-0000-0000-0000-000000000018',
  'relevant: ${age} >= 6 and ${age} <= 18',
  0,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000070',
  '60000000-0000-0000-0000-000000000018',
  'constraint: ${age} == 6-18',
  1,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000071',
  '60000000-0000-0000-0000-000000000018',
  'calculation: ${age} in (6, 18)',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000072',
  '60000000-0000-0000-0000-000000000018',
  'appearance: child_filter',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000016',
  '10000000-0000-0000-0000-000000000003',
  3,
  '3. Field Team Management & High-Frequency Data Audits',
  'Field Operations & Quality Assurance',
  '{"Lead field surveyor training bootcamps: mock interviews, roleplays, and digital tablet troubleshooting.","Establish operational hierarchy: Lead Researcher -> State Coordinator -> Field Supervisors -> Enumerators.","Execute independent back-checks (re-interviewing 5-10% of households) and reconcile discrepancy rates.","Manage field logistics, transport coordination, community liaison, and local administrative permissions."}'::text[],
  3,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000039',
  '20000000-0000-0000-0000-000000000016',
  '3.1',
  '3.1 Field Team Operations & Supervision SOP',
  'document', 'social-research-policy/module-3/3.1-field-operations-sop.docx',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000021',
  '20000000-0000-0000-0000-000000000016',
  'How are surveyor travel allowances and field stipends disbursed?',
  'Travel advances are disbursed weekly via direct bank transfer upon supervisor verification of signed vehicle logs and fuel receipts.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000016',
  '20000000-0000-0000-0000-000000000016',
  'Field Operations & Quality Assurance',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000019',
  '50000000-0000-0000-0000-000000000016',
  'What is the standard proportion of sample households designated for independent back-check audits?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000073',
  '60000000-0000-0000-0000-000000000019',
  '0%',
  0,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000074',
  '60000000-0000-0000-0000-000000000019',
  '5% to 10%',
  1,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000075',
  '60000000-0000-0000-0000-000000000019',
  '50%',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000076',
  '60000000-0000-0000-0000-000000000019',
  '100%',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000017',
  '10000000-0000-0000-0000-000000000003',
  4,
  '4. Qualitative Synthesis & NVivo Thematic Coding',
  'Qualitative Rigor & Thematic Analysis',
  '{"Conduct semi-structured Key Informant Interviews (KII) and Focus Group Discussions (FGD).","Develop inductive and deductive qualitative codebooks in NVivo and ATLAS.ti.","Establish inter-coder reliability (Cohen''s Kappa >= 0.80) across research analysts.","Extract grounded narrative themes, verbatim quotes, and community journey maps."}'::text[],
  4,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000040',
  '20000000-0000-0000-0000-000000000017',
  '4.1',
  '4.1 Qualitative Research Framework & Coding Guide',
  'presentation', 'social-research-policy/module-4/4.1-qualitative-research-framework.pptx',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000022',
  '20000000-0000-0000-0000-000000000017',
  'Can audio recordings of FGDs be shared externally?',
  'No. Raw audio recordings contain identifying voice data and are confidential; only anonymized transcripts may be referenced in deliverables.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000017',
  '20000000-0000-0000-0000-000000000017',
  'Qualitative Rigor & Thematic Analysis',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000020',
  '50000000-0000-0000-0000-000000000017',
  'What metric is used by Ikaai research teams to benchmark inter-coder reliability in qualitative coding?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000077',
  '60000000-0000-0000-0000-000000000020',
  'Number of pages typed per hour',
  0,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000078',
  '60000000-0000-0000-0000-000000000020',
  'Cohen''s Kappa statistic (target >= 0.80)',
  1,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000079',
  '60000000-0000-0000-0000-000000000020',
  'Word count of the interview transcript',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000080',
  '60000000-0000-0000-0000-000000000020',
  'Total number of codes created',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000018',
  '10000000-0000-0000-0000-000000000003',
  5,
  '5. Drafting Policy Briefs & Evaluation Reports',
  'Policy Translation & High-Impact Dissemination',
  '{"Structure comprehensive evaluation reports aligned with NITI Aayog and OECD-DAC evaluation criteria.","Draft concise 2-4 page executive policy briefs for senior bureaucrats and foundation trustees.","Synthesize actionable, prioritized recommendations tied to institutional budgets and policy levers.","Prepare policy dissemination slide decks and facilitate high-level stakeholder workshops."}'::text[],
  5,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000041',
  '20000000-0000-0000-0000-000000000018',
  '5.1',
  '5.1 Writing Policy Briefs That Drive Action',
  'pdf', 'social-research-policy/module-5/5.1-writing-policy-briefs.pdf',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000023',
  '20000000-0000-0000-0000-000000000018',
  'What is the standard turnaround time for peer review on policy briefs?',
  'Policy briefs undergo 48-hour internal peer review by the Research Committee before final copyediting and client submission.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000018',
  '20000000-0000-0000-0000-000000000018',
  'Policy Translation & High-Impact Dissemination',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000021',
  '50000000-0000-0000-0000-000000000018',
  'Under the OECD-DAC evaluation criteria, which dimension evaluates whether intervention benefits will persist after donor funding ends?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000081',
  '60000000-0000-0000-0000-000000000021',
  'Relevance',
  0,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000082',
  '60000000-0000-0000-0000-000000000021',
  'Efficiency',
  1,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000083',
  '60000000-0000-0000-0000-000000000021',
  'Sustainability',
  2,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000084',
  '60000000-0000-0000-0000-000000000021',
  'Coherence',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

-- Exam Questions for Social Research & Policy
insert into public.exam_questions (id, programme_id, question, prompt, max_marks, sort_order)
values (
  '80000000-0000-0000-0000-000000000007',
  '10000000-0000-0000-0000-000000000003',
  '1. Multi-Stage Sampling & Field Strategy',
  'You are commissioned by a multilateral agency to evaluate a maternal and child nutrition programme across 12 high-burden districts in Uttar Pradesh. Propose your complete sampling design, sample size justification, clustering adjustments, and household selection methodology.',
  100,
  0
)
on conflict (id) do update set
  question = excluded.question,
  prompt = excluded.prompt,
  sort_order = excluded.sort_order;
insert into public.exam_questions (id, programme_id, question, prompt, max_marks, sort_order)
values (
  '80000000-0000-0000-0000-000000000008',
  '10000000-0000-0000-0000-000000000003',
  '2. Mixed-Methods Triangulation Framework',
  'Explain how you would triangulate quantitative survey findings with Focus Group Discussions and Key Informant Interviews to assess why a rural drinking water initiative achieved high infrastructure installation but low community utilization.',
  100,
  1
)
on conflict (id) do update set
  question = excluded.question,
  prompt = excluded.prompt,
  sort_order = excluded.sort_order;
insert into public.exam_questions (id, programme_id, question, prompt, max_marks, sort_order)
values (
  '80000000-0000-0000-0000-000000000009',
  '10000000-0000-0000-0000-000000000003',
  '3. Executive Policy Recommendation Framing',
  'Draft an executive summary and three actionable policy recommendations for a state Ministry of Health based on findings showing a 35% dropout rate in immunisation booster doses among migrant urban poor households.',
  100,
  2
)
on conflict (id) do update set
  question = excluded.question,
  prompt = excluded.prompt,
  sort_order = excluded.sort_order;

-- -----------------------------------------------------
-- Programme: Design & Social Media
-- -----------------------------------------------------
insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000019',
  '10000000-0000-0000-0000-000000000004',
  0,
  '0. Ikaai Brand Identity & Visual Guidelines',
  'Institutional Typography, Palettes & Brand Governance',
  '{"Master Ikaai''s brand color system: Emerald Green (#00511e), Vibrant Accent (#00a544), Mint (#5ee9b5), and dark/light neutrals.","Implement typography standards: Manrope for primary headings and Inter for body copy across all institutional collaterals.","Understand official logo clearance zones, minimum display sizes, and forbidden modifications (no drop-shadows or distortions).","Access official vector asset repositories, iconography sets, and digital brand templates."}'::text[],
  0,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000042',
  '20000000-0000-0000-0000-000000000019',
  '0.1',
  '0.1 Ikaai Institutional Brand Styleguide 2026',
  'pdf', 'design-social-media/module-0/0.1-brand-styleguide-2026.pdf',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000024',
  '20000000-0000-0000-0000-000000000019',
  'Where can I download high-resolution SVG and PNG logos?',
  'All official vector and raster logo assets are located in the shared branding drive at Assets/Branding/Logos/.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000019',
  '20000000-0000-0000-0000-000000000019',
  'Institutional Typography, Palettes & Brand Governance',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000022',
  '50000000-0000-0000-0000-000000000019',
  'What is Ikaai''s primary brand accent hex code used for interactive buttons and key progress indicators?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000085',
  '60000000-0000-0000-0000-000000000022',
  '#00a544',
  0,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000086',
  '60000000-0000-0000-0000-000000000022',
  '#3b82f6',
  1,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000087',
  '60000000-0000-0000-0000-000000000022',
  '#e11d48',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000088',
  '60000000-0000-0000-0000-000000000022',
  '#f59e0b',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000020',
  '10000000-0000-0000-0000-000000000004',
  1,
  '1. Publication Design & High-Impact Report Layouts',
  'Editorial Design & Multi-Page Document Architecture',
  '{"Design publication-grade research reports in Adobe InDesign, Illustrator, and professional Canva enterprise templates.","Master multi-column grid layouts, baseline grids, typographic hierarchy, and pull-quote treatments.","Format dense statistical tables, executive callout boxes, and methodology sidebars with optical balance.","Prepare print-ready PDFs with bleed, trim marks, CMYK profiles, and interactive digital PDFs with hyperlinked TOCs."}'::text[],
  1,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000043',
  '20000000-0000-0000-0000-000000000020',
  '1.1',
  '1.1 Editorial Design Manual for Development Reports',
  'pdf', 'design-social-media/module-1/1.1-editorial-design-manual.pdf',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000025',
  '20000000-0000-0000-0000-000000000020',
  'What color mode should be exported for reports sent to commercial offset printers?',
  'Export in CMYK with FOGRA39 or Coated GRACoL color profiles, including 3mm bleed and crop marks.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000020',
  '20000000-0000-0000-0000-000000000020',
  'Editorial Design & Multi-Page Document Architecture',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000023',
  '50000000-0000-0000-0000-000000000020',
  'What is the recommended leading (line-spacing) for 10pt body text in Ikaai analytical reports?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000089',
  '60000000-0000-0000-0000-000000000023',
  '10pt (solid)',
  0,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000090',
  '60000000-0000-0000-0000-000000000023',
  '14pt to 15pt',
  1,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000091',
  '60000000-0000-0000-0000-000000000023',
  '24pt',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000092',
  '60000000-0000-0000-0000-000000000023',
  '30pt',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000021',
  '10000000-0000-0000-0000-000000000004',
  2,
  '2. Social Data Infographics & Visualizing Complex Findings',
  'Information Design & Quantitative Visuals',
  '{"Transform complex econometrics into compelling visual infographics for public and media understanding.","Select optimal visualization archetypes: flowcharts, geographic heatmaps, treemaps, and waffle charts.","Design clear, accessible data keys, annotations, and contextual reference benchmarks.","Ensure accessibility: color-blind safe palettes (WCAG AAA contrast) and responsive layouts."}'::text[],
  2,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000044',
  '20000000-0000-0000-0000-000000000021',
  '2.1',
  '2.1 Infographic Design Principles for Social Evidence',
  'presentation', 'design-social-media/module-2/2.1-infographic-design-principles.pptx',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000026',
  '20000000-0000-0000-0000-000000000021',
  'Which tool is preferred for complex interactive map visualizations?',
  'QGIS combined with Adobe Illustrator, or Mapbox Studio for interactive web embedding.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000021',
  '20000000-0000-0000-0000-000000000021',
  'Information Design & Quantitative Visuals',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000024',
  '50000000-0000-0000-0000-000000000021',
  'Why must bar chart vertical axes always start at zero in research infographics?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000093',
  '60000000-0000-0000-0000-000000000024',
  'To prevent optical distortion and artificial exaggeration of percentage differences',
  0,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000094',
  '60000000-0000-0000-0000-000000000024',
  'To save ink during printing',
  1,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000095',
  '60000000-0000-0000-0000-000000000024',
  'Because Canva does not support custom axes',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000096',
  '60000000-0000-0000-0000-000000000024',
  'To make all bars look the same height',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000022',
  '10000000-0000-0000-0000-000000000004',
  3,
  '3. Social Media Content Strategy & LinkedIn Advocacy',
  'B2B Social Media Growth & Thought Leadership',
  '{"Devise content calendars across LinkedIn, Twitter/X, and institutional newsletters promoting Ikaai''s research.","Write compelling hook-driven post copy, executive summaries, and carousel slide narratives.","Design high-performing LinkedIn document carousels (1080x1350px format) breaking down complex policy briefs.","Implement growth strategies: tag partner organizations, leverage trending developmental hashtags, and engage sector leaders."}'::text[],
  3,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000045',
  '20000000-0000-0000-0000-000000000022',
  '3.1',
  '3.1 The Ikaai LinkedIn Playbook for Policy Think Tanks',
  'document', 'design-social-media/module-3/3.1-linkedin-playbook.docx',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000027',
  '20000000-0000-0000-0000-000000000022',
  'What is the recommended posting cadence on LinkedIn?',
  'Ikaai publishes 3 thought-leadership pieces weekly: Tuesday, Wednesday, and Thursday mornings at 9:00 AM IST.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000022',
  '20000000-0000-0000-0000-000000000022',
  'B2B Social Media Growth & Thought Leadership',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000025',
  '50000000-0000-0000-0000-000000000022',
  'What aspect ratio delivers the highest visual engagement for LinkedIn PDF document carousels on mobile devices?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000097',
  '60000000-0000-0000-0000-000000000025',
  '16:9 widescreen',
  0,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000098',
  '60000000-0000-0000-0000-000000000025',
  '1:1 square',
  1,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000099',
  '60000000-0000-0000-0000-000000000025',
  '4:5 portrait (1080x1350px)',
  2,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000100',
  '60000000-0000-0000-0000-000000000025',
  '9:16 vertical video',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000023',
  '10000000-0000-0000-0000-000000000004',
  4,
  '4. Short-Form Video & Multimedia Production',
  'Video Storytelling & Field Documentation',
  '{"Produce 60-90 second research explainers and field beneficiary spotlight reels for YouTube Shorts and LinkedIn.","Master Adobe Premiere Pro, CapCut, and DaVinci Resolve editing workflows.","Record clear field audio with wireless lavaliers, apply noise reduction, and select royalty-free background scores.","Generate accurate open and closed captions (SRT) in Hindi and English for mobile accessibility."}'::text[],
  4,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000046',
  '20000000-0000-0000-0000-000000000023',
  '4.1',
  '4.1 Video Production SOP for Field Research',
  'pdf', 'design-social-media/module-4/4.1-video-production-sop.pdf',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000028',
  '20000000-0000-0000-0000-000000000023',
  'Where can I source licensed music tracks for Ikaai video edits?',
  'Use Ikaai''s licensed enterprise account on Epidemic Sound or Artlist. Never use copyrighted commercial tracks without explicit licensing.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000023',
  '20000000-0000-0000-0000-000000000023',
  'Video Storytelling & Field Documentation',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000026',
  '50000000-0000-0000-0000-000000000023',
  'Why are burned-in or open captions mandatory for all Ikaai social video content?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000101',
  '60000000-0000-0000-0000-000000000026',
  'Because algorithms disqualify silent videos',
  0,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000102',
  '60000000-0000-0000-0000-000000000026',
  'Because over 80% of social media users consume video with sound muted on mobile feeds',
  1,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000103',
  '60000000-0000-0000-0000-000000000026',
  'To replace the need for voiceover artists',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000104',
  '60000000-0000-0000-0000-000000000026',
  'Because video editing software requires them',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000024',
  '10000000-0000-0000-0000-000000000004',
  5,
  '5. Campaign Analytics & Digital Outreach Optimization',
  'Analytics & Audience Conversion',
  '{"Track web referral traffic and report downloads using Google Analytics 4 (GA4) and UTM parameters.","Analyze social metrics: Impressions, Engagement Rate, Click-Through Rate (CTR), and follower growth.","Conduct A/B testing on report cover designs, thumbnail images, and post copy headlines.","Compile monthly Digital Impact Reports for executive leadership and donor transparency."}'::text[],
  5,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000047',
  '20000000-0000-0000-0000-000000000024',
  '5.1',
  '5.1 Digital Campaign Measurement Framework',
  'document', 'design-social-media/module-5/5.1-campaign-measurement-framework.docx',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000029',
  '20000000-0000-0000-0000-000000000024',
  'How do I generate an official Ikaai campaign UTM tracking link?',
  'Use the Campaign URL Builder sheet pinned in the #design-team Slack channel to ensure consistent tagging syntax.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000024',
  '20000000-0000-0000-0000-000000000024',
  'Analytics & Audience Conversion',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000027',
  '50000000-0000-0000-0000-000000000024',
  'What is considered the most significant conversion event for a digital research campaign at Ikaai?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000105',
  '60000000-0000-0000-0000-000000000027',
  'A random profile visit',
  0,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000106',
  '60000000-0000-0000-0000-000000000027',
  'A full evaluation report PDF download driven through tracked campaign UTM links',
  1,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000107',
  '60000000-0000-0000-0000-000000000027',
  'An automated bot comment',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000108',
  '60000000-0000-0000-0000-000000000027',
  'A post retweet',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

-- Exam Questions for Design & Social Media
insert into public.exam_questions (id, programme_id, question, prompt, max_marks, sort_order)
values (
  '80000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000004',
  '1. Multi-Page Publication Design & Typographic Strategy',
  'You are assigned to design the layout for a 60-page flagship evaluation report on rural healthcare interventions. Detail your typographic scale, grid structure, executive summary layout, chart styling, and print/digital export specifications.',
  100,
  0
)
on conflict (id) do update set
  question = excluded.question,
  prompt = excluded.prompt,
  sort_order = excluded.sort_order;
insert into public.exam_questions (id, programme_id, question, prompt, max_marks, sort_order)
values (
  '80000000-0000-0000-0000-000000000011',
  '10000000-0000-0000-0000-000000000004',
  '2. Data Infographic Conception for Non-Technical Audiences',
  'Translate a multi-district baseline study showing complex correlations between female literacy, household sanitation, and childhood stunting into a high-impact infographic concept. Describe the visual layout, chart choices, and color strategy.',
  100,
  1
)
on conflict (id) do update set
  question = excluded.question,
  prompt = excluded.prompt,
  sort_order = excluded.sort_order;
insert into public.exam_questions (id, programme_id, question, prompt, max_marks, sort_order)
values (
  '80000000-0000-0000-0000-000000000012',
  '10000000-0000-0000-0000-000000000004',
  '3. Integrated Social Media Launch Campaign',
  'Create a 2-week digital launch campaign strategy for a newly published policy evaluation. Detail your content calendar, LinkedIn carousel slide breakdown, video teaser format, and key performance indicators (KPIs).',
  100,
  2
)
on conflict (id) do update set
  question = excluded.question,
  prompt = excluded.prompt,
  sort_order = excluded.sort_order;

-- -----------------------------------------------------
-- Programme: Business Development
-- -----------------------------------------------------
insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000025',
  '10000000-0000-0000-0000-000000000005',
  0,
  '0. Development Sector Landscape & Ikaai Consulting Offerings',
  'Development Consulting & Ikaai Value Proposition',
  '{"Understand the social sector institutional architecture: Central/State Ministries, Multilateral Agencies (World Bank, ADB, UNICEF), and CSR Foundations.","Master Ikaai''s core consulting capabilities: Baseline/Endline Surveys, Third-Party Monitoring (TPM), Impact Assessments, and Policy Advisory.","Learn Ikaai''s competitive advantages: technological rigor, Pan-India CAPI field footprint, and high-speed statistical delivery.","Familiarize yourself with statutory procurement norms: GFR 2017, CSR Section 135 (Companies Act 2013), and GeM Portal guidelines."}'::text[],
  0,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000048',
  '20000000-0000-0000-0000-000000000025',
  '0.1',
  '0.1 Ikaai Corporate Profile & Capability Deck',
  'presentation', 'business-development/module-0/0.1-corporate-profile-deck.pptx',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000030',
  '20000000-0000-0000-0000-000000000025',
  'Where can I find Ikaai''s latest past-performance credentials and completion certificates?',
  'All signed client completion certificates, work orders, and reference letters are archived in Drive at BD_Repository/01_Credentials/.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000025',
  '20000000-0000-0000-0000-000000000025',
  'Development Consulting & Ikaai Value Proposition',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000028',
  '50000000-0000-0000-0000-000000000025',
  'Under Section 135 of the Indian Companies Act 2013, which companies are legally mandated to conduct independent CSR Impact Assessments?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000109',
  '60000000-0000-0000-0000-000000000028',
  'Every startup registered in India',
  0,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000110',
  '60000000-0000-0000-0000-000000000028',
  'Companies with an average CSR obligation of Rs 10 Crore or more in the three preceding financial years, for projects of Rs 1 Crore or more',
  1,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000111',
  '60000000-0000-0000-0000-000000000028',
  'Only public sector banks',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000112',
  '60000000-0000-0000-0000-000000000028',
  'Companies that have suffered annual net losses',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000026',
  '10000000-0000-0000-0000-000000000005',
  1,
  '1. RFP Sourcing & Bid Tracking (GeM, DevNetJobs, CPP Portal)',
  'Procurement Portals & Opportunity Qualification',
  '{"Master daily opportunity tracking across Government e-Marketplace (GeM), Central Public Procurement Portal (CPPP), DevNetJobs, and state e-tenders.","Evaluate tender documents: Eligibility Criteria (Turnover, Past Experience, Team Qualifications) and Scope of Work (SOW).","Execute Go / No-Go decision matrix evaluating win probability, margin feasibility, and strategic partnership value.","Maintain the institutional CRM pipeline tracking deals from Prospecting through Submission to Award."}'::text[],
  1,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000049',
  '20000000-0000-0000-0000-000000000026',
  '1.1',
  '1.1 The Opportunity Qualification SOP',
  'document', 'business-development/module-1/1.1-opportunity-qualification-sop.docx',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000031',
  '20000000-0000-0000-0000-000000000026',
  'How can Micro and Small Enterprises (MSEs) claim EMD exemptions on GeM?',
  'By submitting a valid Udyam Registration Certificate under the Ministry of MSME, fulfilling statutory exemption guidelines.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000026',
  '20000000-0000-0000-0000-000000000026',
  'Procurement Portals & Opportunity Qualification',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000029',
  '50000000-0000-0000-0000-000000000026',
  'What is the primary purpose of an Earnest Money Deposit (EMD) in public procurement tenders?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000113',
  '60000000-0000-0000-0000-000000000029',
  'To pay the salaries of government evaluators',
  0,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000114',
  '60000000-0000-0000-0000-000000000029',
  'A financial guarantee demonstrating genuine bidder commitment, returned to unsuccessful bidders after tender award',
  1,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000115',
  '60000000-0000-0000-0000-000000000029',
  'A non-refundable application fee',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000116',
  '60000000-0000-0000-0000-000000000029',
  'An upfront advance payment for consulting services',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000027',
  '10000000-0000-0000-0000-000000000005',
  2,
  '2. Technical Proposal Writing & Methodology Framing',
  'Technical Bidding & Winning Proposal Architecture',
  '{"Draft compelling technical proposals responding meticulously to Terms of Reference (TOR).","Frame research methodologies: sampling approaches, data quality protocols, analytical frameworks, and work plans.","Develop detailed GANTT milestone schedules, staffing matrices, and risk mitigation strategies.","Write persuasive executive summaries highlighting Ikaai''s innovations, field capacity, and sector leadership."}'::text[],
  2,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000050',
  '20000000-0000-0000-0000-000000000027',
  '2.1',
  '2.1 Technical Proposal Blueprint & Master Templates',
  'pdf', 'business-development/module-2/2.1-technical-proposal-blueprint.pdf',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000032',
  '20000000-0000-0000-0000-000000000027',
  'What is the standard proposal review workflow before submission?',
  'All technical bids undergo a 3-tier review: Peer Review -> Technical Director Sign-off -> Commercial Director Approval.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000027',
  '20000000-0000-0000-0000-000000000027',
  'Technical Bidding & Winning Proposal Architecture',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000030',
  '50000000-0000-0000-0000-000000000027',
  'In a Quality and Cost Based Selection (QCBS 80:20) procurement, which component carries 80% of the overall evaluation weight?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000117',
  '60000000-0000-0000-0000-000000000030',
  'The lowest price quoted in the financial bid',
  0,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000118',
  '60000000-0000-0000-0000-000000000030',
  'The technical proposal score evaluated by the expert committee',
  1,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000119',
  '60000000-0000-0000-0000-000000000030',
  'The age of the consulting company',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000120',
  '60000000-0000-0000-0000-000000000030',
  'The number of social media followers',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000028',
  '10000000-0000-0000-0000-000000000005',
  3,
  '3. Financial Modeling & Resource Costing for Bids',
  'Budget Architecture & Financial Bid Strategy',
  '{"Build granular financial models: enumerator per-diems, travel/logistics, tablet rentals, software licenses, and expert mandays.","Calculate gross margins, overhead absorption, contingency reserves, and statutory GST taxation (18%).","Formulate strategic financial bidding tactics (L1 competitive pricing vs premium quality pricing).","Prepare statutory financial bidding formats: BoQ spreadsheets, breakdown of remuneration, and out-of-pocket expenses."}'::text[],
  3,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000051',
  '20000000-0000-0000-0000-000000000028',
  '3.1',
  '3.1 Consulting Financial Costing Model & Guidelines',
  'document', 'business-development/module-3/3.1-financial-costing-model.docx',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000033',
  '20000000-0000-0000-0000-000000000028',
  'Are financial bids submitted in the same envelope as technical bids?',
  'Never in two-cover bidding. Placing financial figures in the technical envelope leads to immediate disqualification.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000028',
  '20000000-0000-0000-0000-000000000028',
  'Budget Architecture & Financial Bid Strategy',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000031',
  '50000000-0000-0000-0000-000000000028',
  'What is the applicable Goods and Services Tax (GST) rate for management and technical research consultancy in India?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000121',
  '60000000-0000-0000-0000-000000000031',
  '0%',
  0,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000122',
  '60000000-0000-0000-0000-000000000031',
  '5%',
  1,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000123',
  '60000000-0000-0000-0000-000000000031',
  '12%',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000124',
  '60000000-0000-0000-0000-000000000031',
  '18%',
  3,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000029',
  '10000000-0000-0000-0000-000000000005',
  4,
  '4. Institutional Pitching & Client Presentations',
  'Pitch Deck Mastery & High-Stakes Negotiations',
  '{"Deliver high-impact technical presentations to government evaluation committees and corporate CSR boards.","Structure 15-minute pitch decks focusing on problem diagnostic, customized methodology, and strategic value.","Handle aggressive Q&A sessions, scope clarifications, and methodological challenges with poise.","Navigate pre-contract negotiation meetings to protect intellectual property and milestone payment schedules."}'::text[],
  4,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000052',
  '20000000-0000-0000-0000-000000000029',
  '4.1',
  '4.1 The Art of the Development Pitch Deck',
  'presentation', 'business-development/module-4/4.1-development-pitch-deck.pptx',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000034',
  '20000000-0000-0000-0000-000000000029',
  'Who leads client pitch presentations?',
  'Presentations are co-led by the BD Lead (framing value & credentials) and the Lead Researcher (methodology & execution defense).',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000029',
  '20000000-0000-0000-0000-000000000029',
  'Pitch Deck Mastery & High-Stakes Negotiations',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000032',
  '50000000-0000-0000-0000-000000000029',
  'What is the most effective approach when an evaluation committee challenges your proposed sample size as being too small?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000125',
  '60000000-0000-0000-0000-000000000032',
  'Argue with the committee members',
  0,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000126',
  '60000000-0000-0000-0000-000000000032',
  'Walk through the statistical power calculation showing 80% power at alpha=0.05, while offering optional booster cluster scenarios',
  1,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000127',
  '60000000-0000-0000-0000-000000000032',
  'Immediately agree to double the sample size without discussing budget',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000128',
  '60000000-0000-0000-0000-000000000032',
  'Refer them to a textbook',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

insert into public.modules (id, programme_id, number, title, description, learning_objectives, sort_order, timer_seconds)
values (
  '20000000-0000-0000-0000-000000000030',
  '10000000-0000-0000-0000-000000000005',
  5,
  '5. Key Account Management & Long-term Partnerships',
  'Client Retention & Repeat Business Expansion',
  '{"Manage ongoing client relationships across project delivery lifecycles, ensuring milestone sign-offs and timely invoicing.","Conduct post-project review sessions and Net Promoter Score (NPS) client satisfaction evaluations.","Identify cross-sell and up-sell opportunities: moving clients from one-off baseline evaluations to multi-year monitoring retainers.","Draft formal MoUs and institutional partnership agreements with universities and think tanks."}'::text[],
  5,
  30
)
on conflict (programme_id, number) do update set
  title = excluded.title,
  description = excluded.description,
  learning_objectives = excluded.learning_objectives,
  sort_order = excluded.sort_order;

insert into public.resources (id, module_id, number, title, type, storage_path, sort_order)
values (
  '30000000-0000-0000-0000-000000000053',
  '20000000-0000-0000-0000-000000000030',
  '5.1',
  '5.1 Key Account Management Playbook',
  'document', 'business-development/module-5/5.1-key-account-playbook.docx',
  0
)
on conflict (id) do update set
  title = excluded.title,
  number = excluded.number,
  type = excluded.type,
  storage_path = excluded.storage_path,
  sort_order = excluded.sort_order;

insert into public.faqs (id, module_id, question, answer, sort_order)
values (
  '40000000-0000-0000-0000-000000000035',
  '20000000-0000-0000-0000-000000000030',
  'What CRM software does Ikaai use for deal pipeline tracking?',
  'Ikaai manages sales pipelines in HubSpot CRM Enterprise. All client emails, meeting notes, and deal stages must be logged weekly.',
  0
)
on conflict (id) do update set
  question = excluded.question,
  answer = excluded.answer,
  sort_order = excluded.sort_order;

insert into public.quizzes (id, module_id, title, pass_mark)
values (
  '50000000-0000-0000-0000-000000000030',
  '20000000-0000-0000-0000-000000000030',
  'Client Retention & Repeat Business Expansion',
  80
)
on conflict (module_id) do update set
  title = excluded.title,
  pass_mark = excluded.pass_mark;

insert into public.quiz_questions (id, quiz_id, question, sort_order)
values (
  '60000000-0000-0000-0000-000000000033',
  '50000000-0000-0000-0000-000000000030',
  'How many days in advance of contract expiration should a BD manager initiate renewal or follow-on phase discussions?',
  0
)
on conflict (id) do update set
  question = excluded.question,
  sort_order = excluded.sort_order;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000129',
  '60000000-0000-0000-0000-000000000033',
  'The day before expiration',
  0,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000130',
  '60000000-0000-0000-0000-000000000033',
  '90 days prior',
  1,
  true
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000131',
  '60000000-0000-0000-0000-000000000033',
  '1 year prior',
  2,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;
insert into public.quiz_options (id, question_id, option_text, sort_order, is_correct)
values (
  '70000000-0000-0000-0000-000000000132',
  '60000000-0000-0000-0000-000000000033',
  'After funding stops',
  3,
  false
)
on conflict (id) do update set
  option_text = excluded.option_text,
  sort_order = excluded.sort_order,
  is_correct = excluded.is_correct;

-- Exam Questions for Business Development
insert into public.exam_questions (id, programme_id, question, prompt, max_marks, sort_order)
values (
  '80000000-0000-0000-0000-000000000013',
  '10000000-0000-0000-0000-000000000005',
  '1. Tender Sourcing & Go/No-Go Evaluation',
  'You identify an RFP on GeM issued by a state livelihood mission for an impact evaluation of rural self-help groups (Budget: Rs 45 Lakhs, Sample: 12,000 households, Timeline: 4 months). Outline your Go/No-Go evaluation framework assessing technical feasibility, margin, and risk.',
  100,
  0
)
on conflict (id) do update set
  question = excluded.question,
  prompt = excluded.prompt,
  sort_order = excluded.sort_order;
insert into public.exam_questions (id, programme_id, question, prompt, max_marks, sort_order)
values (
  '80000000-0000-0000-0000-000000000014',
  '10000000-0000-0000-0000-000000000005',
  '2. Competitive Technical Proposal Structuring',
  'Structure the executive summary and methodology section of a winning technical proposal responding to an international donor''s RFP for third-party monitoring of rural solar electrification across 200 tribal villages in Odisha and Jharkhand.',
  100,
  1
)
on conflict (id) do update set
  question = excluded.question,
  prompt = excluded.prompt,
  sort_order = excluded.sort_order;
insert into public.exam_questions (id, programme_id, question, prompt, max_marks, sort_order)
values (
  '80000000-0000-0000-0000-000000000015',
  '10000000-0000-0000-0000-000000000005',
  '3. Commercial Proposal Budget Breakdown',
  'Construct a comprehensive commercial budget breakdown for a 6,000 household primary survey across 4 districts. Account for field staff remuneration, supervisor oversight, travel/logistics, tablet tech, management fee, and 18% GST.',
  100,
  2
)
on conflict (id) do update set
  question = excluded.question,
  prompt = excluded.prompt,
  sort_order = excluded.sort_order;

-- -----------------------------------------------------
-- 3. INSERT 11 JOB DESCRIPTIONS

-- -----------------------------------------------------
-- 3. JOBS (11 Official Role Specifications)
-- Converted directly from .docx with complete HTML
-- -----------------------------------------------------
alter table public.jobs add column if not exists summary text;

insert into public.jobs (id, title, slug, category, programme_id, summary, content_html, docx_path, sort_order)
values (
  '90000000-0000-0000-0000-000000000001',
  'Data Analyst Intern',
  'data-analyst-intern',
  'Data Analyst',
  '10000000-0000-0000-0000-000000000002',
  $sum$Data extraction, statistical modeling, quantitative survey analysis, dataset cleaning, and interactive dashboard visualization for public policy projects.$sum$,
  $jd$<p><strong>IKAAI INDIA </strong></p><p><strong>Internships 2026</strong></p><p><strong>Position: Data Analyst Intern</strong></p><p><strong>Job Description</strong></p><p><strong>About us:</strong> Ikaai India is a Delhi-based monitoring, evaluation, and research consultancy working with government departments, multilateral agencies, CSR foundations, and development organizations. We specialize in large-scale surveys, impact assessments, third-party evaluations, and policy research across India. For more information, please visit our website – <a href="http://www.ikaaiindia.in">www.ikaaiindia.in</a></p><p><strong>Type of Internship- </strong>On site</p><p><strong>Location:</strong> Sector 18 Rohini, Delhi <br /><strong>Apply at:</strong> <a href="mailto:hr@ikaaiindia.in">hr@ikaaiindia.in</a> {<em>Subject line: Data Analyst Intern_ [Enter your name]</em>}</p><p><strong>Internship period: </strong>2 - 3 months (Starting from April)</p><ol><li><strong>Role Overview</strong></li></ol><p>We are looking for a highly motivated Data Analyst Intern who is keen to gain hands-on experience in real-world research and evaluation projects. The intern will work closely with our research team and contribute to ongoing impact assessments, surveys, and analytical assignments.</p><p>This role offers a strong learning opportunity for individuals interested in data-driven research, social sector analytics, and consulting projects.</p><ol><li><strong>Key Responsibilities</strong></li></ol><ul><li>Assist in cleaning, managing, and analysing large datasets from field surveys and research studies</li><li>Work on tools such as Power BI, SQL, SPSS, and Excel for data analysis and visualization</li><li>Support in building dashboards and visual reports for ongoing projects</li><li>Assist in qualitative data analysis using tools like NVivo</li><li>Contribute to data interpretation and generation of insights for reports</li><li>Work with existing datasets from past projects to derive additional insights</li><li>Support in developing data collection tools, applications and basic application workflows (where required)</li><li>Collaborate with the research team on live impact assessment and evaluation studies</li></ul><ol><li><strong>Eligibility Criteria</strong></li></ol><ul><li>Master’s degree (completed) in Statistics, Economics, Data/computer Science, Social Sciences, Public Policy, or related fields</li><li>Strong interest in data analysis and research in the development sector</li></ul><ol><li><strong>Required Skills</strong></li></ol><ul><li>Working knowledge of at least some of the following tools:<ul><li>Power BI / Tableau</li><li>SQL</li><li>SPSS / R / Python (any one is a plus)</li><li>NVivo or qualitative analysis tools</li></ul></li><li>Good understanding of data cleaning, analysis, and visualization</li><li>Familiarity with UI/UX or application development is an added advantage</li><li>Strong analytical thinking and attention to detail</li></ul><ol><li><strong>What You Will Gain</strong></li></ol><ul><li>Hands-on experience on live impact assessment and research projects</li><li>Exposure to end-to-end research processes (tool design to reporting)</li><li>Opportunity to work with large-scale primary datasets</li><li>Practical experience with industry-relevant tools and software</li><li>Mentorship from experienced researchers </li><li>Strong portfolio-building experience for careers in data analytics, consulting, and development sector</li></ul><p>#<em>The management of Ikaai India Research Pvt. Ltd. reserves the right to terminate the internship at any time, without prior notice, in case of unsatisfactory performance, lack of professionalism, or non-adherence to assigned roles and responsibilities. </em></p>$jd$,
  'JD/Data Analyst Intern JD.docx',
  0
)
on conflict (slug) do update set
  title = excluded.title,
  category = excluded.category,
  programme_id = excluded.programme_id,
  summary = excluded.summary,
  content_html = excluded.content_html,
  docx_path = excluded.docx_path,
  sort_order = excluded.sort_order;

insert into public.jobs (id, title, slug, category, programme_id, summary, content_html, docx_path, sort_order)
values (
  '90000000-0000-0000-0000-000000000002',
  'HR Intern',
  'hr-intern',
  'HR & Admin',
  '10000000-0000-0000-0000-000000000001',
  $sum$Talent acquisition coordination, candidate sourcing, internship onboarding, attendance records, and day-to-day HR operational support.$sum$,
  $jd$<p><strong>IKAAI INDIA </strong></p><p><strong>Hybrid Internships 2026</strong></p><p><strong>Position: HR and Admin Intern</strong></p><p><strong>Job Description</strong></p><p><strong>About us:</strong> Ikaai India is a Delhi-based monitoring, evaluation, and research consultancy working with government departments, multilateral agencies, CSR foundations, and development organizations. We specialize in large-scale surveys, impact assessments, third-party evaluations, and policy research across India. For more information, please visit our website – <a href="http://www.ikaaiindia.in">www.ikaaiindia.in</a></p><p><strong>Type of Internship- </strong>On site</p><p><strong>Location:</strong> Sector 18 Rohini, Delhi <br /><strong>Apply at:</strong> <a href="mailto:hr@ikaaiindia.in">hr@ikaaiindia.in</a> {<em>Subject line: HR and Admin Intern_ [Enter your name]</em>}</p><p><strong>Internship period: </strong>2 - 3 months</p><ol><li><strong>Role Overview</strong></li></ol><p>We are looking for an enthusiastic HR Intern to support recruitment and HR operations. The intern will gain practical exposure to hiring processes and organizational management.</p><ol><li><strong>Key Responsibilities</strong></li></ol><ul><li>Assist in sourcing and screening candidate profiles</li><li>Coordinate interview scheduling and follow-ups</li><li>Maintain candidate and employee databases</li><li>Support onboarding and documentation processes</li><li>Assist in drafting job descriptions and postings</li><li>Support general HR operations and administrative tasks</li></ul><ol><li><strong>Eligibility Criteria</strong></li></ol><ul><li>Bachelor’s/Master’s degree (completed/pursuing) in HR, Business Administration, or related fields</li><li>Interest in HR and recruitment</li></ul><ol><li><strong>Required Skills</strong></li></ol><ul><li>Good communication and interpersonal skills</li><li>Basic understanding of recruitment processes</li><li>Organizational and multitasking abilities</li><li>Proficiency in MS Office</li></ul><ol><li><strong>What You Will Gain</strong></li></ol><ul><li>Performance based stipend</li><li>Hands-on experience in recruitment and HR functions</li><li>Exposure to real-world HR operations</li><li>Professional skill development</li><li>Mentorship and learning opportunities</li></ul><p>#<em>The management of Ikaai India Research Pvt. Ltd. reserves the right to terminate the internship at any time, without prior notice, in case of unsatisfactory performance, lack of professionalism, or non-adherence to assigned roles and responsibilities. </em></p>$jd$,
  'JD/HR Intern JD_Ikaai.docx',
  1
)
on conflict (slug) do update set
  title = excluded.title,
  category = excluded.category,
  programme_id = excluded.programme_id,
  summary = excluded.summary,
  content_html = excluded.content_html,
  docx_path = excluded.docx_path,
  sort_order = excluded.sort_order;

insert into public.jobs (id, title, slug, category, programme_id, summary, content_html, docx_path, sort_order)
values (
  '90000000-0000-0000-0000-000000000003',
  'HR and Admin',
  'hr-and-admin',
  'HR & Admin',
  '10000000-0000-0000-0000-000000000001',
  $sum$Full-cycle recruitment, statutory compliance, HR policy implementation, office facilities management, vendor contracts, and team engagement.$sum$,
  $jd$<p><strong>IKAAI INDIA RESEARCH PVT. LTD.</strong></p><p><strong>Job Description</strong></p><p><strong>Hiring 2026</strong></p><p>About us: At Ikaai India Research, we're dedicated to empowering organizations, governments, and stakeholders with precise and actionable insights. Through meticulous data collection, sophisticated analytics, and insightful research, we equip decision-makers with the knowledge they need to drive meaningful change and sustainable progress. For more information, please visit our website – <a href="http://www.ikaaiindia.in">www.ikaaiindia.in</a> </p><table><tr><td><p><strong>Open Position</strong></p></td><td><p><strong>Key Roles &amp; Responsibilities<sup>#</sup></strong></p></td><td><p><strong>Education Qualification &amp; Experience</strong></p></td></tr><tr><td><p><strong>HR and Admin Associate</strong></p></td><td><p>• Recruitment support, onboarding, and exit formalities for regular and project-based staff<br />• Maintenance of employee records, contracts, attendance, and leave data<br />• Address day-to-day staff queries related to HR, administration, and office coordination<br />• Organize and coordinate staff-related events, meetings, trainings, and internal activities</p><ul><li>Preparation/updation of office policy documents such POSH, HR, Child protection etc.</li><li>Handle Gem Portal and similar platforms, tenders exploring, billings on Gem, Proposal submission</li></ul><p>• Support performance management and employee engagement<br />• Maintain daily office records, receipts, bills, and vouchers<br />• Support day-to-day accounting activities, including expense tracking, reimbursements, and vendor payments<br />• Coordinate with CA for statutory compliance, and filings (Might have go and visit CA office for official communications- CA office is nearby)<br />• Support day-to-day accounting records and preparation of internal MIS reports<br />• Ensure smooth day-to-day office operations and compliance with internal processes </p><ul><li>Coordination work for website maintenance, content updating</li><li>Handling Social Media Platforms on regular intervals</li></ul></td><td><p>• Graduate / Postgraduate in HR/MBA, Commerce, Accounting, Management, or related disciplines<br />• 1–3 years of experience in HR operations, office administration, and basic accounts <strong>[Freshers who are really willing to take up the post can apply]</strong><br />• Desired: Working knowledge of accounting practices, Tally / Excel<br />• Strong organizational, communication, and multitasking skills<br />• Ability to work independently in a startup environment</p></td></tr></table><p>*Salary range may vary based on experience and suitability.</p><p>#These are indicative job roles and may include other routine tasks as assigned by the Directors.</p><p><strong>Applicants should be comfortable working in a dynamic startup environment with small team. Interested candidates may apply by sharing their CV at hr@ikaaiindia.in with subject line: Application for {Post Applied}_[Name of the University].</strong></p><p><em>At Ikaai, we maintain strict office decorum, punctuality, and professional attire. We believe in active participation from all team members and a proactive approach to work, with clients always coming first.</em></p>$jd$,
  'JD/JD_HR and Admin.docx',
  2
)
on conflict (slug) do update set
  title = excluded.title,
  category = excluded.category,
  programme_id = excluded.programme_id,
  summary = excluded.summary,
  content_html = excluded.content_html,
  docx_path = excluded.docx_path,
  sort_order = excluded.sort_order;

insert into public.jobs (id, title, slug, category, programme_id, summary, content_html, docx_path, sort_order)
values (
  '90000000-0000-0000-0000-000000000004',
  'Associate – Partnerships and Business Development',
  'associate-partnerships-bd',
  'Business Development',
  '10000000-0000-0000-0000-000000000005',
  $sum$RFP sourcing, institutional proposal drafting, client relationship management, development sector pitching, and consortium building.$sum$,
  $jd$<p><strong>IKAAI INDIA RESEARCH PVT. LTD.</strong></p><p><strong>Job Description</strong></p><p><strong>Hiring 2026</strong></p><p><strong>About us:</strong> Ikaai India is a Delhi-based monitoring, evaluation, and research consultancy working with government departments, multilateral agencies, CSR foundations, and development organizations. We specialize in large-scale surveys, impact assessments, third-party evaluations, and policy research across India. For more information, please visit our website – <a href="http://www.ikaaiindia.in">www.ikaaiindia.in</a></p><p><strong>Job Opportunity: Associate- Partnerships and Business Development Associate</strong></p><p><strong>Location:</strong> Sector 18 Rohini, Delhi (with Pan India visits as and when required)<br /><strong>Apply at:</strong> <a href="mailto:hr@ikaaiindia.in">hr@ikaaiindia.in</a> {<em>Subject line: Application for Associate- Partnerships and Business Development Associate_ [Enter your name]</em>}<br /><strong>Reporting: </strong>Director <br /><strong>Experience Required:</strong> 2 to 5 years in the relevant field </p><p><strong>Probation period: </strong>6 months</p><ol><li><strong>Role Overview</strong></li></ol><p>We are seeking a dynamic and proactive professional to lead partnerships and business development tasks. The role involves identifying new opportunities, building and managing client relationships, and supporting end-to-end proposal development for research and consulting assignments.</p><ol><li><strong>Key Roles &amp; Responsibilities*<sup><a href="#footnote-1" id="footnote-ref-1">[1]</a></sup>:</strong></li></ol><table><tr><td><p><strong>Business Development &amp; Growth</strong></p></td><td><ul><li>Work closely with senior leadership to identify new work opportunities across research, monitoring &amp; evaluation, impact assessments, and consulting assignments.</li><li>Develop and manage a business development pipeline, tracking leads, follow-ups, and closures.</li><li>Identify opportunities through CSR portals, networks, industry forums, referrals, and partnerships.</li><li>Support strategic planning for organizational growth and diversification.</li></ul></td></tr><tr><td><p><strong>Partnerships &amp; Client Engagement</strong></p></td><td><ul><li>Lead outreach to Govt. Departments, corporates, CSR foundations, NGOs, trusts, and philanthropic organizations.</li><li>Develop and nurture Govt. and CSR partnerships, from initial engagement to project finalization.</li><li>Conduct client meetings, presentations, and discussions to understand client needs and align project objectives.</li><li>Represent Ikaai in CSR meetings, conferences, and stakeholder forums.</li></ul></td></tr><tr><td><p><strong>Proposal Development &amp; Pitching</strong></p></td><td><ul><li>Prepare high-quality pitch decks, proposals, concept notes, and presentations for CSR and institutional clients.</li><li>Coordinate with M&amp;E and research teams to develop technical approaches, indicators, timelines, and budgets.</li><li>Contribute to proposal sections related to monitoring frameworks, deliverables, reporting structures, and impact measurement.</li><li>Deliver client presentations and support negotiations and clarifications.</li></ul></td></tr><tr><td><p><strong>Coordination with M&amp;E &amp; Research Teams</strong></p></td><td><ul><li>Work closely with internal teams to understand project scope, methodology, and evaluation frameworks.</li><li>Support development of logframes, results frameworks, and monitoring plans for CSR projects.</li><li>Assist in client communication, reporting updates, and documentation during project implementation.</li><li>Ensure smooth handover from business development to project execution teams.</li></ul></td></tr><tr><td><p><strong>Reporting, Documentation &amp; Internal Support</strong></p></td><td><ul><li>Maintain records of proposals, pitches, client communications, and partnership agreements.</li><li>Prepare internal status reports, dashboards, and summaries for leadership review.</li><li>Support branding and outreach efforts related to business development, where required.</li><li>Any other tasks assigned by management in line with organizational objectives.</li></ul></td></tr></table><ol><li><strong>Education &amp; Skills Required:</strong></li></ol><table><tr><td><ol><li>Graduate or Postgraduate in <strong>Management (MBA/BBA), Economics, Public Policy, Development Studies, Marketing, or related disciplines</strong>.</li><li>3–5 years of experience in business development, CSR partnerships, consulting, or social sector roles.</li><li>Strong understanding of CSR ecosystem, development projects, and impact-oriented programs.</li><li>Working knowledge of monitoring &amp; evaluation concepts, indicators, and reporting preferred.</li><li>Excellent communication, presentation, and negotiation skills.</li><li>Ability to prepare client-ready pitch decks and proposals.</li><li>Comfortable working in a dynamic startup environment with multiple responsibilities.</li></ol></td></tr></table><ol><li><strong>Skills &amp; Competencies:</strong></li></ol><table><tr><td><ol><li>Strong written and verbal communication skills, with ability to draft proposals and reports</li><li>Proficiency in MS Excel, PowerPoint, and Word</li><li>Working knowledge of analytical tools such as SPSS, Power Bi, Tableau (preferred)</li><li>Ability to understand research and evaluation projects and translate them into proposals</li><li>Strong organisational and coordination skills with attention to detail</li><li>Proactive, self-driven, and able to work independently</li><li>Willingness to travel across states for client engagement, partnerships, and field-based coordination</li><li>Ability to engage with diverse stakeholders including government officials, NGOs, and community representatives</li></ol></td></tr></table><ol><li><strong>Work Environment &amp; Expectations</strong></li></ol><table><tr><td><ul><li>The applicant must be comfortable working in a dynamic startup environment with a small, high-responsibility team.</li><li>At Ikaai, we maintain strict office decorum, punctuality, and professional attire.</li><li>We value ownership, proactive problem-solving, and client-first orientation.</li></ul></td></tr></table><ol><li id="footnote-1"><p> Note: These are indicative job roles and may include other routine tasks as assigned by the Director. <a href="#footnote-ref-1">↑</a></p></li></ol>$jd$,
  'JD/JD_Associate- Partnerships and Business Development.docx',
  3
)
on conflict (slug) do update set
  title = excluded.title,
  category = excluded.category,
  programme_id = excluded.programme_id,
  summary = excluded.summary,
  content_html = excluded.content_html,
  docx_path = excluded.docx_path,
  sort_order = excluded.sort_order;

insert into public.jobs (id, title, slug, category, programme_id, summary, content_html, docx_path, sort_order)
values (
  '90000000-0000-0000-0000-000000000005',
  'Research Intern',
  'research-intern',
  'Research',
  '10000000-0000-0000-0000-000000000003',
  $sum$Literature reviews, quantitative dataset validation, qualitative interview transcription, field data collation, and policy brief drafting.$sum$,
  $jd$<p><strong>IKAAI INDIA </strong></p><p><strong>Hybrid Internships 2026</strong></p><p><strong>Position: Research and Data Analyst Intern</strong></p><p><strong>Description of duties and responsibilities</strong></p><p><strong>About us:</strong> Ikaai India is a Delhi-based monitoring, evaluation, and research consultancy working with government departments, multilateral agencies, CSR foundations, and development organizations. We specialize in large-scale surveys, impact assessments, third-party evaluations, and policy research across India. For more information, please visit our website – <a href="http://www.ikaaiindia.in">www.ikaaiindia.in</a></p><p><strong>Type of Internship- </strong>Hybrid (atleast 3 days work from office required) </p><p><strong>Location:</strong> Sector 18 Rohini, Delhi <br /><strong>Apply at:</strong> <a href="mailto:hr@ikaaiindia.in">hr@ikaaiindia.in</a> {<em>Subject line: Research and Data Analyst Intern_ [Enter your name]</em>}</p><p><strong>Internship period: </strong>2 - 3 months (Convertible into full-time role for exceptional candidates)</p><ol><li><strong>Role Overview</strong></li></ol><p>We are seeking Research and Data Analyst Interns who are passionate about working on development sector projects. The intern will support ongoing research studies, impact assessments, and field-based assignments (if required).</p><ol><li><strong>Key Responsibilities</strong></li></ol><ul><li>Assist in exploring potential clients/RFPs/Pitch requests</li><li>Assist in literature reviews and secondary research</li><li>Support in tool development (questionnaires, interview guides)</li><li>Assist in cleaning, managing, and analysing large datasets from field surveys and research studies</li><li>Work on tools such as Power BI, SQL, SPSS, and Excel for data analysis and visualization</li><li>Support in building dashboards and visual reports for ongoing projects and previous projects</li><li>Assist in qualitative data analysis using tools like NVivo</li><li>Contribute to data interpretation and generation of insights for reports</li><li>Work with existing datasets from past projects to derive additional insights</li><li>Support in developing data collection tools on CS Pro, Kobo Collect applications and basic application workflows (where required)</li><li>Collaborate with the research team on live impact assessment and evaluation studies</li><li>Assist in data collection coordination and monitoring</li><li>Contribute to qualitative and quantitative data analysis</li><li>Support report writing and documentation</li></ul><ol><li><strong>Eligibility Criteria</strong></li></ol><ul><li>Bachelor’s/Master’s degree (completed/pursuing) in Social Sciences, Public Policy, Economics, or related fields</li><li>Strong interest in research and the development sector</li></ul><ol><li><strong>Required Skills</strong></li></ol><ul><li>Good research and analytical skills</li><li>Strong writing and documentation ability</li><li>Familiarity with MS Office (Excel, Word, PowerPoint), SPSS (would be an advantage)</li><li>Attention to detail and critical thinking</li></ul><ol><li><strong>What You Will Gain</strong></li></ol><ul><li>Performance based stipend</li><li>Hands-on experience in research and evaluation projects</li><li>Exposure to end-to-end research processes</li><li>Opportunity to work on real-world development issues</li><li>Mentorship from experienced researchers</li></ul><p>#<em>The management of Ikaai India Research Pvt. Ltd. reserves the right to terminate the internship at any time, without prior notice, in case of unsatisfactory performance, lack of professionalism, or non-adherence to assigned roles and responsibilities. </em></p>$jd$,
  'JD/Research Intern JD-.docx',
  4
)
on conflict (slug) do update set
  title = excluded.title,
  category = excluded.category,
  programme_id = excluded.programme_id,
  summary = excluded.summary,
  content_html = excluded.content_html,
  docx_path = excluded.docx_path,
  sort_order = excluded.sort_order;

insert into public.jobs (id, title, slug, category, programme_id, summary, content_html, docx_path, sort_order)
values (
  '90000000-0000-0000-0000-000000000006',
  'Research Trainee',
  'research-trainee',
  'Research',
  '10000000-0000-0000-0000-000000000003',
  $sum$Foundational research methodology training, survey tool testing, primary field data collection, and structured research documentation.$sum$,
  $jd$<p><strong>IKAAI INDIA RESEARCH PVT. LTD.</strong></p><p><strong>Job Description</strong></p><p><strong>Hiring 2026</strong></p><p>About us: At Ikaai India Research, we're dedicated to empowering organizations, governments, and stakeholders with precise and actionable insights. Through meticulous data collection, sophisticated analytics, and insightful research, we equip decision-makers with the knowledge they need to drive meaningful change and sustainable progress. For more information, please visit our website – <a href="http://www.ikaaiindia.in">www.ikaaiindia.in</a><a id="_Hlk230256857"></a></p><p><strong>Job Opportunity: Research Trainee at Ikaai India</strong></p><p><a id="_Hlk230256972"></a><strong>Location:</strong> Sector 18 Rohini, Delhi </p><p><a id="_Hlk230258565"></a><strong>Apply at:</strong> <a href="mailto:hr@ikaaiindia.in">hr@ikaaiindia.in</a> {<em>Subject line: Application for Research Trainee_ [Enter your name]</em>}<br /><strong>Reporting: </strong>Director-Research/RA<br /><a id="_Hlk230257016"></a><strong>Experience Required:</strong> FRESHERS</p><p><a id="_Hlk230257086"></a><strong>Duration: </strong>6 months (Contract; Possibility of full-time employment based on performance)</p><p><strong>Stipend:</strong> 15000/- per month </p><ol><li><strong>Key Roles &amp; Responsibilities:</strong></li><li><strong>Proposal &amp; Client Engagement</strong></li></ol><ul><li> Assist in identifying research opportunities, projects, and proposal requirements. </li><li>Support in preparing proposals, presentations, concept notes, and other research documents. </li><li>Help in designing questionnaires, surveys, interview schedules, and data collection tools. </li><li>Conduct background research, literature reviews, and secondary data collection. </li><li>Coordinate with clients and internal teams for project-related communication and meetings.</li></ul><ol><li><a id="_Hlk230257883"></a><strong>Project Coordination &amp; Implementation</strong></li></ol><ul><li>Lead and coordinate research projects, managing field teams and support teams.</li><li>Develop resource plans detailing human, financial, and time requirements.</li><li>Oversee recruitment, training, and monitoring of field teams.</li><li>Conduct field visits and ensure data quality in pre-data collection, sampling strategy, and data collection stages.</li><li>Conduct training of the data collectors</li></ul><ol><li><strong>Data Analysis &amp; Reporting</strong></li></ol><ul><li>Collate and analyze data using SPSS, STATA, Excel or similar tools.</li><li>Develop data analysis plans, prepare high quality reports, and present findings to clients.</li><li>Any other tasks may be assigned by the Director.</li></ul><ol><li><strong>Education &amp; Skills Required:</strong></li><li>Postgraduate Degree in Economics, Development Studies/Practice, Social Sciences or related fields.</li><li>Strong knowledge of M &amp; E frameworks, data collection, and analytics.</li><li>Ability to lead, multitask, and meet tight deadlines in a startup environment.</li><li>Strong written and verbal skills, with experience in client liaison.</li><li>Hands-on experience with data analysis tools like SPSS, STATA, Power Bi, and Excel.</li><li>Willing to travel for field activities and monitoring.</li></ol><p>  <strong><em>Be a part of our growing team and make a meaningful impact!</em></strong></p>$jd$,
  'JD/JD_Research Trainee.docx',
  5
)
on conflict (slug) do update set
  title = excluded.title,
  category = excluded.category,
  programme_id = excluded.programme_id,
  summary = excluded.summary,
  content_html = excluded.content_html,
  docx_path = excluded.docx_path,
  sort_order = excluded.sort_order;

insert into public.jobs (id, title, slug, category, programme_id, summary, content_html, docx_path, sort_order)
values (
  '90000000-0000-0000-0000-000000000007',
  'Research Assistant',
  'research-assistant',
  'Research',
  '10000000-0000-0000-0000-000000000003',
  $sum$10-15 days field evaluation assignment: household surveys, enumerator coordination, and primary data collection across designated state districts.$sum$,
  $jd$<p><strong>Requirements: </strong></p><p><strong>Research Assistant at Ikaai India: </strong></p><p>Ikaai India Research is looking for Research Assistants for 10-15 days field assignment. The selected candidates will support data collection and reporting as part of an ongoing evaluation study related to the fisheries and seafood sector. </p><p><strong>Location: </strong>Andhra Pradesh, Karnataka, Maharashtra, Gujarat<strong> </strong><em>(Preference will be given to candidates from coastal districts) </em></p><p><strong> </strong></p><p><strong>Period of engagement: 10-15 days starting from 18.08.2025</strong></p><p><strong>IMPORTANT: </strong></p><ul><li>This is an urgent requirement — selected candidates must be ready to commence fieldwork in August month. </li><li>Only those who are available full-time for the entire assignment should apply. </li></ul><p> </p><img src="data:image/jpeg;base64,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" /><p> </p><p> </p><p><strong>How to apply:</strong> Send your resume to:  </p><p><strong>Email:</strong> hr@ikaaiindia.in </p><p><strong>Subject:</strong> Application – Research Assistant </p><p><strong>Deadline:</strong> 16.08.2025 (Early applications will be given preferences) </p><p> Stipend: A stipend will be given for this assignment  </p><p><strong>Roles &amp; Responsibilities: </strong></p><ul><li>Conduct field visits across designated locations </li><li>Conduct KII with the MPEDA officials</li><li>Engage with the following stakeholder segments: <ul><li>Processing Plants </li><li>Exporters </li><li>Storage Premises </li><li>Fishing Vessels </li><li>Dried/Salted Fish Handling Centres </li><li>Live Fish Handling Centres </li><li>Peeling Sheds </li><li>Conveyance Operators </li><li>Fresh/Chilled Fish Handling Centres</li><li>Independent/Common Ice Plants </li><li>Aqua farmers </li></ul></li><li>Prepare concise and accurate field reports, transcriptions etc.</li></ul><p> </p><p><strong>Qualifications: </strong></p><ul><li>Bachelor’s or master’s degree in fisheries, aquaculture, seafood processing, marine biology, oceanography, social sciences or related field </li><li>Prior field research experience will be an added advantage </li><li>Strong interpersonal and communication skills</li><li>Ability to travel extensively within assigned districts </li><li>Freshers can also apply. </li></ul><p> </p><p> </p>$jd$,
  'JD/JD_Research Assistant.docx',
  6
)
on conflict (slug) do update set
  title = excluded.title,
  category = excluded.category,
  programme_id = excluded.programme_id,
  summary = excluded.summary,
  content_html = excluded.content_html,
  docx_path = excluded.docx_path,
  sort_order = excluded.sort_order;

insert into public.jobs (id, title, slug, category, programme_id, summary, content_html, docx_path, sort_order)
values (
  '90000000-0000-0000-0000-000000000008',
  'Research Associate',
  'research-associate',
  'Research',
  '10000000-0000-0000-0000-000000000003',
  $sum$Mixed-methods research design, quantitative/qualitative data analysis, field team supervision, client presentations, and evaluation report authorship.$sum$,
  $jd$<p><strong>IKAAI INDIA RESEARCH PVT. LTD.</strong></p><p><strong>Job Description</strong></p><p><strong>Hiring 2026</strong></p><p>About us: At Ikaai India Research, we're dedicated to empowering organizations, governments, and stakeholders with precise and actionable insights. Through meticulous data collection, sophisticated analytics, and insightful research, we equip decision-makers with the knowledge they need to drive meaningful change and sustainable progress. For more information, please visit our website – <a href="http://www.ikaaiindia.in">www.ikaaiindia.in</a></p><p><strong>Job Opportunity: Research Associate at Ikaai India</strong></p><p><strong>Location:</strong> Sector 18 Rohini, Delhi (with Pan India field visits as and when required)<br /><br /><strong>Apply at:</strong> <a href="mailto:hr@ikaaiindia.in">hr@ikaaiindia.in</a> {<em>Subject line: Application for Research Associate_ [Enter your name]</em>}<br /><strong>Reporting: </strong>Director-Research/Sr. Research Associate<br /><strong>Experience Required:</strong> 1 to 3 years in the relevant field</p><p><strong>Key Roles &amp; Responsibilities*<sup><a href="#footnote-1" id="footnote-ref-1">[1]</a></sup>:</strong></p><ol><li><strong>Proposal &amp; Client Engagement</strong></li></ol><ul><li>Identify and explore RFPs relevant to M &amp; E on platforms like GeM, DevNetJobs, NGObox, eProcurement, CPPP and state e-Procurement portals.</li><li>Develop technical proposals and liaise with clients.</li><li>Deliver proposal presentations to clients</li><li>Design questionnaires, inception reports, and data collection tools (CSPro, SurveyCTO, Kobo Toolbox etc.).</li><li>Liaisoning with clients, meetings with them, making cold calls, attending pre-bid meetings, presentations etc.</li></ul><ol><li><strong>Project Coordination &amp; Implementation</strong></li></ol><ul><li>Lead and coordinate research projects, managing field teams and support teams.</li><li>Develop resource plans detailing human, financial, and time requirements.</li><li>Oversee recruitment, training, and monitoring of field teams.</li><li>Conduct field visits and ensure data quality in pre-data collection, sampling strategy, and data collection stages.</li><li>Conduct training of the data collectors</li></ul><ol><li><strong>Data Analysis &amp; Reporting</strong></li></ol><ul><li>Collate and analyze data using SPSS, STATA, Excel or similar tools.</li><li>Develop data analysis plans, prepare high quality reports, and present findings to clients.</li></ul><p>Any other tasks may be assigned by the Director.</p><ol><li><strong>Education &amp; Skills Required:</strong></li><li>Postgraduate Degree in Economics, Rural Management, Social Sciences or related fields.</li><li>Strong knowledge of M &amp; E frameworks, data collection, and analytics.</li><li>Ability to lead, multitask, and meet tight deadlines in a startup environment.</li><li>Strong written and verbal skills, with experience in client liaison.</li><li>Hands-on experience with data analysis tools like SPSS, STATA, Power Bi, and Excel.</li><li>Extensive travel may be required for field activities and monitoring.</li></ol><p><strong><em>Be a part of our growing team and make a meaningful impact!</em></strong></p><table><tr><td><p><strong>NOTE: Applicant should be comfortable working in a dynamic startup environment with small team. </strong></p></td></tr></table><ol><li id="footnote-1"><p> Note: These are indicative job roles and may include other routine tasks as assigned by the Director. <a href="#footnote-ref-1">↑</a></p></li></ol>$jd$,
  'JD/JD_Research Associate.docx',
  7
)
on conflict (slug) do update set
  title = excluded.title,
  category = excluded.category,
  programme_id = excluded.programme_id,
  summary = excluded.summary,
  content_html = excluded.content_html,
  docx_path = excluded.docx_path,
  sort_order = excluded.sort_order;

insert into public.jobs (id, title, slug, category, programme_id, summary, content_html, docx_path, sort_order)
values (
  '90000000-0000-0000-0000-000000000009',
  'Research Executive',
  'research-executive',
  'Research',
  '10000000-0000-0000-0000-000000000003',
  $sum$Project leadership (1-3 yrs experience), field evaluation oversight, donor deliverable management, and technical evaluation report writing.$sum$,
  $jd$<p><strong>IKAAI INDIA RESEARCH PVT. LTD.</strong></p><p><strong>Job Description</strong></p><p><strong>Hiring 2026</strong></p><p>About us: At Ikaai India Research, we're dedicated to empowering organizations, governments, and stakeholders with precise and actionable insights. Through meticulous data collection, sophisticated analytics, and insightful research, we equip decision-makers with the knowledge they need to drive meaningful change and sustainable progress. For more information, please visit our website – <a href="http://www.ikaaiindia.in">www.ikaaiindia.in</a></p><p><strong>Job Opportunity: Research Associate at Ikaai India</strong></p><p><strong>Location:</strong> Sector 18 Rohini, Delhi (with Pan India field visits as and when required)<br /><br /><strong>Apply at:</strong> <a href="mailto:hr@ikaaiindia.in">hr@ikaaiindia.in</a> {<em>Subject line: Application for Research Associate_ [Enter your name]</em>}<br /><strong>Reporting: </strong>Director-Research</p><p><strong>Salary:</strong> 2.5 – 4 LPA<br /><strong>Experience Required:</strong> 1 to 3 years in the relevant field <strong><em>(Potential freshers may also be considered)</em></strong></p><p><strong>Probation period: </strong>6 months</p><ol><li><strong>Key Roles &amp; Responsibilities*<sup><a href="#footnote-1" id="footnote-ref-1">[1]</a></sup>:</strong></li><li><strong>Proposal &amp; Client Engagement</strong></li></ol><ul><li>Identify and explore RFPs relevant to M &amp; E on platforms like GeM, DevNetJobs, NGObox, eProcurement, CPPP and state e-Procurement portals.</li><li>Develop technical proposals and liaise with clients.</li><li>Deliver proposal presentations to clients</li><li>Design questionnaires, inception reports, and data collection tools (CSPro, SurveyCTO, Kobo Toolbox etc.).</li><li>Liaisoning with clients, meetings with them, making cold calls, attending pre-bid meetings, presentations etc.</li></ul><ol><li><strong>Project Coordination &amp; Implementation</strong></li></ol><ul><li>Lead and coordinate research projects, managing field teams and support teams.</li><li>Develop resource plans detailing human, financial, and time requirements.</li><li>Oversee recruitment, training, and monitoring of field teams.</li><li>Conduct field visits and ensure data quality in pre-data collection, sampling strategy, and data collection stages.</li><li>Conduct training of the data collectors</li></ul><ol><li><strong>Data Analysis &amp; Reporting</strong></li></ol><ul><li>Collate and analyze data using SPSS, STATA, Excel or similar tools.</li><li>Develop data analysis plans, prepare high quality reports, and present findings to clients.</li></ul><p>Any other tasks may be assigned by the Director.</p><ol><li><strong>Education &amp; Skills Required:</strong></li><li>Postgraduate Degree in Economics, Rural Management, Social Sciences or related fields.</li><li>Strong knowledge of M &amp; E frameworks, data collection, and analytics.</li><li>Ability to lead, multitask, and meet tight deadlines in a startup environment.</li><li>Strong written and verbal skills, with experience in client liaison.</li><li>Hands-on experience with data analysis tools like SPSS, STATA, Power Bi, and Excel.</li><li>Extensive travel may be required for field activities and monitoring.</li></ol><p><strong><em>Be a part of our growing team and make a meaningful impact!</em></strong></p><table><tr><td><p><strong>NOTE: Applicant should be comfortable working in a dynamic startup environment with small team. </strong></p><p><em>At Ikaai, we maintain strict office decorum, punctuality, and professional attire. We believe in active participation from all team members and a proactive approach to work, with clients always coming first.</em></p></td></tr></table><ol><li id="footnote-1"><p> Note: These are indicative job roles and may include other routine tasks as assigned by the Director. <a href="#footnote-ref-1">↑</a></p></li></ol>$jd$,
  'JD/JD_Research Executive.docx',
  8
)
on conflict (slug) do update set
  title = excluded.title,
  category = excluded.category,
  programme_id = excluded.programme_id,
  summary = excluded.summary,
  content_html = excluded.content_html,
  docx_path = excluded.docx_path,
  sort_order = excluded.sort_order;

insert into public.jobs (id, title, slug, category, programme_id, summary, content_html, docx_path, sort_order)
values (
  '90000000-0000-0000-0000-000000000010',
  'Sr. Research Associate',
  'sr-research-associate',
  'Research',
  '10000000-0000-0000-0000-000000000003',
  $sum$Senior research leadership (3+ yrs experience): multi-state study design, advanced statistical frameworks, client liaison, and team mentorship.$sum$,
  $jd$<p><strong>IKAAI INDIA </strong></p><p><strong>Job Description</strong></p><p><strong>Hiring 2026</strong></p><p>Position: Sr. Research Associate</p><p><strong>About us:</strong> Ikaai India is a Delhi-based monitoring, evaluation, and research consultancy working with government departments, multilateral agencies, CSR foundations, and development organizations. We specialize in large-scale surveys, impact assessments, third-party evaluations, and policy research across India. For more information, please visit our website – <a href="http://www.ikaaiindia.in">www.ikaaiindia.in</a></p><p><strong>Location:</strong> Sector 18 Rohini, Delhi (with Pan India field visits as and when required)<br /><strong>Apply at:</strong> <a href="mailto:hr@ikaaiindia.in">hr@ikaaiindia.in</a> {<em>Subject line: Application for Sr. Research Associate_ [Enter your name]</em>}<br /><strong>Reporting: </strong>Director</p><p><strong>Experience Required:</strong> Minimum <strong>3 years</strong> in Monitoring &amp; Evaluation / Social Sector Research</p><p><strong>Probation period: </strong>6 months</p><ol><li><strong>Key Roles &amp; Responsibilities*<sup><a href="#footnote-1" id="footnote-ref-1">[1]</a></sup>:</strong></li></ol><table><tr><td><p><strong>Proposal Development &amp; Client Engagement</strong></p></td><td><ul><li>Identify and track relevant M&amp;E and research RFPs on platforms such as GeM, CPPP, e-Procurement portals, DevNetJobs, NGObox, and state portals.</li><li>Lead the technical proposal writing, including methodology, indicators, sampling design, timelines, and M&amp;E frameworks.</li><li>Prepare high-quality PowerPoint presentations for proposals, inception meetings, and client briefings.</li><li>Liaise with clients through meetings, calls, emails, and presentations; attend pre-bid meetings and client discussions.</li><li>Support negotiations, clarifications, and documentation during proposal and project initiation stages.</li></ul></td></tr><tr><td><p><strong>Project Coordination &amp; Implementation</strong></p></td><td><ul><li>Manage end-to-end M&amp;E and research projects, ensuring adherence to scope, timelines, and quality standards.</li><li>Develop inception reports, logframes, theory of change, result frameworks, and indicator matrices.</li><li>Plan and oversee field operations, including recruitment, training, deployment, and monitoring of enumerators and supervisors.</li><li>Conduct field visits for process monitoring, data verification, and quality audits.</li><li>Ensure ethical standards, data confidentiality, and compliance with project protocols.</li></ul></td></tr><tr><td><p><strong>Data Management, Analysis &amp; Reporting</strong></p></td><td><ul><li>Design and review questionnaires and data collection tools using platforms such as Kobo Toolbox, SurveyCTO, CSPro, ODK, etc.</li><li>Prepare data analysis plans and oversee data cleaning, validation, and analysis.</li><li>Analyze quantitative and qualitative data using SPSS, STATA, Excel, Power BI, or similar tools.</li><li>Draft high-quality analytical reports, executive summaries, dashboards, and policy briefs.</li><li>Develop client-ready presentations (PPTs) highlighting key findings, insights, and actionable recommendations.</li><li>Present findings to government officials, donors, and senior stakeholders.</li></ul></td></tr><tr><td><p><strong>Coordination &amp; Internal Support</strong></p></td><td><ul><li>Work closely with internal research, field, and design teams.</li><li>Mentor junior researchers and field staff where required.</li><li>Any other responsibilities assigned by the Director – Research in line with project needs.</li></ul></td></tr></table><ol><li><strong>Education &amp; Skills Required:</strong></li></ol><table><tr><td><ol><li>Postgraduate degree in <strong>Economics, Statistics, Social Sciences, Rural Management, Development Studies, Public Policy, or related fields</strong>.</li><li>Strong knowledge of M &amp; E frameworks, data collection, analytics, report writing, PPT preparation, and client communication.</li><li>Hands-on experience with data analysis tools (SPSS, STATA, Excel, Power BI).</li><li>Ability to lead, multitask, and meet tight deadlines in a startup environment.</li><li>Strong written and verbal skills, with experience in client liaison.</li><li>Willingness to travel extensively for field monitoring and evaluations.</li></ol></td></tr></table><ol><li><strong>Work Environment &amp; Expectations</strong></li></ol><table><tr><td><ul><li>The applicant must be comfortable working in a dynamic startup environment with a small, high-responsibility team.</li><li>At Ikaai, we maintain strict office decorum, punctuality, and professional attire.</li><li>We value ownership, proactive problem-solving, and client-first orientation.</li></ul></td></tr></table><p>*****</p><ol><li id="footnote-1"><p> Note: These are indicative job roles and may include other routine tasks as assigned by the Director. <a href="#footnote-ref-1">↑</a></p></li></ol>$jd$,
  'JD/JD_Sr. Research Associate.docx',
  9
)
on conflict (slug) do update set
  title = excluded.title,
  category = excluded.category,
  programme_id = excluded.programme_id,
  summary = excluded.summary,
  content_html = excluded.content_html,
  docx_path = excluded.docx_path,
  sort_order = excluded.sort_order;

insert into public.jobs (id, title, slug, category, programme_id, summary, content_html, docx_path, sort_order)
values (
  '90000000-0000-0000-0000-000000000011',
  'Social Media cum Graphic Design Intern',
  'social-media-design-intern',
  'Social Media & Design',
  '10000000-0000-0000-0000-000000000004',
  $sum$Visual identity design, multi-page publication layouts, high-impact LinkedIn carousels, data infographics, and social media outreach.$sum$,
  $jd$<p><strong>IKAAI INDIA </strong></p><p><strong>Internships 2026</strong></p><p><strong>Position: Social media cum graphic design Intern</strong></p><p><strong>Job Description</strong></p><p><strong>About us:</strong> Ikaai India is a Delhi-based monitoring, evaluation, and research consultancy working with government departments, multilateral agencies, CSR foundations, and development organizations. We specialize in large-scale surveys, impact assessments, third-party evaluations, and policy research across India. For more information, please visit our website – <a href="http://www.ikaaiindia.in">www.ikaaiindia.in</a></p><p><strong>Type of Internship- </strong>On site</p><p><strong>Location:</strong> Sector 18 Rohini, Delhi <br /><strong>Apply at:</strong> <a href="mailto:hr@ikaaiindia.in">hr@ikaaiindia.in</a> {<em>Subject line: Social Media cum graphic design Intern_ [Enter your name]</em>}</p><p><strong>Internship period: </strong>2 - 3 months (Starting from June)</p><ol><li><strong>Role Overview</strong></li></ol><p>We are looking for a creative and driven Social Media/Graphic Design Intern to support our communication and outreach efforts. The intern will assist in managing digital platforms, creating engaging content, and enhancing the organization’s online presence.</p><ol><li><strong>Key Responsibilities</strong></li></ol><ul><li>Assist in drafting reports, brochures etc. on In-design or any other relevant application.</li><li>Assist in managing social media platforms (LinkedIn, Instagram, etc.)</li><li>Create engaging posts, graphics, and basic visual content</li><li>Support in developing content calendars and campaign ideas</li><li>Monitor engagement metrics and prepare performance reports</li><li>Assist in drafting captions, blogs, and communication material</li><li>Coordinate with internal teams for content development (Wherever required)</li></ul><ol><li><strong>Eligibility Criteria</strong></li></ol><ul><li>Bachelor’s/Master’s degree (completed or pursuing) in Communications, Marketing, Journalism, or related fields</li><li>Strong interest in digital communication and social media</li></ul><ol><li><strong>Required Skills</strong></li></ol><ul><li>Basic knowledge of social media platforms and trends</li><li>Familiarity with Canva, In-design or similar design tools</li><li>Good writing and communication skills</li><li>Creativity and attention to detail</li></ul><ol><li><strong>What You Will Gain</strong></li></ol><ul><li>Hands-on experience in social media management</li><li>Exposure to communication strategies in the development sector</li><li>Portfolio-building opportunities</li><li>Mentorship from experienced professionals</li></ul><p>#<em>The management of Ikaai India Research Pvt. Ltd. reserves the right to terminate the internship at any time, without prior notice, in case of unsatisfactory performance, lack of professionalism, or non-adherence to assigned roles and responsibilities. </em></p>$jd$,
  'JD/Social Media cum Graphic Design Intern JD.docx',
  10
)
on conflict (slug) do update set
  title = excluded.title,
  category = excluded.category,
  programme_id = excluded.programme_id,
  summary = excluded.summary,
  content_html = excluded.content_html,
  docx_path = excluded.docx_path,
  sort_order = excluded.sort_order;
