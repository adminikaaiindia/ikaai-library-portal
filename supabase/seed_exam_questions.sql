-- ====================================================================
-- IKAAI ACADEMY / LIBRARY - ROLE-BASED EXAM QUESTIONS SEED
-- 11 ROLES x 10 QUESTIONS (6 MCQ @ 5 marks + 4 Written @ 15, 15, 20, 20 = 100 marks)
-- Safe to re-run: deterministic UUIDs, ON CONFLICT DO UPDATE
-- ====================================================================

begin;

-- --------------------------------------------------------------------
-- ROLE 1: HR Intern (Job: 90000000-0000-0000-0000-000000000002)
-- --------------------------------------------------------------------
-- Question 1 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-010000000001',
  '90000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000001',
  'What is the best first step before shortlisting candidates for a role?',
  'What is the best first step before shortlisting candidates for a role?',
  5,
  1,
  'mcq',
  'Define must-have and nice-to-have criteria from the job description',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-010100000001', '81000000-0000-0000-0000-010000000001', 'A', 'Call all applicants to check their interest', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-010100000002', '81000000-0000-0000-0000-010000000001', 'B', 'Ask the manager to pick names', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-010100000003', '81000000-0000-0000-0000-010000000001', 'C', 'Define must-have and nice-to-have criteria from the job description', true, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-010100000004', '81000000-0000-0000-0000-010000000001', 'D', 'Repost the vacancy', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 2 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-010000000002',
  '90000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000001',
  'In a structured interview, interviewers should',
  'In a structured interview, interviewers should',
  5,
  2,
  'mcq',
  'Ask the same job-related questions and score answers with a common rubric',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-010200000001', '81000000-0000-0000-0000-010000000002', 'A', 'Ask the same job-related questions and score answers with a common rubric', true, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-010200000002', '81000000-0000-0000-0000-010000000002', 'B', 'Ask different questions to each candidate', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-010200000003', '81000000-0000-0000-0000-010000000002', 'C', 'Rely on gut feeling', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-010200000004', '81000000-0000-0000-0000-010000000002', 'D', 'Focus on personal background', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 3 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-010000000003',
  '90000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000001',
  'A candidate''s CV and phone number are personal data. Which practice is the safest?',
  'A candidate''s CV and phone number are personal data. Which practice is the safest?',
  5,
  3,
  'mcq',
  'Collect only what is needed, store it securely and restrict access',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-010300000001', '81000000-0000-0000-0000-010000000003', 'A', 'Share them in a WhatsApp group', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-010300000002', '81000000-0000-0000-0000-010000000003', 'B', 'Keep them forever', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-010300000003', '81000000-0000-0000-0000-010000000003', 'C', 'Email them to everyone', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-010300000004', '81000000-0000-0000-0000-010000000003', 'D', 'Collect only what is needed, store it securely and restrict access', true, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 4 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-010000000004',
  '90000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000001',
  'Which best shows that an internship onboarding is working?',
  'Which best shows that an internship onboarding is working?',
  5,
  4,
  'mcq',
  'Completion of onboarding tasks plus early feedback from interns and mentors',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-010400000001', '81000000-0000-0000-0000-010000000004', 'A', 'Number of emails sent', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-010400000002', '81000000-0000-0000-0000-010000000004', 'B', 'Office attendance alone', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-010400000003', '81000000-0000-0000-0000-010000000004', 'C', 'Completion of onboarding tasks plus early feedback from interns and mentors', true, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-010400000004', '81000000-0000-0000-0000-010000000004', 'D', 'Number of applicants', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 5 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-010000000005',
  '90000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000001',
  'An offer letter with the wrong stipend has already been sent. What should you do first?',
  'An offer letter with the wrong stipend has already been sent. What should you do first?',
  5,
  5,
  'mcq',
  'Inform the HR lead, contact the candidate and issue a corrected letter after approval',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-010500000001', '81000000-0000-0000-0000-010000000005', 'A', 'Ignore it until the candidate complains', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-010500000002', '81000000-0000-0000-0000-010000000005', 'B', 'Inform the HR lead, contact the candidate and issue a corrected letter after approval', true, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-010500000003', '81000000-0000-0000-0000-010000000005', 'C', 'Edit the file silently', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-010500000004', '81000000-0000-0000-0000-010000000005', 'D', 'Cancel the offer', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 6 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-010000000006',
  '90000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000001',
  'Which metric measures how long it takes to fill a vacancy?',
  'Which metric measures how long it takes to fill a vacancy?',
  5,
  6,
  'mcq',
  'Time-to-fill',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-010600000001', '81000000-0000-0000-0000-010000000006', 'A', 'Net promoter score', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-010600000002', '81000000-0000-0000-0000-010000000006', 'B', 'Attrition rate', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-010600000003', '81000000-0000-0000-0000-010000000006', 'C', 'Cost per click', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-010600000004', '81000000-0000-0000-0000-010000000006', 'D', 'Time-to-fill', true, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 7 (WRITTEN, 15 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-010000000007',
  '90000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000001',
  'Explain how you would run a recruitment cycle for five intern positions across two programmes, from vacancy posting to joining. Include sourcing, screening, interviews and communication with candidates.',
  'Explain how you would run a recruitment cycle for five intern positions across two programmes, from vacancy posting to joining. Include sourcing, screening, interviews and communication with candidates.',
  15,
  7,
  'written',
  'Guide: role definition, vacancy, sourcing, screening against criteria, structured interviews with a rubric, selection, offer, onboarding; realistic timeline; fairness; record keeping.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 8 (WRITTEN, 15 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-010000000008',
  '90000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000001',
  'A selected candidate withdraws one day before joining. Describe the steps you would take now and how you would reduce such drop-offs in future.',
  'A selected candidate withdraws one day before joining. Describe the steps you would take now and how you would reduce such drop-offs in future.',
  15,
  8,
  'written',
  'Guide: acknowledge and ask the reason; inform mentor and HR lead; consider a backup candidate; update records; prevention through contact before joining, clear communication, welcome pack, buddy.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 9 (WRITTEN, 20 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-010000000009',
  '90000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000001',
  'Write a short email (5 to 7 lines) inviting a shortlisted candidate to an interview. Include the date, mode, documents to bring and a contact person (use placeholders where details are unknown).',
  'Write a short email (5 to 7 lines) inviting a shortlisted candidate to an interview. Include the date, mode, documents to bring and a contact person (use placeholders where details are unknown).',
  20,
  9,
  'written',
  'Guide: role named, date and time, mode or link, documents, contact person, confirmation request, professional and concise tone, placeholders used correctly.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 10 (WRITTEN, 20 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-010000000010',
  '90000000-0000-0000-0000-000000000002',
  '10000000-0000-0000-0000-000000000001',
  'An intern privately tells you that a team member made an inappropriate remark. How should HR respond? Cover confidentiality, documentation, escalation and fairness.',
  'An intern privately tells you that a team member made an inappropriate remark. How should HR respond? Cover confidentiality, documentation, escalation and fairness.',
  20,
  10,
  'written',
  'Guide: listen privately, record facts, keep it confidential, follow policy and escalate to the HR lead, protect from retaliation, fair process for both sides, follow-up with the intern.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- --------------------------------------------------------------------
-- ROLE 2: HR and Admin Associate (Job: 90000000-0000-0000-0000-000000000003)
-- --------------------------------------------------------------------
-- Question 1 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-020000000001',
  '90000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000001',
  'Statutory compliance in HR means',
  'Statutory compliance in HR means',
  5,
  1,
  'mcq',
  'Following the laws and rules that apply to employment, such as contracts, wages, leave and record keeping',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-020100000001', '81000000-0000-0000-0000-020000000001', 'A', 'Following the preferences of senior staff', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-020100000002', '81000000-0000-0000-0000-020000000001', 'B', 'Following the laws and rules that apply to employment, such as contracts, wages, leave and record keeping', true, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-020100000003', '81000000-0000-0000-0000-020000000001', 'C', 'Copying competitors'' policies', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-020100000004', '81000000-0000-0000-0000-020000000001', 'D', 'Following only what employees ask for', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 2 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-020000000002',
  '90000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000001',
  'Before an appointment letter is issued, HR should confirm',
  'Before an appointment letter is issued, HR should confirm',
  5,
  2,
  'mcq',
  'The approved role, terms and compensation and the candidate''s verified documents',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-020200000001', '81000000-0000-0000-0000-020000000002', 'A', 'Only the joining date', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-020200000002', '81000000-0000-0000-0000-020000000002', 'B', 'That the candidate has agreed verbally', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-020200000003', '81000000-0000-0000-0000-020000000002', 'C', 'The approved role, terms and compensation and the candidate''s verified documents', true, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-020200000004', '81000000-0000-0000-0000-020000000002', 'D', 'The candidate''s social media profiles', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 3 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-020000000003',
  '90000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000001',
  'Which is the best way to choose an office vendor?',
  'Which is the best way to choose an office vendor?',
  5,
  3,
  'mcq',
  'Compare several quotes against clear criteria and record the decision',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-020300000001', '81000000-0000-0000-0000-020000000003', 'A', 'Pick the first quote received', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-020300000002', '81000000-0000-0000-0000-020000000003', 'B', 'Choose a known contact', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-020300000003', '81000000-0000-0000-0000-020000000003', 'C', 'Pick the most expensive for quality', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-020300000004', '81000000-0000-0000-0000-020000000003', 'D', 'Compare several quotes against clear criteria and record the decision', true, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 4 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-020000000004',
  '90000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000001',
  'After a new HR policy is approved, the most effective rollout is to',
  'After a new HR policy is approved, the most effective rollout is to',
  5,
  4,
  'mcq',
  'Communicate it clearly, explain it, collect acknowledgement and review feedback',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-020400000001', '81000000-0000-0000-0000-020000000004', 'A', 'Communicate it clearly, explain it, collect acknowledgement and review feedback', true, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-020400000002', '81000000-0000-0000-0000-020000000004', 'B', 'Send one email and assume it is read', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-020400000003', '81000000-0000-0000-0000-020000000004', 'C', 'Keep it on the shared drive only', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-020400000004', '81000000-0000-0000-0000-020000000004', 'D', 'Apply it only to new joiners', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 5 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-020000000005',
  '90000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000001',
  'Employee personal files should be',
  'Employee personal files should be',
  5,
  5,
  'mcq',
  'Stored securely with access limited to authorised staff',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-020500000001', '81000000-0000-0000-0000-020000000005', 'A', 'Kept in an open shared folder', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-020500000002', '81000000-0000-0000-0000-020000000005', 'B', 'Stored securely with access limited to authorised staff', true, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-020500000003', '81000000-0000-0000-0000-020000000005', 'C', 'Shared through chat groups', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-020500000004', '81000000-0000-0000-0000-020000000005', 'D', 'Kept on personal phones', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 6 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-020000000006',
  '90000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000001',
  'A rising attrition rate most directly signals',
  'A rising attrition rate most directly signals',
  5,
  6,
  'mcq',
  'More people are leaving than the organisation can comfortably replace, which needs investigation',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-020600000001', '81000000-0000-0000-0000-020000000006', 'A', 'Faster recruitment', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-020600000002', '81000000-0000-0000-0000-020000000006', 'B', 'Lower office costs', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-020600000003', '81000000-0000-0000-0000-020000000006', 'C', 'More people are leaving than the organisation can comfortably replace, which needs investigation', true, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-020600000004', '81000000-0000-0000-0000-020000000006', 'D', 'Better onboarding', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 7 (WRITTEN, 15 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-020000000007',
  '90000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000001',
  'Describe how you would set up a monthly HR compliance calendar for a small organisation. Include what you would track, who owns each item, and how you would remind and record completion.',
  'Describe how you would set up a monthly HR compliance calendar for a small organisation. Include what you would track, who owns each item, and how you would remind and record completion.',
  15,
  7,
  'written',
  'Guide: contracts and renewals, leave and attendance records, payroll inputs and payment dates, statutory filings and deadlines as applicable, document renewals, owners, reminders, checklist and sign-off, audit trail.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 8 (WRITTEN, 15 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-020000000008',
  '90000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000001',
  'The office internet fails twice a week and the team is losing work hours. As the admin associate, explain how you would handle this with the vendor and the team.',
  'The office internet fails twice a week and the team is losing work hours. As the admin associate, explain how you would handle this with the vendor and the team.',
  15,
  8,
  'written',
  'Guide: log incidents with dates and impact; check the service agreement; escalate formally; interim workaround (hotspot, flexible schedule); compare alternatives; communicate with the team; track resolution.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 9 (WRITTEN, 20 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-020000000009',
  '90000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000001',
  'Draft a short notice (6 to 8 lines) to all staff announcing a revised leave-application process. Use placeholders for dates and contact details.',
  'Draft a short notice (6 to 8 lines) to all staff announcing a revised leave-application process. Use placeholders for dates and contact details.',
  20,
  9,
  'written',
  'Guide: what is changing and from when, how to apply, who approves, deadlines, contact person, professional tone, placeholders used correctly.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 10 (WRITTEN, 20 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-020000000010',
  '90000000-0000-0000-0000-000000000003',
  '10000000-0000-0000-0000-000000000001',
  'An employee''s stipend was calculated wrongly last month and they were underpaid. Explain how you would correct it and prevent a repeat.',
  'An employee''s stipend was calculated wrongly last month and they were underpaid. Explain how you would correct it and prevent a repeat.',
  20,
  10,
  'written',
  'Guide: acknowledge and apologise; verify the correct amount and the cause; get approval; correct payment with a clear note; communicate the timeline; add a check before payment; document.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- --------------------------------------------------------------------
-- ROLE 3: Data Analyst Intern (Job: 90000000-0000-0000-0000-000000000001)
-- --------------------------------------------------------------------
-- Question 1 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-030000000001',
  '90000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000002',
  'What should you do first before analysing a survey dataset?',
  'What should you do first before analysing a survey dataset?',
  5,
  1,
  'mcq',
  'Check for duplicates, missing values and inconsistent codes',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-030100000001', '81000000-0000-0000-0000-030000000001', 'A', 'Build charts', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-030100000002', '81000000-0000-0000-0000-030000000001', 'B', 'Run a regression', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-030100000003', '81000000-0000-0000-0000-030000000001', 'C', 'Check for duplicates, missing values and inconsistent codes', true, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-030100000004', '81000000-0000-0000-0000-030000000001', 'D', 'Share the file with the client', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 2 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-030000000002',
  '90000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000002',
  'Which item must be removed or pseudonymised before a dataset is shared with a partner?',
  'Which item must be removed or pseudonymised before a dataset is shared with a partner?',
  5,
  2,
  'mcq',
  'Respondents'' names and phone numbers',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-030200000001', '81000000-0000-0000-0000-030000000002', 'A', 'Aggregated district names', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-030200000002', '81000000-0000-0000-0000-030000000002', 'B', 'Survey dates', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-030200000003', '81000000-0000-0000-0000-030000000002', 'C', 'Question labels', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-030200000004', '81000000-0000-0000-0000-030000000002', 'D', 'Respondents'' names and phone numbers', true, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 3 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-030000000003',
  '90000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000002',
  'A variable has 40% missing values. What is the best first response?',
  'A variable has 40% missing values. What is the best first response?',
  5,
  3,
  'mcq',
  'Investigate why values are missing, document it, then choose a justified approach',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-030300000001', '81000000-0000-0000-0000-030000000003', 'A', 'Delete it silently', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-030300000002', '81000000-0000-0000-0000-030000000003', 'B', 'Investigate why values are missing, document it, then choose a justified approach', true, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-030300000003', '81000000-0000-0000-0000-030000000003', 'C', 'Fill the gaps with zero', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-030300000004', '81000000-0000-0000-0000-030000000003', 'D', 'Fill the gaps with random numbers', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 4 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-030000000004',
  '90000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000002',
  'In Power BI, what is a slicer used for?',
  'In Power BI, what is a slicer used for?',
  5,
  4,
  'mcq',
  'Letting users filter report visuals interactively',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-030400000001', '81000000-0000-0000-0000-030000000004', 'A', 'Deleting rows', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-030400000002', '81000000-0000-0000-0000-030000000004', 'B', 'Connecting to a database', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-030400000003', '81000000-0000-0000-0000-030000000004', 'C', 'Letting users filter report visuals interactively', true, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-030400000004', '81000000-0000-0000-0000-030000000004', 'D', 'Encrypting data', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 5 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-030000000005',
  '90000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000002',
  'A correlation of 0.8 between two variables means',
  'A correlation of 0.8 between two variables means',
  5,
  5,
  'mcq',
  'A strong positive association, which is not proof of causation',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-030500000001', '81000000-0000-0000-0000-030000000005', 'A', 'A strong positive association, which is not proof of causation', true, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-030500000002', '81000000-0000-0000-0000-030000000005', 'B', 'One variable causes the other', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-030500000003', '81000000-0000-0000-0000-030000000005', 'C', 'There is no relationship', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-030500000004', '81000000-0000-0000-0000-030000000005', 'D', '80% of cases match', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 6 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-030000000006',
  '90000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000002',
  'Which chart is best for showing how an indicator changed month by month over a year?',
  'Which chart is best for showing how an indicator changed month by month over a year?',
  5,
  6,
  'mcq',
  'A line chart',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-030600000001', '81000000-0000-0000-0000-030000000006', 'A', 'A pie chart', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-030600000002', '81000000-0000-0000-0000-030000000006', 'B', 'A line chart', true, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-030600000003', '81000000-0000-0000-0000-030000000006', 'C', 'A scatter plot of names', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-030600000004', '81000000-0000-0000-0000-030000000006', 'D', 'An unsorted table', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 7 (WRITTEN, 15 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-030000000007',
  '90000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000002',
  'Describe how you would clean a household survey export from KoboToolbox before analysis. List the checks you would run and how you would document your changes.',
  'Describe how you would clean a household survey export from KoboToolbox before analysis. List the checks you would run and how you would document your changes.',
  15,
  7,
  'written',
  'Guide: keep an untouched raw copy; check duplicates, missing values, outliers, inconsistent codes or labels, skip-logic errors, date checks; keep a change log; make the steps reproducible.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 8 (WRITTEN, 15 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-030000000008',
  '90000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000002',
  'A client asks for a dashboard showing programme reach by district. Explain how you would plan it: questions to ask, data needed, visuals and how you would validate it.',
  'A client asks for a dashboard showing programme reach by district. Explain how you would plan it: questions to ask, data needed, visuals and how you would validate it.',
  15,
  8,
  'written',
  'Guide: purpose and audience; indicator definitions; data sources and period; geography levels; suitable visuals (map, bars, trend); filters; validate against source totals; privacy and access; test with the user.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 9 (WRITTEN, 20 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-030000000009',
  '90000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000002',
  'You find a district whose average income is ten times higher than the others. How would you investigate, and what would you report?',
  'You find a district whose average income is ten times higher than the others. How would you investigate, and what would you report?',
  20,
  9,
  'written',
  'Guide: check for entry errors, units or currency; separate real outliers from errors; compare with enumerator and source data; check sample size; run a sensitivity check; report with caveats; never delete silently.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 10 (WRITTEN, 20 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-030000000010',
  '90000000-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000002',
  'Explain how you would protect respondents'' privacy when sharing your analysis with a partner organisation, referring to the principles of India''s DPDP Act in general terms.',
  'Explain how you would protect respondents'' privacy when sharing your analysis with a partner organisation, referring to the principles of India''s DPDP Act in general terms.',
  20,
  10,
  'written',
  'Guide: remove direct identifiers; aggregate or pseudonymise; minimum cell sizes; share only what is needed for the stated purpose; data-sharing agreement; secure transfer and access control; retention and deletion.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- --------------------------------------------------------------------
-- ROLE 4: Research Intern (Job: 90000000-0000-0000-0000-000000000005)
-- --------------------------------------------------------------------
-- Question 1 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-040000000001',
  '90000000-0000-0000-0000-000000000005',
  '10000000-0000-0000-0000-000000000003',
  'A literature review is mainly used to',
  'A literature review is mainly used to',
  5,
  1,
  'mcq',
  'Summarise existing knowledge on a topic and find gaps',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-040100000001', '81000000-0000-0000-0000-040000000001', 'A', 'Collect new survey data', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-040100000002', '81000000-0000-0000-0000-040000000001', 'B', 'Replace fieldwork', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-040100000003', '81000000-0000-0000-0000-040000000001', 'C', 'Write the final report', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-040100000004', '81000000-0000-0000-0000-040000000001', 'D', 'Summarise existing knowledge on a topic and find gaps', true, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 2 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-040000000002',
  '90000000-0000-0000-0000-000000000005',
  '10000000-0000-0000-0000-000000000003',
  'Which source is generally the most reliable for a research review?',
  'Which source is generally the most reliable for a research review?',
  5,
  2,
  'mcq',
  'A peer-reviewed article or an official agency report',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-040200000001', '81000000-0000-0000-0000-040000000002', 'A', 'A peer-reviewed article or an official agency report', true, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-040200000002', '81000000-0000-0000-0000-040000000002', 'B', 'An anonymous blog', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-040200000003', '81000000-0000-0000-0000-040000000002', 'C', 'A forwarded message', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-040200000004', '81000000-0000-0000-0000-040000000002', 'D', 'A social media post', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 3 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-040000000003',
  '90000000-0000-0000-0000-000000000005',
  '10000000-0000-0000-0000-000000000003',
  'When transcribing an interview you should',
  'When transcribing an interview you should',
  5,
  3,
  'mcq',
  'Record accurately what was said and protect identifying details as instructed',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-040300000001', '81000000-0000-0000-0000-040000000003', 'A', 'Summarise freely and drop details', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-040300000002', '81000000-0000-0000-0000-040000000003', 'B', 'Record accurately what was said and protect identifying details as instructed', true, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-040300000003', '81000000-0000-0000-0000-040000000003', 'C', 'Correct the speaker''s opinions', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-040300000004', '81000000-0000-0000-0000-040000000003', 'D', 'Share the file in a chat group', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 4 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-040000000004',
  '90000000-0000-0000-0000-000000000005',
  '10000000-0000-0000-0000-000000000003',
  'A dataset shows a respondent''s age as 250. You should',
  'A dataset shows a respondent''s age as 250. You should',
  5,
  4,
  'mcq',
  'Flag it as a likely entry error and check it against the source',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-040400000001', '81000000-0000-0000-0000-040000000004', 'A', 'Keep it as a valid value', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-040400000002', '81000000-0000-0000-0000-040000000004', 'B', 'Delete the whole survey', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-040400000003', '81000000-0000-0000-0000-040000000004', 'C', 'Flag it as a likely entry error and check it against the source', true, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-040400000004', '81000000-0000-0000-0000-040000000004', 'D', 'Replace it with the average silently', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 5 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-040000000005',
  '90000000-0000-0000-0000-000000000005',
  '10000000-0000-0000-0000-000000000003',
  'Citing sources in a report is important because it',
  'Citing sources in a report is important because it',
  5,
  5,
  'mcq',
  'Gives credit, lets readers verify and avoids plagiarism',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-040500000001', '81000000-0000-0000-0000-040000000005', 'A', 'Makes the report longer', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-040500000002', '81000000-0000-0000-0000-040000000005', 'B', 'Gives credit, lets readers verify and avoids plagiarism', true, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-040500000003', '81000000-0000-0000-0000-040000000005', 'C', 'Hides weak evidence', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-040500000004', '81000000-0000-0000-0000-040000000005', 'D', 'Is only needed for books', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 6 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-040000000006',
  '90000000-0000-0000-0000-000000000005',
  '10000000-0000-0000-0000-000000000003',
  'Research data about individuals should be',
  'Research data about individuals should be',
  5,
  6,
  'mcq',
  'Stored securely and used only for the stated purpose',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-040600000001', '81000000-0000-0000-0000-040000000006', 'A', 'Shared on public pages', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-040600000002', '81000000-0000-0000-0000-040000000006', 'B', 'Posted for feedback', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-040600000003', '81000000-0000-0000-0000-040000000006', 'C', 'Stored securely and used only for the stated purpose', true, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-040600000004', '81000000-0000-0000-0000-040000000006', 'D', 'Kept on any personal device', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 7 (WRITTEN, 15 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-040000000007',
  '90000000-0000-0000-0000-000000000005',
  '10000000-0000-0000-0000-000000000003',
  'Explain how you would search for and organise sources for a literature review on school dropout among adolescent girls.',
  'Explain how you would search for and organise sources for a literature review on school dropout among adolescent girls.',
  15,
  7,
  'written',
  'Guide: keywords and synonyms; databases and trusted sites; inclusion criteria; tracking sheet with source, year, method and finding; reading and note-taking; identifying gaps; citation management.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 8 (WRITTEN, 15 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-040000000008',
  '90000000-0000-0000-0000-000000000005',
  '10000000-0000-0000-0000-000000000003',
  'You must transcribe 20 interview recordings by Friday. Describe how you would plan the work and keep quality and confidentiality.',
  'You must transcribe 20 interview recordings by Friday. Describe how you would plan the work and keep quality and confidentiality.',
  15,
  8,
  'written',
  'Guide: split into daily targets; transcription format; spot-check quality; secure storage; anonymise names; ask when audio is unclear; record issues for the supervisor.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 9 (WRITTEN, 20 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-040000000009',
  '90000000-0000-0000-0000-000000000005',
  '10000000-0000-0000-0000-000000000003',
  'In about 100 words, summarise in plain language this finding for a non-technical reader: "Only 32% of eligible households had applied for the scheme; the most common reason given was not knowing how to apply."',
  'In about 100 words, summarise in plain language this finding for a non-technical reader: "Only 32% of eligible households had applied for the scheme; the most common reason given was not knowing how to apply."',
  20,
  9,
  'written',
  'Guide: accurate figure, plain wording, the reason, no overstatement, within about 100 words, one clear takeaway.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 10 (WRITTEN, 20 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-040000000010',
  '90000000-0000-0000-0000-000000000005',
  '10000000-0000-0000-0000-000000000003',
  'While validating a household dataset you find 15 repeated household IDs. Explain how you would investigate and what you would report to your supervisor.',
  'While validating a household dataset you find 15 repeated household IDs. Explain how you would investigate and what you would report to your supervisor.',
  20,
  10,
  'written',
  'Guide: keep a raw copy; check whether they are true duplicates or ID entry errors; compare other fields and timestamps; identify the source (enumerator, device); document the decision; do not delete silently; report counts and action.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- --------------------------------------------------------------------
-- ROLE 5: Research Trainee (Job: 90000000-0000-0000-0000-000000000006)
-- --------------------------------------------------------------------
-- Question 1 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-050000000001',
  '90000000-0000-0000-0000-000000000006',
  '10000000-0000-0000-0000-000000000003',
  'Pilot testing a survey tool before fieldwork helps to',
  'Pilot testing a survey tool before fieldwork helps to',
  5,
  1,
  'mcq',
  'Find unclear questions, wrong skip logic and timing problems',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-050100000001', '81000000-0000-0000-0000-050000000001', 'A', 'Save time by skipping training', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-050100000002', '81000000-0000-0000-0000-050000000001', 'B', 'Find unclear questions, wrong skip logic and timing problems', true, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-050100000003', '81000000-0000-0000-0000-050000000001', 'C', 'Increase the sample size', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-050100000004', '81000000-0000-0000-0000-050000000001', 'D', 'Avoid ethics approval', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 2 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-050000000002',
  '90000000-0000-0000-0000-000000000006',
  '10000000-0000-0000-0000-000000000003',
  'Quantitative research mainly',
  'Quantitative research mainly',
  5,
  2,
  'mcq',
  'Measures how many or how much using numbers',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-050200000001', '81000000-0000-0000-0000-050000000002', 'A', 'Measures how many or how much using numbers', true, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-050200000002', '81000000-0000-0000-0000-050000000002', 'B', 'Explores feelings through stories only', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-050200000003', '81000000-0000-0000-0000-050000000002', 'C', 'Needs no sample', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-050200000004', '81000000-0000-0000-0000-050000000002', 'D', 'Avoids statistics', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 3 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-050000000003',
  '90000000-0000-0000-0000-000000000006',
  '10000000-0000-0000-0000-000000000003',
  'Qualitative research is best suited to',
  'Qualitative research is best suited to',
  5,
  3,
  'mcq',
  'Understanding people''s experiences and reasons in depth',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-050300000001', '81000000-0000-0000-0000-050000000003', 'A', 'Counting households', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-050300000002', '81000000-0000-0000-0000-050000000003', 'B', 'Calculating averages', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-050300000003', '81000000-0000-0000-0000-050000000003', 'C', 'Understanding people''s experiences and reasons in depth', true, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-050300000004', '81000000-0000-0000-0000-050000000003', 'D', 'Measuring prices', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 4 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-050000000004',
  '90000000-0000-0000-0000-000000000006',
  '10000000-0000-0000-0000-000000000003',
  'Before starting an interview, the interviewer must',
  'Before starting an interview, the interviewer must',
  5,
  4,
  'mcq',
  'Explain the purpose and get the respondent''s voluntary consent',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-050400000001', '81000000-0000-0000-0000-050000000004', 'A', 'Pay the respondent', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-050400000002', '81000000-0000-0000-0000-050000000004', 'B', 'Explain the purpose and get the respondent''s voluntary consent', true, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-050400000003', '81000000-0000-0000-0000-050000000004', 'C', 'Record without telling', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-050400000004', '81000000-0000-0000-0000-050000000004', 'D', 'Finish quickly', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 5 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-050000000005',
  '90000000-0000-0000-0000-000000000006',
  '10000000-0000-0000-0000-000000000003',
  'A skip-logic error in a digital form means',
  'A skip-logic error in a digital form means',
  5,
  5,
  'mcq',
  'A question appears or hides at the wrong time based on earlier answers',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-050500000001', '81000000-0000-0000-0000-050000000005', 'A', 'A question appears or hides at the wrong time based on earlier answers', true, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-050500000002', '81000000-0000-0000-0000-050000000005', 'B', 'The phone is broken', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-050500000003', '81000000-0000-0000-0000-050000000005', 'C', 'The respondent is dishonest', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-050500000004', '81000000-0000-0000-0000-050000000005', 'D', 'The data is encrypted', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 6 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-050000000006',
  '90000000-0000-0000-0000-000000000006',
  '10000000-0000-0000-0000-000000000003',
  'If you notice you made a mistake while entering a response, you should',
  'If you notice you made a mistake while entering a response, you should',
  5,
  6,
  'mcq',
  'Correct it as the process allows and tell your supervisor',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-050600000001', '81000000-0000-0000-0000-050000000006', 'A', 'Hide it', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-050600000002', '81000000-0000-0000-0000-050000000006', 'B', 'Delete the whole form without telling', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-050600000003', '81000000-0000-0000-0000-050000000006', 'C', 'Ask the respondent to repeat everything', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-050600000004', '81000000-0000-0000-0000-050000000006', 'D', 'Correct it as the process allows and tell your supervisor', true, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 7 (WRITTEN, 15 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-050000000007',
  '90000000-0000-0000-0000-000000000006',
  '10000000-0000-0000-0000-000000000003',
  'Prepare a day-wise plan for collecting data in three villages in three days with a team of four. Include tasks, travel and the checks at the end of each day.',
  'Prepare a day-wise plan for collecting data in three villages in three days with a team of four. Include tasks, travel and the checks at the end of each day.',
  15,
  7,
  'written',
  'Guide: day plan; roles; schedule that respects respondents'' time; consent; end-of-day data upload and review; supervisor check-in; contingency for absent respondents.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 8 (WRITTEN, 15 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-050000000008',
  '90000000-0000-0000-0000-000000000006',
  '10000000-0000-0000-0000-000000000003',
  'You tested a questionnaire on a mobile phone and found problems. List what you would record in a testing report and how you would present it.',
  'You tested a questionnaire on a mobile phone and found problems. List what you would record in a testing report and how you would present it.',
  15,
  8,
  'written',
  'Guide: question number, issue type (wording, logic, translation, display), device, steps to repeat, suggested fix, time taken per interview, priority; a clear table.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 9 (WRITTEN, 20 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-050000000009',
  '90000000-0000-0000-0000-000000000006',
  '10000000-0000-0000-0000-000000000003',
  'A respondent says halfway through that she wants to stop. What should you do and why?',
  'A respondent says halfway through that she wants to stop. What should you do and why?',
  20,
  9,
  'written',
  'Guide: stop respectfully; no pressure; thank her; do not use partial data unless the protocol allows; note it; inform the supervisor; voluntary participation principle.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 10 (WRITTEN, 20 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-050000000010',
  '90000000-0000-0000-0000-000000000006',
  '10000000-0000-0000-0000-000000000003',
  'Write a short message (5 to 7 lines) to your supervisor reporting that one village was inaccessible due to heavy rain. Include what you propose to do. Use placeholders where needed.',
  'Write a short message (5 to 7 lines) to your supervisor reporting that one village was inaccessible due to heavy rain. Include what you propose to do. Use placeholders where needed.',
  20,
  10,
  'written',
  'Guide: clear facts, impact on the schedule, a proposed alternative, what you need from the supervisor, concise professional tone, placeholders.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- --------------------------------------------------------------------
-- ROLE 6: Research Assistant (Job: 90000000-0000-0000-0000-000000000007)
-- --------------------------------------------------------------------
-- Question 1 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-060000000001',
  '90000000-0000-0000-0000-000000000007',
  '10000000-0000-0000-0000-000000000003',
  'Enumerator training before a household survey should include',
  'Enumerator training before a household survey should include',
  5,
  1,
  'mcq',
  'The purpose of the study, the questions, ethics and consent, practice interviews and data quality rules',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-060100000001', '81000000-0000-0000-0000-060000000001', 'A', 'Only the questionnaire', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-060100000002', '81000000-0000-0000-0000-060000000001', 'B', 'The purpose of the study, the questions, ethics and consent, practice interviews and data quality rules', true, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-060100000003', '81000000-0000-0000-0000-060000000001', 'C', 'Only travel plans', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-060100000004', '81000000-0000-0000-0000-060000000001', 'D', 'Only phone use', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 2 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-060000000002',
  '90000000-0000-0000-0000-000000000007',
  '10000000-0000-0000-0000-000000000003',
  'A back-check (re-interview of a small sample) is done to',
  'A back-check (re-interview of a small sample) is done to',
  5,
  2,
  'mcq',
  'Check that interviews really happened and answers match',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-060200000001', '81000000-0000-0000-0000-060000000002', 'A', 'Check that interviews really happened and answers match', true, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-060200000002', '81000000-0000-0000-0000-060000000002', 'B', 'Add more questions', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-060200000003', '81000000-0000-0000-0000-060000000002', 'C', 'Reduce the sample', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-060200000004', '81000000-0000-0000-0000-060000000002', 'D', 'Pay enumerators', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 3 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-060000000003',
  '90000000-0000-0000-0000-000000000007',
  '10000000-0000-0000-0000-000000000003',
  'A selected household is locked during the visit. The correct step is to',
  'A selected household is locked during the visit. The correct step is to',
  5,
  3,
  'mcq',
  'Follow the sampling plan''s call-back and replacement rules and record the attempt',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-060300000001', '81000000-0000-0000-0000-060000000003', 'A', 'Skip it and pick a neighbour at random', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-060300000002', '81000000-0000-0000-0000-060000000003', 'B', 'Interview whoever is nearby', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-060300000003', '81000000-0000-0000-0000-060000000003', 'C', 'Follow the sampling plan''s call-back and replacement rules and record the attempt', true, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-060300000004', '81000000-0000-0000-0000-060000000003', 'D', 'Make up a response', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 4 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-060000000004',
  '90000000-0000-0000-0000-000000000007',
  '10000000-0000-0000-0000-000000000003',
  'Reviewing the day''s data every evening helps because',
  'Reviewing the day''s data every evening helps because',
  5,
  4,
  'mcq',
  'Errors and gaps can be corrected while the team is still in the field',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-060400000001', '81000000-0000-0000-0000-060000000004', 'A', 'Errors and gaps can be corrected while the team is still in the field', true, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-060400000002', '81000000-0000-0000-0000-060000000004', 'B', 'It is a formality', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-060400000003', '81000000-0000-0000-0000-060000000004', 'C', 'It replaces back-checks', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-060400000004', '81000000-0000-0000-0000-060000000004', 'D', 'It reduces ethics risk to zero', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 5 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-060000000005',
  '90000000-0000-0000-0000-000000000007',
  '10000000-0000-0000-0000-000000000003',
  'Interviewing a minor in a household survey requires',
  'Interviewing a minor in a household survey requires',
  5,
  5,
  'mcq',
  'Following the protocol on parental consent and the child''s assent',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-060500000001', '81000000-0000-0000-0000-060000000005', 'A', 'No special care', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-060500000002', '81000000-0000-0000-0000-060000000005', 'B', 'Skipping consent', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-060500000003', '81000000-0000-0000-0000-060000000005', 'C', 'Paying the child', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-060500000004', '81000000-0000-0000-0000-060000000005', 'D', 'Following the protocol on parental consent and the child''s assent', true, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 6 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-060000000006',
  '90000000-0000-0000-0000-000000000007',
  '10000000-0000-0000-0000-000000000003',
  'An interview that took 5 minutes when the average is 25 minutes should',
  'An interview that took 5 minutes when the average is 25 minutes should',
  5,
  6,
  'mcq',
  'Be flagged and checked with the enumerator and a back-check',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-060600000001', '81000000-0000-0000-0000-060000000006', 'A', 'Be accepted as faster work', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-060600000002', '81000000-0000-0000-0000-060000000006', 'B', 'Be flagged and checked with the enumerator and a back-check', true, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-060600000003', '81000000-0000-0000-0000-060000000006', 'C', 'Be deleted automatically', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-060600000004', '81000000-0000-0000-0000-060000000006', 'D', 'Be ignored', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 7 (WRITTEN, 15 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-060000000007',
  '90000000-0000-0000-0000-000000000007',
  '10000000-0000-0000-0000-000000000003',
  'You will coordinate eight enumerators for a 12-day household survey. Describe your plan for training, daily routine, supervision and communication.',
  'You will coordinate eight enumerators for a 12-day household survey. Describe your plan for training, daily routine, supervision and communication.',
  15,
  7,
  'written',
  'Guide: training and practice; teams and areas; daily briefing and debrief; supervision visits; data upload and review; issue log; welfare and safety; escalation to the research lead.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 8 (WRITTEN, 15 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-060000000008',
  '90000000-0000-0000-0000-000000000007',
  '10000000-0000-0000-0000-000000000003',
  'The evening review shows one enumerator has many missing answers in one section. Explain how you would handle it.',
  'The evening review shows one enumerator has many missing answers in one section. Explain how you would handle it.',
  15,
  8,
  'written',
  'Guide: check the data; speak with the enumerator without blame; find the cause (tool, confusion, shortcut); retrain; re-contact respondents if needed; track improvement; inform the lead.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 9 (WRITTEN, 20 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-060000000009',
  '90000000-0000-0000-0000-000000000007',
  '10000000-0000-0000-0000-000000000003',
  'Write a short daily field report (8 to 10 lines) using placeholders for numbers. Include progress, issues, decisions and next steps.',
  'Write a short daily field report (8 to 10 lines) using placeholders for numbers. Include progress, issues, decisions and next steps.',
  20,
  9,
  'written',
  'Guide: date and area; completed versus planned interviews; refusals and replacements; issues; actions; support needed; next day plan; clear and concise.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 10 (WRITTEN, 20 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-060000000010',
  '90000000-0000-0000-0000-000000000007',
  '10000000-0000-0000-0000-000000000003',
  'A community leader objects to the survey and asks you to stop. How do you respond?',
  'A community leader objects to the survey and asks you to stop. How do you respond?',
  20,
  10,
  'written',
  'Guide: stay calm and respectful; explain the purpose and permissions; share official letters; do not argue or pressure; pause fieldwork if needed; inform the supervisor; follow the protocol on community engagement.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- --------------------------------------------------------------------
-- ROLE 7: Research Associate (Job: 90000000-0000-0000-0000-000000000008)
-- --------------------------------------------------------------------
-- Question 1 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-070000000001',
  '90000000-0000-0000-0000-000000000008',
  '10000000-0000-0000-0000-000000000003',
  'An explanatory sequential mixed-methods design',
  'An explanatory sequential mixed-methods design',
  5,
  1,
  'mcq',
  'Collects quantitative data first, then qualitative data to explain the results',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-070100000001', '81000000-0000-0000-0000-070000000001', 'A', 'Starts with qualitative work to build a survey', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-070100000002', '81000000-0000-0000-0000-070000000001', 'B', 'Uses only interviews', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-070100000003', '81000000-0000-0000-0000-070000000001', 'C', 'Collects quantitative data first, then qualitative data to explain the results', true, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-070100000004', '81000000-0000-0000-0000-070000000001', 'D', 'Collects no data', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 2 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-070000000002',
  '90000000-0000-0000-0000-000000000008',
  '10000000-0000-0000-0000-000000000003',
  'Which does NOT directly affect the sample size needed for a survey estimate?',
  'Which does NOT directly affect the sample size needed for a survey estimate?',
  5,
  2,
  'mcq',
  'The colour of the report cover',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-070200000001', '81000000-0000-0000-0000-070000000002', 'A', 'Desired precision', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-070200000002', '81000000-0000-0000-0000-070000000002', 'B', 'Expected variability', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-070200000003', '81000000-0000-0000-0000-070000000002', 'C', 'Confidence level', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-070200000004', '81000000-0000-0000-0000-070000000002', 'D', 'The colour of the report cover', true, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 3 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-070000000003',
  '90000000-0000-0000-0000-000000000008',
  '10000000-0000-0000-0000-000000000003',
  'Coding qualitative data means',
  'Coding qualitative data means',
  5,
  3,
  'mcq',
  'Tagging text with themes to find patterns',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-070300000001', '81000000-0000-0000-0000-070000000003', 'A', 'Writing software', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-070300000002', '81000000-0000-0000-0000-070000000003', 'B', 'Encrypting files', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-070300000003', '81000000-0000-0000-0000-070000000003', 'C', 'Counting words only', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-070300000004', '81000000-0000-0000-0000-070000000003', 'D', 'Tagging text with themes to find patterns', true, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 4 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-070000000004',
  '90000000-0000-0000-0000-000000000008',
  '10000000-0000-0000-0000-000000000003',
  'A 95% confidence interval of 40% to 48% suggests',
  'A 95% confidence interval of 40% to 48% suggests',
  5,
  4,
  'mcq',
  'The true value is plausibly within that range, given the sampling method',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-070400000001', '81000000-0000-0000-0000-070000000004', 'A', 'The true value is plausibly within that range, given the sampling method', true, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-070400000002', '81000000-0000-0000-0000-070000000004', 'B', 'Exactly 95% of people answered yes', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-070400000003', '81000000-0000-0000-0000-070000000004', 'C', 'The result is certain', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-070400000004', '81000000-0000-0000-0000-070000000004', 'D', 'The sample is biased', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 5 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-070000000005',
  '90000000-0000-0000-0000-000000000008',
  '10000000-0000-0000-0000-000000000003',
  'Which is a research question rather than a task?',
  'Which is a research question rather than a task?',
  5,
  5,
  'mcq',
  'Why do eligible households not use the scheme?',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-070500000001', '81000000-0000-0000-0000-070000000005', 'A', 'Collect 500 surveys', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-070500000002', '81000000-0000-0000-0000-070000000005', 'B', 'Why do eligible households not use the scheme?', true, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-070500000003', '81000000-0000-0000-0000-070000000005', 'C', 'Hire six enumerators', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-070500000004', '81000000-0000-0000-0000-070000000005', 'D', 'Write the report', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 6 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-070000000006',
  '90000000-0000-0000-0000-000000000008',
  '10000000-0000-0000-0000-000000000003',
  'A supervisor finds a systematic error in a team member''s data entry. The best response is to',
  'A supervisor finds a systematic error in a team member''s data entry. The best response is to',
  5,
  6,
  'mcq',
  'Correct the root cause, retrain and re-check the affected data',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-070600000001', '81000000-0000-0000-0000-070000000006', 'A', 'Say nothing', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-070600000002', '81000000-0000-0000-0000-070000000006', 'B', 'Blame the team', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-070600000003', '81000000-0000-0000-0000-070000000006', 'C', 'Correct the root cause, retrain and re-check the affected data', true, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-070600000004', '81000000-0000-0000-0000-070000000006', 'D', 'Remove the member', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 7 (WRITTEN, 15 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-070000000007',
  '90000000-0000-0000-0000-000000000008',
  '10000000-0000-0000-0000-000000000003',
  'Outline a mixed-methods design to evaluate a six-month skills training programme for young people. Explain what each method adds.',
  'Outline a mixed-methods design to evaluate a six-month skills training programme for young people. Explain what each method adds.',
  15,
  7,
  'written',
  'Guide: research questions; survey before and after or with a comparison group; interviews or focus groups for reasons and experiences; sampling; how results are combined; limitations.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 8 (WRITTEN, 15 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-070000000008',
  '90000000-0000-0000-0000-000000000008',
  '10000000-0000-0000-0000-000000000003',
  'A survey finds 62% of trained participants are employed versus 48% of a comparison group. Write three careful findings and two caveats for a client summary.',
  'A survey finds 62% of trained participants are employed versus 48% of a comparison group. Write three careful findings and two caveats for a client summary.',
  15,
  8,
  'written',
  'Guide: report the figures accurately; association versus cause; sample and comparability; data collection period; possible bias; avoid overclaiming; plain language.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 9 (WRITTEN, 20 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-070000000009',
  '90000000-0000-0000-0000-000000000008',
  '10000000-0000-0000-0000-000000000003',
  'Describe how you would supervise a team of 10 enumerators across three districts during a data collection round, including quality control.',
  'Describe how you would supervise a team of 10 enumerators across three districts during a data collection round, including quality control.',
  20,
  9,
  'written',
  'Guide: clear roles; supervisors per district; training; daily review and back-checks; dashboards; issue log; ethics; support; reporting.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 10 (WRITTEN, 20 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-070000000010',
  '90000000-0000-0000-0000-000000000008',
  '10000000-0000-0000-0000-000000000003',
  'The client wants the final report two weeks earlier than agreed. How do you respond?',
  'The client wants the final report two weeks earlier than agreed. How do you respond?',
  20,
  10,
  'written',
  'Guide: check feasibility and the effect on quality; discuss with your manager; propose options (interim findings, reduced scope, extra resources); confirm any change in writing; manage the client professionally.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- --------------------------------------------------------------------
-- ROLE 8: Research Executive (Job: 90000000-0000-0000-0000-000000000009)
-- --------------------------------------------------------------------
-- Question 1 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-080000000001',
  '90000000-0000-0000-0000-000000000009',
  '10000000-0000-0000-0000-000000000003',
  'A theory of change shows',
  'A theory of change shows',
  5,
  1,
  'mcq',
  'How activities are expected to lead to outcomes and impact, and the assumptions behind that',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-080100000001', '81000000-0000-0000-0000-080000000001', 'A', 'The office floor plan', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-080100000002', '81000000-0000-0000-0000-080000000001', 'B', 'The budget only', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-080100000003', '81000000-0000-0000-0000-080000000001', 'C', 'How activities are expected to lead to outcomes and impact, and the assumptions behind that', true, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-080100000004', '81000000-0000-0000-0000-080000000001', 'D', 'The list of staff', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 2 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-080000000002',
  '90000000-0000-0000-0000-000000000009',
  '10000000-0000-0000-0000-000000000003',
  'A SMART indicator is',
  'A SMART indicator is',
  5,
  2,
  'mcq',
  'Specific, measurable, achievable, relevant and time-bound',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-080200000001', '81000000-0000-0000-0000-080000000002', 'A', 'Specific, measurable, achievable, relevant and time-bound', true, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-080200000002', '81000000-0000-0000-0000-080000000002', 'B', 'Simple, modern, accurate, reported and tested', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-080200000003', '81000000-0000-0000-0000-080000000002', 'C', 'Short, manual, approved, regular and tracked', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-080200000004', '81000000-0000-0000-0000-080000000002', 'D', 'Standard, mandatory, annual, reviewed and tabled', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 3 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-080000000003',
  '90000000-0000-0000-0000-000000000009',
  '10000000-0000-0000-0000-000000000003',
  'A risk register is used to',
  'A risk register is used to',
  5,
  3,
  'mcq',
  'Track identified risks, their likelihood and impact, owners and mitigation',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-080300000001', '81000000-0000-0000-0000-080000000003', 'A', 'Record attendance', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-080300000002', '81000000-0000-0000-0000-080000000003', 'B', 'Track identified risks, their likelihood and impact, owners and mitigation', true, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-080300000003', '81000000-0000-0000-0000-080000000003', 'C', 'Store invoices', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-080300000004', '81000000-0000-0000-0000-080000000003', 'D', 'List clients', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 4 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-080000000004',
  '90000000-0000-0000-0000-000000000009',
  '10000000-0000-0000-0000-000000000003',
  'Scope creep happens when',
  'Scope creep happens when',
  5,
  4,
  'mcq',
  'The project''s work grows beyond what was agreed without adjusting time or budget',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-080400000001', '81000000-0000-0000-0000-080000000004', 'A', 'Deadlines are met early', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-080400000002', '81000000-0000-0000-0000-080000000004', 'B', 'The budget falls', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-080400000003', '81000000-0000-0000-0000-080000000004', 'C', 'The team shrinks', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-080400000004', '81000000-0000-0000-0000-080000000004', 'D', 'The project''s work grows beyond what was agreed without adjusting time or budget', true, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 5 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-080000000005',
  '90000000-0000-0000-0000-000000000009',
  '10000000-0000-0000-0000-000000000003',
  'A project that has spent 80% of its budget in the first half of its timeline is',
  'A project that has spent 80% of its budget in the first half of its timeline is',
  5,
  5,
  'mcq',
  'At risk of overspending and needs review',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-080500000001', '81000000-0000-0000-0000-080000000005', 'A', 'Healthy', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-080500000002', '81000000-0000-0000-0000-080000000005', 'B', 'Ahead of schedule', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-080500000003', '81000000-0000-0000-0000-080000000005', 'C', 'At risk of overspending and needs review', true, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-080500000004', '81000000-0000-0000-0000-080000000005', 'D', 'Complete', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 6 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-080000000006',
  '90000000-0000-0000-0000-000000000009',
  '10000000-0000-0000-0000-000000000003',
  'A donor deliverable should be',
  'A donor deliverable should be',
  5,
  6,
  'mcq',
  'Aligned to the agreed format, quality-checked and delivered by the date in the contract',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-080600000001', '81000000-0000-0000-0000-080000000006', 'A', 'Sent at any time', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-080600000002', '81000000-0000-0000-0000-080000000006', 'B', 'Aligned to the agreed format, quality-checked and delivered by the date in the contract', true, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-080600000003', '81000000-0000-0000-0000-080000000006', 'C', 'Prepared only after a reminder', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-080600000004', '81000000-0000-0000-0000-080000000006', 'D', 'Shared with anyone', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 7 (WRITTEN, 15 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-080000000007',
  '90000000-0000-0000-0000-000000000009',
  '10000000-0000-0000-0000-000000000003',
  'You are leading a three-month evaluation project with a team of five. Outline the work plan, key milestones and how you would track progress.',
  'You are leading a three-month evaluation project with a team of five. Outline the work plan, key milestones and how you would track progress.',
  15,
  7,
  'written',
  'Guide: phases; milestones and deliverables; roles; weekly tracking; risk register; budget watch; reporting rhythm; client check-ins.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 8 (WRITTEN, 15 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-080000000008',
  '90000000-0000-0000-0000-000000000009',
  '10000000-0000-0000-0000-000000000003',
  'Halfway through, the donor asks you to increase the sample size without extending time or budget. How do you respond?',
  'Halfway through, the donor asks you to increase the sample size without extending time or budget. How do you respond?',
  15,
  8,
  'written',
  'Guide: assess the impact; present options and trade-offs; propose a change request; protect quality; document agreements in writing; escalate to leadership.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 9 (WRITTEN, 20 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-080000000009',
  '90000000-0000-0000-0000-000000000009',
  '10000000-0000-0000-0000-000000000003',
  'Write a short status update (8 to 10 lines) to a donor, with placeholders. Include progress, risks and next steps.',
  'Write a short status update (8 to 10 lines) to a donor, with placeholders. Include progress, risks and next steps.',
  20,
  9,
  'written',
  'Guide: project and period; progress against milestones; completed and delayed items; risks and mitigation; support needed; next steps; honest and concise.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 10 (WRITTEN, 20 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-080000000010',
  '90000000-0000-0000-0000-000000000009',
  '10000000-0000-0000-0000-000000000003',
  'Describe the quality assurance system you would set up for fieldwork in three districts.',
  'Describe the quality assurance system you would set up for fieldwork in three districts.',
  20,
  10,
  'written',
  'Guide: protocols and training; supervision; spot checks and back-checks; real-time data monitoring; issue escalation; ethics and safeguarding; documentation; corrective action.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- --------------------------------------------------------------------
-- ROLE 9: Sr. Research Associate (Job: 90000000-0000-0000-0000-000000000010)
-- --------------------------------------------------------------------
-- Question 1 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-090000000001',
  '90000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000003',
  'A design effect greater than 1 in a clustered survey means',
  'A design effect greater than 1 in a clustered survey means',
  5,
  1,
  'mcq',
  'Clustering reduces precision compared with simple random sampling, so a larger sample is needed',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-090100000001', '81000000-0000-0000-0000-090000000001', 'A', 'The sample is smaller than needed', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-090100000002', '81000000-0000-0000-0000-090000000001', 'B', 'The sample is biased', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-090100000003', '81000000-0000-0000-0000-090000000001', 'C', 'Clustering reduces precision compared with simple random sampling, so a larger sample is needed', true, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-090100000004', '81000000-0000-0000-0000-090000000001', 'D', 'The questionnaire is long', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 2 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-090000000002',
  '90000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000003',
  'Statistical power is',
  'Statistical power is',
  5,
  2,
  'mcq',
  'The probability of detecting a real effect of a given size if it exists',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-090200000001', '81000000-0000-0000-0000-090000000002', 'A', 'The probability of detecting a real effect of a given size if it exists', true, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-090200000002', '81000000-0000-0000-0000-090000000002', 'B', 'The strength of the field team', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-090200000003', '81000000-0000-0000-0000-090000000002', 'C', 'The size of the sample only', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-090200000004', '81000000-0000-0000-0000-090000000002', 'D', 'The confidence level', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 3 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-090000000003',
  '90000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000003',
  'Without randomisation, with before and after data for treatment and comparison groups, a common design for estimating impact is',
  'Without randomisation, with before and after data for treatment and comparison groups, a common design for estimating impact is',
  5,
  3,
  'mcq',
  'Difference-in-differences',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-090300000001', '81000000-0000-0000-0000-090000000003', 'A', 'Simple averages', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-090300000002', '81000000-0000-0000-0000-090000000003', 'B', 'Difference-in-differences', true, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-090300000003', '81000000-0000-0000-0000-090000000003', 'C', 'A pie chart', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-090300000004', '81000000-0000-0000-0000-090000000003', 'D', 'A census', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 4 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-090000000004',
  '90000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000003',
  'Attrition bias arises when',
  'Attrition bias arises when',
  5,
  4,
  'mcq',
  'People who drop out of a follow-up differ systematically from those who stay',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-090400000001', '81000000-0000-0000-0000-090000000004', 'A', 'The tool is too long', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-090400000002', '81000000-0000-0000-0000-090000000004', 'B', 'The team is too large', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-090400000003', '81000000-0000-0000-0000-090000000004', 'C', 'People who drop out of a follow-up differ systematically from those who stay', true, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-090400000004', '81000000-0000-0000-0000-090000000004', 'D', 'Data is encrypted', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 5 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-090000000005',
  '90000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000003',
  'Spillover between treatment and comparison groups',
  'Spillover between treatment and comparison groups',
  5,
  5,
  'mcq',
  'Can contaminate the comparison and distort the estimated effect',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-090500000001', '81000000-0000-0000-0000-090000000005', 'A', 'Improves the evaluation', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-090500000002', '81000000-0000-0000-0000-090000000005', 'B', 'Is irrelevant', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-090500000003', '81000000-0000-0000-0000-090000000005', 'C', 'Reduces cost', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-090500000004', '81000000-0000-0000-0000-090000000005', 'D', 'Can contaminate the comparison and distort the estimated effect', true, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 6 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-090000000006',
  '90000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000003',
  'Testing many outcomes without adjustment increases',
  'Testing many outcomes without adjustment increases',
  5,
  6,
  'mcq',
  'The chance of false-positive findings',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-090600000001', '81000000-0000-0000-0000-090000000006', 'A', 'The chance of false-positive findings', true, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-090600000002', '81000000-0000-0000-0000-090000000006', 'B', 'Sample size', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-090600000003', '81000000-0000-0000-0000-090000000006', 'C', 'Response rates', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-090600000004', '81000000-0000-0000-0000-090000000006', 'D', 'Precision', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 7 (WRITTEN, 15 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-090000000007',
  '90000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000003',
  'Design a multi-state impact evaluation of a livelihoods programme. Cover the evaluation questions, design choice, sampling across states and key risks.',
  'Design a multi-state impact evaluation of a livelihoods programme. Cover the evaluation questions, design choice, sampling across states and key risks.',
  15,
  7,
  'written',
  'Guide: evaluation questions; counterfactual (difference-in-differences, matching or randomisation); sampling and clustering; power; harmonised instruments across languages; ethics; risks such as attrition and spillover.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 8 (WRITTEN, 15 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-090000000008',
  '90000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000003',
  'A junior colleague''s analysis reports a significant effect, but you notice the comparison group was not comparable at baseline. How do you review and advise?',
  'A junior colleague''s analysis reports a significant effect, but you notice the comparison group was not comparable at baseline. How do you review and advise?',
  15,
  8,
  'written',
  'Guide: check baseline balance; discuss constructively with the colleague; adjust the method (matching, controls, difference-in-differences); sensitivity checks; report limitations; document.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 9 (WRITTEN, 20 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-090000000009',
  '90000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000003',
  'A client wants a small, quick survey to "prove" that their programme works. Explain how you would advise them and what you can honestly claim.',
  'A client wants a small, quick survey to "prove" that their programme works. Explain how you would advise them and what you can honestly claim.',
  20,
  9,
  'written',
  'Guide: clarify the question; limits of a small sample and no comparison; options (comparison group, longer timeline); manage expectations; honest claims; offer a feasible alternative.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 10 (WRITTEN, 20 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-090000000010',
  '90000000-0000-0000-0000-000000000010',
  '10000000-0000-0000-0000-000000000003',
  'Describe how you would build a quality framework for a team of researchers, including review, mentoring and ethics.',
  'Describe how you would build a quality framework for a team of researchers, including review, mentoring and ethics.',
  20,
  10,
  'written',
  'Guide: standards and templates; peer and senior review; documentation and reproducibility; mentoring plan; ethics and safeguarding checks; learning from errors; metrics.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- --------------------------------------------------------------------
-- ROLE 10: Social Media cum Graphic Design Intern (Job: 90000000-0000-0000-0000-000000000011)
-- --------------------------------------------------------------------
-- Question 1 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-100000000001',
  '90000000-0000-0000-0000-000000000011',
  '10000000-0000-0000-0000-000000000004',
  'Text on a background should have',
  'Text on a background should have',
  5,
  1,
  'mcq',
  'High enough contrast to be readable and meet accessibility guidance',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-100100000001', '81000000-0000-0000-0000-100000000001', 'A', 'Low contrast for style', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-100100000002', '81000000-0000-0000-0000-100000000001', 'B', 'Any colour combination', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-100100000003', '81000000-0000-0000-0000-100000000001', 'C', 'High enough contrast to be readable and meet accessibility guidance', true, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-100100000004', '81000000-0000-0000-0000-100000000001', 'D', 'A gradient only', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 2 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-100000000002',
  '90000000-0000-0000-0000-000000000011',
  '10000000-0000-0000-0000-000000000004',
  'Using the brand consistently means',
  'Using the brand consistently means',
  5,
  2,
  'mcq',
  'Using the approved logo, colours, fonts and spacing',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-100200000001', '81000000-0000-0000-0000-100000000002', 'A', 'Using any font you like', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-100200000002', '81000000-0000-0000-0000-100000000002', 'B', 'Changing the style for every post', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-100200000003', '81000000-0000-0000-0000-100000000002', 'C', 'Always using bright colours', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-100200000004', '81000000-0000-0000-0000-100000000002', 'D', 'Using the approved logo, colours, fonts and spacing', true, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 3 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-100000000003',
  '90000000-0000-0000-0000-000000000011',
  '10000000-0000-0000-0000-000000000004',
  'A LinkedIn carousel works best when it has',
  'A LinkedIn carousel works best when it has',
  5,
  3,
  'mcq',
  'One idea per slide and a clear hook on the first slide',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-100300000001', '81000000-0000-0000-0000-100000000003', 'A', 'Dense paragraphs on every slide', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-100300000002', '81000000-0000-0000-0000-100000000003', 'B', 'One idea per slide and a clear hook on the first slide', true, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-100300000003', '81000000-0000-0000-0000-100000000003', 'C', 'Forty slides', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-100300000004', '81000000-0000-0000-0000-100000000003', 'D', 'No call to action', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 4 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-100000000004',
  '90000000-0000-0000-0000-000000000011',
  '10000000-0000-0000-0000-000000000004',
  'Alt text on an image is mainly for',
  'Alt text on an image is mainly for',
  5,
  4,
  'mcq',
  'Describing the image to screen-reader users and when the image fails to load',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-100400000001', '81000000-0000-0000-0000-100000000004', 'A', 'Describing the image to screen-reader users and when the image fails to load', true, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-100400000002', '81000000-0000-0000-0000-100000000004', 'B', 'Decoration', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-100400000003', '81000000-0000-0000-0000-100000000004', 'C', 'Tricking search engines', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-100400000004', '81000000-0000-0000-0000-100000000004', 'D', 'Copyright protection', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 5 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-100000000005',
  '90000000-0000-0000-0000-000000000011',
  '10000000-0000-0000-0000-000000000004',
  'Before publishing an infographic with statistics, you should',
  'Before publishing an infographic with statistics, you should',
  5,
  5,
  'mcq',
  'Verify the numbers and cite the source',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-100500000001', '81000000-0000-0000-0000-100000000005', 'A', 'Trust your memory', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-100500000002', '81000000-0000-0000-0000-100000000005', 'B', 'Round the numbers randomly', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-100500000003', '81000000-0000-0000-0000-100000000005', 'C', 'Verify the numbers and cite the source', true, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-100500000004', '81000000-0000-0000-0000-100000000005', 'D', 'Remove the source to save space', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 6 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-100000000006',
  '90000000-0000-0000-0000-000000000011',
  '10000000-0000-0000-0000-000000000004',
  'Using a photo found through a web search is acceptable only if',
  'Using a photo found through a web search is acceptable only if',
  5,
  6,
  'mcq',
  'You have the right or licence to use it and credit it as required',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-100600000001', '81000000-0000-0000-0000-100000000006', 'A', 'It appears to be public', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-100600000002', '81000000-0000-0000-0000-100000000006', 'B', 'It is small', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-100600000003', '81000000-0000-0000-0000-100000000006', 'C', 'Competitors use it', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-100600000004', '81000000-0000-0000-0000-100000000006', 'D', 'You have the right or licence to use it and credit it as required', true, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 7 (WRITTEN, 15 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-100000000007',
  '90000000-0000-0000-0000-000000000011',
  '10000000-0000-0000-0000-000000000004',
  'Plan a one-week social media campaign for a new report launch. Include the goal, audience, content types, schedule and how you would measure results.',
  'Plan a one-week social media campaign for a new report launch. Include the goal, audience, content types, schedule and how you would measure results.',
  15,
  7,
  'written',
  'Guide: clear goal; audience; key messages; content types; day-by-day schedule; channels; approvals; metrics such as reach, engagement, clicks and downloads; review after the campaign.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 8 (WRITTEN, 15 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-100000000008',
  '90000000-0000-0000-0000-000000000011',
  '10000000-0000-0000-0000-000000000004',
  'Describe how you would turn a 40-page research report into a six-slide LinkedIn carousel.',
  'Describe how you would turn a 40-page research report into a six-slide LinkedIn carousel.',
  15,
  8,
  'written',
  'Guide: choose the key findings; one idea per slide; strong hook; simple visuals; brand consistency; readable text; call to action pointing to the full report; accessibility.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 9 (WRITTEN, 20 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-100000000009',
  '90000000-0000-0000-0000-000000000011',
  '10000000-0000-0000-0000-000000000004',
  'Write a short LinkedIn caption (maximum 80 words) announcing a webinar on a social development topic, with a call to action. Use placeholders for the date and link.',
  'Write a short LinkedIn caption (maximum 80 words) announcing a webinar on a social development topic, with a call to action. Use placeholders for the date and link.',
  20,
  9,
  'written',
  'Guide: hook, topic, who should attend, date and time placeholders, call to action with a link placeholder, appropriate tone, within 80 words.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 10 (WRITTEN, 20 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-100000000010',
  '90000000-0000-0000-0000-000000000011',
  '10000000-0000-0000-0000-000000000004',
  'A partner asks you to use their logo in a different colour to match your design. How do you respond, and what is your process for brand and approvals?',
  'A partner asks you to use their logo in a different colour to match your design. How do you respond, and what is your process for brand and approvals?',
  20,
  10,
  'written',
  'Guide: check the partner''s brand guidelines; do not alter partner logos without written permission; get approval from the right person; offer alternatives such as a neutral background; document the decision.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- --------------------------------------------------------------------
-- ROLE 11: Associate - Partnerships & BD (Job: 90000000-0000-0000-0000-000000000004)
-- --------------------------------------------------------------------
-- Question 1 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-110000000001',
  '90000000-0000-0000-0000-000000000004',
  '10000000-0000-0000-0000-000000000005',
  'What is the first thing to do with a new RFP?',
  'What is the first thing to do with a new RFP?',
  5,
  1,
  'mcq',
  'Read it fully, note eligibility, deadlines and scoring criteria, then decide go or no-go',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-110100000001', '81000000-0000-0000-0000-110000000001', 'A', 'Start writing straight away', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-110100000002', '81000000-0000-0000-0000-110000000001', 'B', 'Email competitors', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-110100000003', '81000000-0000-0000-0000-110000000001', 'C', 'Ignore the scoring criteria', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-110100000004', '81000000-0000-0000-0000-110000000001', 'D', 'Read it fully, note eligibility, deadlines and scoring criteria, then decide go or no-go', true, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 2 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-110000000002',
  '90000000-0000-0000-0000-000000000004',
  '10000000-0000-0000-0000-000000000005',
  'A go/no-go decision should weigh',
  'A go/no-go decision should weigh',
  5,
  2,
  'mcq',
  'Fit with expertise, eligibility, capacity, competition, profitability and strategic value',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-110200000001', '81000000-0000-0000-0000-110000000002', 'A', 'Only the fee', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-110200000002', '81000000-0000-0000-0000-110000000002', 'B', 'Fit with expertise, eligibility, capacity, competition, profitability and strategic value', true, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-110200000003', '81000000-0000-0000-0000-110000000002', 'C', 'Random choice', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-110200000004', '81000000-0000-0000-0000-110000000002', 'D', 'The length of the RFP', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 3 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-110000000003',
  '90000000-0000-0000-0000-000000000004',
  '10000000-0000-0000-0000-000000000005',
  'In bid scoring, the technical proposal mainly shows',
  'In bid scoring, the technical proposal mainly shows',
  5,
  3,
  'mcq',
  'Your understanding of the problem, approach, team and work plan',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-110300000001', '81000000-0000-0000-0000-110000000003', 'A', 'The price only', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-110300000002', '81000000-0000-0000-0000-110000000003', 'B', 'Bank details', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-110300000003', '81000000-0000-0000-0000-110000000003', 'C', 'Your understanding of the problem, approach, team and work plan', true, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-110300000004', '81000000-0000-0000-0000-110000000003', 'D', 'The company logo', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 4 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-110000000004',
  '90000000-0000-0000-0000-000000000004',
  '10000000-0000-0000-0000-000000000005',
  'The RFP sets a 10-page limit. You should',
  'The RFP sets a 10-page limit. You should',
  5,
  4,
  'mcq',
  'Follow the page limit and format exactly',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-110400000001', '81000000-0000-0000-0000-110000000004', 'A', 'Submit 20 pages', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-110400000002', '81000000-0000-0000-0000-110000000004', 'B', 'Follow the page limit and format exactly', true, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-110400000003', '81000000-0000-0000-0000-110000000004', 'C', 'Shrink the font to 6 points', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-110400000004', '81000000-0000-0000-0000-110000000004', 'D', 'Skip the limit', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 5 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-110000000005',
  '90000000-0000-0000-0000-000000000004',
  '10000000-0000-0000-0000-000000000005',
  'A CRM is used to',
  'A CRM is used to',
  5,
  5,
  'mcq',
  'Track contacts, opportunities, follow-ups and history',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-110500000001', '81000000-0000-0000-0000-110000000005', 'A', 'Edit images', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-110500000002', '81000000-0000-0000-0000-110000000005', 'B', 'Run payroll', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-110500000003', '81000000-0000-0000-0000-110000000005', 'C', 'Host chat', false, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-110500000004', '81000000-0000-0000-0000-110000000005', 'D', 'Track contacts, opportunities, follow-ups and history', true, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 6 (MCQ, 5 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-110000000006',
  '90000000-0000-0000-0000-000000000004',
  '10000000-0000-0000-0000-000000000005',
  'A clarification question about an RFP should be sent',
  'A clarification question about an RFP should be sent',
  5,
  6,
  'mcq',
  'Through the official channel named in the RFP, before the stated deadline',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-110600000001', '81000000-0000-0000-0000-110000000006', 'A', 'Through a friend inside the organisation', false, 1)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-110600000002', '81000000-0000-0000-0000-110000000006', 'B', 'After you submit', false, 2)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-110600000003', '81000000-0000-0000-0000-110000000006', 'C', 'Through the official channel named in the RFP, before the stated deadline', true, 3)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;
insert into public.exam_question_options (id, question_id, option_label, option_text, is_correct, sort_order)
values ('82000000-0000-0000-0000-110600000004', '81000000-0000-0000-0000-110000000006', 'D', 'Never', false, 4)
on conflict (id) do update set
  question_id = excluded.question_id,
  option_label = excluded.option_label,
  option_text = excluded.option_text,
  is_correct = excluded.is_correct,
  sort_order = excluded.sort_order;

-- Question 7 (WRITTEN, 15 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-110000000007',
  '90000000-0000-0000-0000-000000000004',
  '10000000-0000-0000-0000-000000000005',
  'Outline the steps of preparing a proposal response from RFP release to submission, with roles and a timeline.',
  'Outline the steps of preparing a proposal response from RFP release to submission, with roles and a timeline.',
  15,
  7,
  'written',
  'Guide: read the RFP and decide go/no-go; kickoff and roles; compliance matrix; clarification questions; technical and financial drafting; internal review; formatting; submission with a time buffer; working backwards from the deadline.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 8 (WRITTEN, 15 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-110000000008',
  '90000000-0000-0000-0000-000000000004',
  '10000000-0000-0000-0000-000000000005',
  'Draft a short introductory email (6 to 8 lines) to a potential institutional partner proposing a conversation about a joint project. Use placeholders for unknown details.',
  'Draft a short introductory email (6 to 8 lines) to a potential institutional partner proposing a conversation about a joint project. Use placeholders for unknown details.',
  15,
  8,
  'written',
  'Guide: personalised greeting; brief introduction of the organisation; relevance to the partner; a clear and specific ask; a contact; polite, concise tone; placeholders used correctly.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 9 (WRITTEN, 20 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-110000000009',
  '90000000-0000-0000-0000-000000000004',
  '10000000-0000-0000-0000-000000000005',
  'A tender gives 70% weight to the technical proposal and 30% to the financial proposal. How does that affect your proposal and what would you prioritise?',
  'A tender gives 70% weight to the technical proposal and 30% to the financial proposal. How does that affect your proposal and what would you prioritise?',
  20,
  9,
  'written',
  'Guide: invest most effort in approach, methodology, team and relevant experience; still price competitively; meet all mandatory criteria; make the scoring easy to follow with a clear crosswalk to the criteria.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

-- Question 10 (WRITTEN, 20 marks)
insert into public.exam_questions (id, job_id, programme_id, question, prompt, max_marks, sort_order, question_type, marking_guide, is_active)
values (
  '81000000-0000-0000-0000-110000000010',
  '90000000-0000-0000-0000-000000000004',
  '10000000-0000-0000-0000-000000000005',
  'A competitor''s staff member offers you confidential information about another bid. How do you respond, and why?',
  'A competitor''s staff member offers you confidential information about another bid. How do you respond, and why?',
  20,
  10,
  'written',
  'Guide: decline and do not use it; ethical, legal and reputational risk; report to your manager; protect the organisation''s integrity; follow procurement rules.',
  true
)
on conflict (id) do update set
  job_id = excluded.job_id,
  programme_id = excluded.programme_id,
  question = excluded.question,
  prompt = excluded.prompt,
  max_marks = excluded.max_marks,
  sort_order = excluded.sort_order,
  question_type = excluded.question_type,
  marking_guide = excluded.marking_guide,
  is_active = excluded.is_active;

commit;

-- Verification notice: Seeded 110 questions and 264 options across 11 roles.