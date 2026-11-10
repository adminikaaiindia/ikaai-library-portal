# Missing Course Resource Files (Upload Checklist)

The following course resource files are referenced in the curriculum modules across the 5 programmes but do not yet exist as physical binary files in the repository. In the database, their corresponding rows in `public.resources` have been created with `storage_path = NULL` so they display properly in the UI.

Once these files are prepared, upload them to the private Supabase Storage bucket **`course-files`** and update the `storage_path` column in `public.resources`.

---

## 1. Human Resources Programme
| Module | Resource Title | Target Storage Path | Expected File Type |
| :--- | :--- | :--- | :--- |
| Module 0 | 0.1 New Joiner Checklist | `hr/mod_0/new_joiner_checklist.pdf` | PDF Document |
| Module 0 | 0.2 Onboarding Presentation | `hr/mod_0/onboarding_presentation.pptx` | Presentation |
| Module 0 | 0.3 Recruitment Intern Handbook | `hr/mod_0/recruitment_handbook.pdf` | PDF Document |
| Module 0 | 0.4 Weekly Report Template | `hr/mod_0/weekly_report_template.docx` | Word Document |
| Module 0 | 0.5 Setting Up Your Ikaai Email | `hr/mod_0/email_setup_guide.pdf` | PDF Document |
| Module 0 | 0.6 Phishing Prevention & Workspace Security | `hr/mod_0/phishing_security.pdf` | PDF Document |
| Module 0 | 0.7 Official Email Signature Guidelines | `hr/mod_0/email_signature_guidelines.pdf` | PDF Document |
| Module 0 | 0.8 Employer Branding & Corporate Persona | `hr/mod_0/employer_branding.pdf` | PDF Document |
| Module 1 | 1.1 Ikaai Vision, Mission & Values | `hr/mod_1/vision_mission_values.pdf` | PDF Document |
| Module 1 | 1.2 Organisational Structure & Departments | `hr/mod_1/org_structure.pdf` | PDF Document |
| Module 1 | 1.3 Communication Hierarchy & Protocols | `hr/mod_1/comm_protocols.pdf` | PDF Document |
| Module 1 | 1.4 Code of Conduct & Workplace Ethics | `hr/mod_1/code_of_conduct.pdf` | PDF Document |
| Module 1 | 1.5 Leave, Attendance & Working Hours Policy | `hr/mod_1/leave_policy.pdf` | PDF Document |
| Module 1 | 1.6 POSH & Non-Discrimination Policies | `hr/mod_1/posh_policy.pdf` | PDF Document |
| Module 1 | 1.7 Health, Safety & Emergency Procedures | `hr/mod_1/health_safety.pdf` | PDF Document |
| Module 2 | 2.1 Overview of All Job Roles at Ikaai | `hr/mod_2/job_roles_overview.pdf` | PDF Document |
| Module 2 | 2.2 Sourcing Channels & Screening Matrices | `hr/mod_2/screening_matrices.xlsx` | Spreadsheet |
| Module 2 | 2.3 Interview Assessment Form | `hr/mod_2/interview_assessment.docx` | Word Document |
| Module 3 | 3.1 CSR Partnership Ecosystem Overview | `hr/mod_3/csr_ecosystem.pdf` | PDF Document |
| Module 3 | 3.2 Technical Proposal Writing Guidelines | `hr/mod_3/technical_proposal_guide.pdf` | PDF Document |
| Module 3 | 3.3 Commercial Budgeting & Cost Framework | `hr/mod_3/budgeting_framework.xlsx` | Spreadsheet |
| Module 4 | 4.1 End-to-End Talent Sourcing Playbook | `hr/mod_4/talent_sourcing_playbook.pdf` | PDF Document |
| Module 4 | 4.2 Onboarding Operations & Documentation | `hr/mod_4/onboarding_operations.pdf` | PDF Document |
| Module 5 | 5.1 Project Management & Milestone Governance | `hr/mod_5/project_management.pdf` | PDF Document |
| Module 5 | 5.2 Strategic Advisory & Client Engagement | `hr/mod_5/strategic_advisory.pdf` | PDF Document |

---

