-- ==========================================================================
-- MIGRATION: 20261104_04_set_storage_paths.sql
-- Set predictable storage_path for all 53 course resources
-- Target Bucket: course-files
-- Safe to run on existing database (does not drop or delete any data)
-- ==========================================================================

begin;

-- Human Resources | Module 0 | 0.1 New Joiner Checklist
update public.resources
set storage_path = 'human-resources/module-0/0.1-new-joiner-checklist.docx',
    type = 'document'
where id = '30000000-0000-0000-0000-000000000001';

-- Human Resources | Module 0 | 0.2 Onboarding Presentation
update public.resources
set storage_path = 'human-resources/module-0/0.2-onboarding-presentation.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000002';

-- Human Resources | Module 0 | 0.3 Recruitment Intern Handbook
update public.resources
set storage_path = 'human-resources/module-0/0.3-recruitment-intern-handbook.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000003';

-- Human Resources | Module 0 | 0.4 Weekly Report Template
update public.resources
set storage_path = 'human-resources/module-0/0.4-weekly-report-template.docx',
    type = 'document'
where id = '30000000-0000-0000-0000-000000000004';

-- Human Resources | Module 0 | 0.5 Setting Up Your Ikaai Email
update public.resources
set storage_path = 'human-resources/module-0/0.5-setting-up-ikaai-email.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000005';

-- Human Resources | Module 0 | 0.6 Phishing Prevention – Required Reading
update public.resources
set storage_path = 'human-resources/module-0/0.6-phishing-prevention-reading.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000006';

-- Human Resources | Module 0 | 0.7 Your Email Signature
update public.resources
set storage_path = 'human-resources/module-0/0.7-email-signature-guide.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000007';

-- Human Resources | Module 0 | 0.8 Employer Branding – Corporate Background Meeting Image
update public.resources
set storage_path = 'human-resources/module-0/0.8-employer-branding-background.png',
    type = 'image'
where id = '30000000-0000-0000-0000-000000000008';

-- Human Resources | Module 1 | 1.1 Our Journey & Growth
update public.resources
set storage_path = 'human-resources/module-1/1.1-our-journey-and-growth.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000009';

-- Human Resources | Module 1 | 1.2 Organisation Chart
update public.resources
set storage_path = 'human-resources/module-1/1.2-organisation-chart.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000010';

-- Human Resources | Module 1 | 1.3 Ikaai Foundation's Mission & Values
update public.resources
set storage_path = 'human-resources/module-1/1.3-mission-and-values.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000011';

-- Human Resources | Module 1 | 1.4 Research & Social Impact Framework
update public.resources
set storage_path = 'human-resources/module-1/1.4-social-impact-framework.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000012';

-- Human Resources | Module 1 | 1.5 Code of Conduct & Ethics
update public.resources
set storage_path = 'human-resources/module-1/1.5-code-of-conduct-ethics.docx',
    type = 'document'
where id = '30000000-0000-0000-0000-000000000013';

-- Human Resources | Module 1 | 1.6 Community Engagement Principles
update public.resources
set storage_path = 'human-resources/module-1/1.6-community-engagement-principles.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000014';

-- Human Resources | Module 1 | 1.7 Communication Norms & Slack Guide
update public.resources
set storage_path = 'human-resources/module-1/1.7-communication-norms-guide.docx',
    type = 'document'
where id = '30000000-0000-0000-0000-000000000015';

-- Human Resources | Module 2 | 2.1 Roles & Requirements
update public.resources
set storage_path = 'human-resources/module-2/2.1-roles-and-requirements.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000016';

-- Human Resources | Module 2 | 2.2 Field Research Associate Guidelines
update public.resources
set storage_path = 'human-resources/module-2/2.2-field-research-guidelines.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000017';

-- Human Resources | Module 2 | 2.3 Project Monitoring & Evaluation Specialist
update public.resources
set storage_path = 'human-resources/module-2/2.3-monitoring-evaluation-specialist.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000018';

-- Human Resources | Module 3 | 3.1 Job Description: B. Development Intern
update public.resources
set storage_path = 'human-resources/module-3/3.1-jd-business-development-intern.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000019';

