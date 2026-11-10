-- ====================================================================
-- OPTIONAL DEMO DATA: COMPANY RESOURCES
-- File: supabase/demo_company_documents.sql
-- Clearly marked as DEMO DATA for testing purposes.
-- DO NOT RUN IF YOU ONLY WANT REAL UPLOADED DOCUMENTS.
-- ====================================================================

-- 1. Insert Demo Documents
-- All Programmes (programme_id is null)
insert into public.company_documents (
  id, title, description, document_type, programme_id, storage_path, file_name, file_size, mime_type, version, issued_at, is_published, is_archived
) values
(
  'c0000000-0000-0000-0000-000000000001',
  'Ikaai Foundation Code of Ethics and Conduct',
  'Official workplace ethics, zero-tolerance anti-harassment policies, and integrity guidelines for all employees, interns, and contractors.',
  'policy',
  null,
  'all-programmes/c0000000-0000-0000-0000-000000000001/ikaai-code-of-ethics.pdf',
  'ikaai-code-of-ethics.pdf',
  2457600,
  'application/pdf',
  'v2.0',
  current_date - interval '3 days',
  true,
  false
),
(
  'c0000000-0000-0000-0000-000000000002',
  'Travel, Fieldwork & Daily Expense Reimbursement Policy',
  'Standard operating procedures, per diem rates, and claim submission deadlines for domestic field travel.',
  'policy',
  null,
  'all-programmes/c0000000-0000-0000-0000-000000000002/ikaai-travel-expense-policy.pdf',
  'ikaai-travel-expense-policy.pdf',
  1153433,
  'application/pdf',
  'v1.2',
  current_date - interval '20 days',
  true,
  false
),
(
  'c0000000-0000-0000-0000-000000000003',
  'Formal Leave Request & Absence Application Form',
  'Fillable digital form for planned academic leaves, exam breaks, medical exigencies, and remote check-ins.',
  'form',
  null,
  'all-programmes/c0000000-0000-0000-0000-000000000003/ikaai-leave-application-form.docx',
  'ikaai-leave-application-form.docx',
  354816,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'v1.0',
  current_date - interval '8 days',
  true,
  false
),

-- Human Resources Programme
(
  'c0000000-0000-0000-0000-000000000004',
  'HR Intern Weekly Deliverables & Performance Rubric',
  'Standardized evaluation guidelines, candidate pipeline benchmarks, and milestone checkpoints for HR recruitment interns.',
  'guideline',
  '10000000-0000-0000-0000-000000000001',
  'human-resources/c0000000-0000-0000-0000-000000000004/hr-intern-performance-rubric.pdf',
  'hr-intern-performance-rubric.pdf',
  1450280,
  'application/pdf',
  'v1.1',
  current_date - interval '5 days',
  true,
  false
),
(
  'c0000000-0000-0000-0000-000000000005',
  'Candidate Structured Interview Evaluation Scorecard',
  'Objective competency-based assessment template for screening research associates and field operations coordinators.',
  'template',
  '10000000-0000-0000-0000-000000000001',
  'human-resources/c0000000-0000-0000-0000-000000000005/candidate-interview-scorecard.docx',
  'candidate-interview-scorecard.docx',
  482912,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'v2.0',
  current_date - interval '30 days',
  true,
  false
),

-- Data Analyst Programme
(
  'c0000000-0000-0000-0000-000000000006',
  'Data Privacy & PII Anonymization Guidelines (DPDP Act)',
  'Mandatory protocols for hashing telephone numbers, masking Aadhaar identifiers, and encrypted dataset exports.',
  'guideline',
  '10000000-0000-0000-0000-000000000002',
  'data-analyst/c0000000-0000-0000-0000-000000000006/data-privacy-pii-guidelines.pdf',
  'data-privacy-pii-guidelines.pdf',
  1984210,
  'application/pdf',
  'v1.0',
  current_date - interval '6 days',
  true,
  false
),

-- Social Research & Policy
(
  'c0000000-0000-0000-0000-000000000007',
  'Field Enumerator Safety & Emergency Response SOP',
  'Protocol for adverse field events, emergency SOS escalations, local community permissions, and primary health clinic coordination.',
  'guideline',
  '10000000-0000-0000-0000-000000000003',
  'social-research-policy/c0000000-0000-0000-0000-000000000007/field-safety-emergency-sop.pdf',
  'field-safety-emergency-sop.pdf',
  2310892,
  'application/pdf',
  'v1.3',
  current_date - interval '12 days',
  true,
  false
),

-- Design & Social Media
(
  'c0000000-0000-0000-0000-000000000008',
  'Ikaai Brand Asset Kit & Logo Usage Guidelines',
  'Master color palette, typography rules, SVG logo assets, and social media layout grids.',
  'guideline',
  '10000000-0000-0000-0000-000000000004',
  'design-social-media/c0000000-0000-0000-0000-000000000008/ikaai-brand-kit-guidelines.pdf',
  'ikaai-brand-kit-guidelines.pdf',
  4210550,
  'application/pdf',
  'v2.1',
  current_date - interval '2 days',
  true,
  false
),

-- Business Development
(
  'c0000000-0000-0000-0000-000000000009',
  'RFP Technical Proposal Master Template & Narrative Blocks',
  'Standard executive summary templates, organizational credibility sheets, and case study briefs for government tenders.',
  'template',
  '10000000-0000-0000-0000-000000000005',
  'business-development/c0000000-0000-0000-0000-000000000009/rfp-technical-proposal-master.docx',
  'rfp-technical-proposal-master.docx',
  912380,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'v1.0',
  current_date - interval '9 days',
  true,
  false
),

-- Draft Document (Visible only to Admin & Instructor)
(
  'c0000000-0000-0000-0000-000000000010',
  'Upcoming 2027 Fellowship Programme Proposal (Draft)',
  'Confidential internal working draft outlining fellowship stipends, mentor allocations, and cohort expansion targets.',
  'report',
  null,
  'all-programmes/c0000000-0000-0000-0000-000000000010/2027-fellowship-expansion-draft.pdf',
  '2027-fellowship-expansion-draft.pdf',
  3105000,
  'application/pdf',
  'v0.5',
  current_date,
  false,
  false
)
on conflict (id) do nothing;