## 2. Data Analyst Programme
| Module | Resource Title | Target Storage Path | Expected File Type |
| :--- | :--- | :--- | :--- |
| Module 0 | Analytics Toolstack Architecture | `data/mod_0/analytics_toolstack.pdf` | PDF Document |
| Module 0 | Data Privacy & DPDP Compliance Guide | `data/mod_0/data_privacy_guide.pdf` | PDF Document |
| Module 1 | Survey Data Cleaning Pipelines (Python/Pandas) | `data/mod_1/data_cleaning_guide.pdf` | PDF Document |
| Module 2 | Quantitative Analysis & Sampling Weights (R/SPSS) | `data/mod_2/sampling_weights.pdf` | PDF Document |
| Module 3 | Executive Dashboard Design Standards in Power BI | `data/mod_3/powerbi_standards.pdf` | PDF Document |
| Module 4 | Field Data Audits & Enumerator Diagnostics | `data/mod_4/field_audits.pdf` | PDF Document |
| Module 5 | Strategic Reporting & Stakeholder Presentation | `data/mod_5/stakeholder_reporting.pdf` | PDF Document |

---

## 3. Social Research & Policy Programme
| Module | Resource Title | Target Storage Path | Expected File Type |
| :--- | :--- | :--- | :--- |
| Module 0 | Ikaai Research Ethics Charter & IRB Protocols | `research/mod_0/research_ethics_charter.pdf` | PDF Document |
| Module 1 | Sampling Methodologies for Grassroots Evaluations | `research/mod_1/sampling_methodology.pdf` | PDF Document |
| Module 2 | CAPI Tool Design: SurveyCTO & KoboToolbox Standards | `research/mod_2/capi_standards.pdf` | PDF Document |
| Module 3 | High-Frequency Field Monitoring & Back-Checks | `research/mod_3/field_monitoring.pdf` | PDF Document |
| Module 4 | Thematic Coding & Qualitative Frameworks (NVivo) | `research/mod_4/qualitative_framework.pdf` | PDF Document |
| Module 5 | Policy Brief Drafting & Dissemination Protocols | `research/mod_5/policy_brief_drafting.pdf` | PDF Document |

---

## 4. Design & Social Media Programme
| Module | Resource Title | Target Storage Path | Expected File Type |
| :--- | :--- | :--- | :--- |
| Module 0 | Official Ikaai Brand Book & Style Guidelines | `design/mod_0/brand_book.pdf` | PDF Document |
| Module 1 | Report Design, Typography & Grid Systems | `design/mod_1/report_design_grids.pdf` | PDF Document |
| Module 2 | Social Data Infographic Best Practices | `design/mod_2/infographic_guidelines.pdf` | PDF Document |
| Module 3 | Digital Advocacy & Content Calendar Architecture | `design/mod_3/content_strategy.pdf` | PDF Document |
| Module 4 | Multimedia Production Standards for Development Sector | `design/mod_4/multimedia_standards.pdf` | PDF Document |
| Module 5 | Social Campaign Performance Measurement | `design/mod_5/campaign_analytics.pdf` | PDF Document |

---

## 5. Business Development Programme
| Module | Resource Title | Target Storage Path | Expected File Type |
| :--- | :--- | :--- | :--- |
| Module 0 | India Development & Consulting Landscape Overview | `bd/mod_0/consulting_landscape.pdf` | PDF Document |
| Module 1 | Public Tender Portals: GeM & CPP Navigation Guide | `bd/mod_1/gem_navigation.pdf` | PDF Document |
| Module 2 | Winning RFP Technical Proposal Frameworks | `bd/mod_2/rfp_proposal_framework.pdf` | PDF Document |
| Module 3 | Survey Budget Modeling & Field Cost Templates | `bd/mod_3/field_cost_templates.xlsx` | Spreadsheet |
| Module 4 | High-Stakes Institutional Pitch Deck Standards | `bd/mod_4/pitch_deck_standards.pdf` | PDF Document |
| Module 5 | Partner Lifecycle Management & Institutional Retention | `bd/mod_5/partner_lifecycle.pdf` | PDF Document |

---

## Job Descriptions (Available on Disk)
All 11 job descriptions exist in the `JD/` directory and are ready for storage upload to `job-descriptions`:
1. `Data Analyst Intern JD.docx`
2. `HR Intern JD_Ikaai.docx`
3. `JD_Associate- Partnerships and Business Development.docx`
4. `JD_HR and Admin.docx`
5. `JD_Research Assistant.docx`
6. `JD_Research Associate.docx`
7. `JD_Research Executive.docx`
8. `JD_Research Trainee.docx`
9. `JD_Sr. Research Associate.docx`
10. `Research Intern JD-.docx`
11. `Social Media cum Graphic Design Intern JD.docx`