-- Human Resources | Module 3 | 3.2 Shortlisting Email B. Development Intern
update public.resources
set storage_path = 'human-resources/module-3/3.2-shortlisting-email-template.docx',
    type = 'document'
where id = '30000000-0000-0000-0000-000000000020';

-- Human Resources | Module 3 | 3.3 Acceptance Email B. Development Intern
update public.resources
set storage_path = 'human-resources/module-3/3.3-acceptance-email-template.docx',
    type = 'document'
where id = '30000000-0000-0000-0000-000000000021';

-- Human Resources | Module 3 | 3.4 Follow-Up Email B. Development Intern
update public.resources
set storage_path = 'human-resources/module-3/3.4-follow-up-email-template.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000022';

-- Human Resources | Module 3 | 3.5 Official LinkedIn Image Recruitment
update public.resources
set storage_path = 'human-resources/module-3/3.5-linkedin-recruitment-asset.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000023';

-- Human Resources | Module 3 | 3.6 Rejection Email Template B. Development Intern
update public.resources
set storage_path = 'human-resources/module-3/3.6-rejection-email-template.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000024';

-- Human Resources | Module 4 | 4.1 Step-by-Step Guide to Posting a Job Ad
update public.resources
set storage_path = 'human-resources/module-4/4.1-guide-to-posting-job-ad.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000025';

-- Human Resources | Module 4 | 4.2 Recruitment Workflow
update public.resources
set storage_path = 'human-resources/module-4/4.2-recruitment-workflow.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000026';

-- Human Resources | Module 5 | 5.1 Job Description: Project Manager
update public.resources
set storage_path = 'human-resources/module-5/5.1-jd-project-manager.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000027';

-- Human Resources | Module 5 | 5.2 Job Description: Strategic Advisor
update public.resources
set storage_path = 'human-resources/module-5/5.2-jd-strategic-advisor.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000028';

-- Data Analyst | Module 0 | 0.1 Data Analyst Setup & Environment Guide
update public.resources
set storage_path = 'data-analyst/module-0/0.1-data-analyst-setup-guide.docx',
    type = 'document'
where id = '30000000-0000-0000-0000-000000000029';

-- Data Analyst | Module 0 | 0.2 Ikaai Data Dictionary & Schema Template
update public.resources
set storage_path = 'data-analyst/module-0/0.2-data-dictionary-schema.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000030';

-- Data Analyst | Module 1 | 1.1 The Comprehensive Data Cleaning SOP
update public.resources
set storage_path = 'data-analyst/module-1/1.1-data-cleaning-sop.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000031';

-- Data Analyst | Module 2 | 2.1 Econometric Evaluation Methodology Guide
update public.resources
set storage_path = 'data-analyst/module-2/2.1-econometric-evaluation-guide.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000032';

-- Data Analyst | Module 3 | 3.1 Power BI Architecture for Development Sector
update public.resources
set storage_path = 'data-analyst/module-3/3.1-power-bi-architecture.docx',
    type = 'document'
where id = '30000000-0000-0000-0000-000000000033';

-- Data Analyst | Module 4 | 4.1 High-Frequency Check (HFC) Protocol
update public.resources
set storage_path = 'data-analyst/module-4/4.1-high-frequency-check-protocol.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000034';

-- Data Analyst | Module 5 | 5.1 Visual Data Storytelling for Public Policy
update public.resources
set storage_path = 'data-analyst/module-5/5.1-visual-data-storytelling.pptx',
    type = 'presentation'
where id = '30000000-0000-0000-0000-000000000035';

-- Social Research & Policy | Module 0 | 0.1 Ikaai Research Ethics & Safeguarding Manual
update public.resources
set storage_path = 'social-research-policy/module-0/0.1-research-ethics-manual.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000036';

-- Social Research & Policy | Module 1 | 1.1 Sample Design & Statistical Power Handbook
update public.resources
set storage_path = 'social-research-policy/module-1/1.1-sample-design-handbook.docx',
    type = 'document'
where id = '30000000-0000-0000-0000-000000000037';

-- Social Research & Policy | Module 2 | 2.1 Advanced XLSForm Programming Guide
update public.resources
set storage_path = 'social-research-policy/module-2/2.1-xlsform-programming-guide.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000038';

-- Social Research & Policy | Module 3 | 3.1 Field Team Operations & Supervision SOP
update public.resources
set storage_path = 'social-research-policy/module-3/3.1-field-operations-sop.docx',
    type = 'document'
where id = '30000000-0000-0000-0000-000000000039';

-- Social Research & Policy | Module 4 | 4.1 Qualitative Research Framework & Coding Guide
update public.resources
set storage_path = 'social-research-policy/module-4/4.1-qualitative-research-framework.pptx',
    type = 'presentation'
where id = '30000000-0000-0000-0000-000000000040';

-- Social Research & Policy | Module 5 | 5.1 Writing Policy Briefs That Drive Action
update public.resources
set storage_path = 'social-research-policy/module-5/5.1-writing-policy-briefs.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000041';

-- Design & Social Media | Module 0 | 0.1 Ikaai Institutional Brand Styleguide 2026
update public.resources
set storage_path = 'design-social-media/module-0/0.1-brand-styleguide-2026.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000042';

-- Design & Social Media | Module 1 | 1.1 Editorial Design Manual for Development Reports
update public.resources
set storage_path = 'design-social-media/module-1/1.1-editorial-design-manual.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000043';

-- Design & Social Media | Module 2 | 2.1 Infographic Design Principles for Social Evidence
update public.resources
set storage_path = 'design-social-media/module-2/2.1-infographic-design-principles.pptx',
    type = 'presentation'
where id = '30000000-0000-0000-0000-000000000044';

-- Design & Social Media | Module 3 | 3.1 The Ikaai LinkedIn Playbook for Policy Think Tanks
update public.resources
set storage_path = 'design-social-media/module-3/3.1-linkedin-playbook.docx',
    type = 'document'
where id = '30000000-0000-0000-0000-000000000045';

-- Design & Social Media | Module 4 | 4.1 Video Production SOP for Field Research
update public.resources
set storage_path = 'design-social-media/module-4/4.1-video-production-sop.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000046';

-- Design & Social Media | Module 5 | 5.1 Digital Campaign Measurement Framework
update public.resources
set storage_path = 'design-social-media/module-5/5.1-campaign-measurement-framework.docx',
    type = 'document'
where id = '30000000-0000-0000-0000-000000000047';

-- Business Development | Module 0 | 0.1 Ikaai Corporate Profile & Capability Deck
update public.resources
set storage_path = 'business-development/module-0/0.1-corporate-profile-deck.pptx',
    type = 'presentation'
where id = '30000000-0000-0000-0000-000000000048';

-- Business Development | Module 1 | 1.1 The Opportunity Qualification SOP
update public.resources
set storage_path = 'business-development/module-1/1.1-opportunity-qualification-sop.docx',
    type = 'document'
where id = '30000000-0000-0000-0000-000000000049';

-- Business Development | Module 2 | 2.1 Technical Proposal Blueprint & Master Templates
update public.resources
set storage_path = 'business-development/module-2/2.1-technical-proposal-blueprint.pdf',
    type = 'pdf'
where id = '30000000-0000-0000-0000-000000000050';

-- Business Development | Module 3 | 3.1 Consulting Financial Costing Model & Guidelines
update public.resources
set storage_path = 'business-development/module-3/3.1-financial-costing-model.docx',
    type = 'document'
where id = '30000000-0000-0000-0000-000000000051';

-- Business Development | Module 4 | 4.1 The Art of the Development Pitch Deck
update public.resources
set storage_path = 'business-development/module-4/4.1-development-pitch-deck.pptx',
    type = 'presentation'
where id = '30000000-0000-0000-0000-000000000052';

-- Business Development | Module 5 | 5.1 Key Account Management Playbook
update public.resources
set storage_path = 'business-development/module-5/5.1-key-account-playbook.docx',
    type = 'document'
where id = '30000000-0000-0000-0000-000000000053';

commit;
