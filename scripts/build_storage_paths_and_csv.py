import csv

# Full list of 53 resources with exact metadata
RESOURCES = [
    # Human Resources (Programme 1)
    {
        "id": "30000000-0000-0000-0000-000000000001",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "0. Onboarding & Digital Workspace",
        "module_num": 0,
        "res_num": "0.1",
        "title": "0.1 New Joiner Checklist",
        "type": "document",
        "slug": "new-joiner-checklist",
        "ext": ".docx"
    },
    {
        "id": "30000000-0000-0000-0000-000000000002",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "0. Onboarding & Digital Workspace",
        "module_num": 0,
        "res_num": "0.2",
        "title": "0.2 Onboarding Presentation",
        "type": "pdf",
        "slug": "onboarding-presentation",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000003",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "0. Onboarding & Digital Workspace",
        "module_num": 0,
        "res_num": "0.3",
        "title": "0.3 Recruitment Intern Handbook",
        "type": "pdf",
        "slug": "recruitment-intern-handbook",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000004",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "0. Onboarding & Digital Workspace",
        "module_num": 0,
        "res_num": "0.4",
        "title": "0.4 Weekly Report Template",
        "type": "document",
        "slug": "weekly-report-template",
        "ext": ".docx"
    },
    {
        "id": "30000000-0000-0000-0000-000000000005",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "0. Onboarding & Digital Workspace",
        "module_num": 0,
        "res_num": "0.5",
        "title": "0.5 Setting Up Your Ikaai Email",
        "type": "pdf",
        "slug": "setting-up-ikaai-email",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000006",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "0. Onboarding & Digital Workspace",
        "module_num": 0,
        "res_num": "0.6",
        "title": "0.6 Phishing Prevention – Required Reading",
        "type": "pdf",
        "slug": "phishing-prevention-reading",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000007",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "0. Onboarding & Digital Workspace",
        "module_num": 0,
        "res_num": "0.7",
        "title": "0.7 Your Email Signature",
        "type": "pdf",
        "slug": "email-signature-guide",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000008",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "0. Onboarding & Digital Workspace",
        "module_num": 0,
        "res_num": "0.8",
        "title": "0.8 Employer Branding – Corporate Background Meeting Image",
        "type": "image",
        "slug": "employer-branding-background",
        "ext": ".png"
    },
    {
        "id": "30000000-0000-0000-0000-000000000009",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "1. Company Overview & Culture",
        "module_num": 1,
        "res_num": "1.1",
        "title": "1.1 Our Journey & Growth",
        "type": "pdf",
        "slug": "our-journey-and-growth",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000010",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "1. Company Overview & Culture",
        "module_num": 1,
        "res_num": "1.2",
        "title": "1.2 Organisation Chart",
        "type": "pdf",
        "slug": "organisation-chart",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000011",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "1. Company Overview & Culture",
        "module_num": 1,
        "res_num": "1.3",
        "title": "1.3 Ikaai Foundation's Mission & Values",
        "type": "pdf",
        "slug": "mission-and-values",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000012",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "1. Company Overview & Culture",
        "module_num": 1,
        "res_num": "1.4",
        "title": "1.4 Research & Social Impact Framework",
        "type": "pdf",
        "slug": "social-impact-framework",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000013",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "1. Company Overview & Culture",
        "module_num": 1,
        "res_num": "1.5",
        "title": "1.5 Code of Conduct & Ethics",
        "type": "document",
        "slug": "code-of-conduct-ethics",
        "ext": ".docx"
    },
    {
        "id": "30000000-0000-0000-0000-000000000014",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "1. Company Overview & Culture",
        "module_num": 1,
        "res_num": "1.6",
        "title": "1.6 Community Engagement Principles",
        "type": "pdf",
        "slug": "community-engagement-principles",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000015",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "1. Company Overview & Culture",
        "module_num": 1,
        "res_num": "1.7",
        "title": "1.7 Communication Norms & Slack Guide",
        "type": "document",
        "slug": "communication-norms-guide",
        "ext": ".docx"
    },
    {
        "id": "30000000-0000-0000-0000-000000000016",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "2. Understanding Ikaai Roles & Profiles",
        "module_num": 2,
        "res_num": "2.1",
        "title": "2.1 Roles & Requirements",
        "type": "pdf",
        "slug": "roles-and-requirements",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000017",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "2. Understanding Ikaai Roles & Profiles",
        "module_num": 2,
        "res_num": "2.2",
        "title": "2.2 Field Research Associate Guidelines",
        "type": "pdf",
        "slug": "field-research-guidelines",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000018",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "2. Understanding Ikaai Roles & Profiles",
        "module_num": 2,
        "res_num": "2.3",
        "title": "2.3 Project Monitoring & Evaluation Specialist",
        "type": "pdf",
        "slug": "monitoring-evaluation-specialist",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000019",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "3. Business Development Roles",
        "module_num": 3,
        "res_num": "3.1",
        "title": "3.1 Job Description: B. Development Intern",
        "type": "pdf",
        "slug": "jd-business-development-intern",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000020",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "3. Business Development Roles",
        "module_num": 3,
        "res_num": "3.2",
        "title": "3.2 Shortlisting Email B. Development Intern",
        "type": "document",
        "slug": "shortlisting-email-template",
        "ext": ".docx"
    },
    {
        "id": "30000000-0000-0000-0000-000000000021",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "3. Business Development Roles",
        "module_num": 3,
        "res_num": "3.3",
        "title": "3.3 Acceptance Email B. Development Intern",
        "type": "document",
        "slug": "acceptance-email-template",
        "ext": ".docx"
    },
    {
        "id": "30000000-0000-0000-0000-000000000022",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "3. Business Development Roles",
        "module_num": 3,
        "res_num": "3.4",
        "title": "3.4 Follow-Up Email B. Development Intern",
        "type": "pdf",
        "slug": "follow-up-email-template",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000023",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "3. Business Development Roles",
        "module_num": 3,
        "res_num": "3.5",
        "title": "3.5 Official LinkedIn Image Recruitment",
        "type": "pdf",
        "slug": "linkedin-recruitment-asset",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000024",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "3. Business Development Roles",
        "module_num": 3,
        "res_num": "3.6",
        "title": "3.6 Rejection Email Template B. Development Intern",
        "type": "pdf",
        "slug": "rejection-email-template",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000025",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "4. Recruitment Intern & Talent Acquisition",
        "module_num": 4,
        "res_num": "4.1",
        "title": "4.1 Step-by-Step Guide to Posting a Job Ad",
        "type": "pdf",
        "slug": "guide-to-posting-job-ad",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000026",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "4. Recruitment Intern & Talent Acquisition",
        "module_num": 4,
        "res_num": "4.2",
        "title": "4.2 Recruitment Workflow",
        "type": "pdf",
        "slug": "recruitment-workflow",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000027",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "5. Project Manager & Strategic Advisor",
        "module_num": 5,
        "res_num": "5.1",
        "title": "5.1 Job Description: Project Manager",
        "type": "pdf",
        "slug": "jd-project-manager",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000028",
        "programme": "Human Resources",
        "programme_slug": "human-resources",
        "module": "5. Project Manager & Strategic Advisor",
        "module_num": 5,
        "res_num": "5.2",
        "title": "5.2 Job Description: Strategic Advisor",
        "type": "pdf",
        "slug": "jd-strategic-advisor",
        "ext": ".pdf"
    },

    # Data Analyst (Programme 2)
    {
        "id": "30000000-0000-0000-0000-000000000029",
        "programme": "Data Analyst",
        "programme_slug": "data-analyst",
        "module": "0. Analytics Toolstack & Data Governance",
        "module_num": 0,
        "res_num": "0.1",
        "title": "0.1 Data Analyst Setup & Environment Guide",
        "type": "document",
        "slug": "data-analyst-setup-guide",
        "ext": ".docx"
    },
    {
        "id": "30000000-0000-0000-0000-000000000030",
        "programme": "Data Analyst",
        "programme_slug": "data-analyst",
        "module": "0. Analytics Toolstack & Data Governance",
        "module_num": 0,
        "res_num": "0.2",
        "title": "0.2 Ikaai Data Dictionary & Schema Template",
        "type": "pdf",
        "slug": "data-dictionary-schema",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000031",
        "programme": "Data Analyst",
        "programme_slug": "data-analyst",
        "module": "1. Data Cleaning & Validation with Python",
        "module_num": 1,
        "res_num": "1.1",
        "title": "1.1 The Comprehensive Data Cleaning SOP",
        "type": "pdf",
        "slug": "data-cleaning-sop",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000032",
        "programme": "Data Analyst",
        "programme_slug": "data-analyst",
        "module": "2. Statistical Modeling & Econometric Analysis",
        "module_num": 2,
        "res_num": "2.1",
        "title": "2.1 Econometric Evaluation Methodology Guide",
        "type": "pdf",
        "slug": "econometric-evaluation-guide",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000033",
        "programme": "Data Analyst",
        "programme_slug": "data-analyst",
        "module": "3. Power BI & Interactive Dashboards",
        "module_num": 3,
        "res_num": "3.1",
        "title": "3.1 Power BI Architecture for Development Sector",
        "type": "document",
        "slug": "power-bi-architecture",
        "ext": ".docx"
    },
    {
        "id": "30000000-0000-0000-0000-000000000034",
        "programme": "Data Analyst",
        "programme_slug": "data-analyst",
        "module": "4. Field Survey Data Processing (ODK / KoboToolbox)",
        "module_num": 4,
        "res_num": "4.1",
        "title": "4.1 High-Frequency Check (HFC) Protocol",
        "type": "pdf",
        "slug": "high-frequency-check-protocol",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000035",
        "programme": "Data Analyst",
        "programme_slug": "data-analyst",
        "module": "5. Executive Reporting & Visual Evidence",
        "module_num": 5,
        "res_num": "5.1",
        "title": "5.1 Visual Data Storytelling for Public Policy",
        "type": "presentation",
        "slug": "visual-data-storytelling",
        "ext": ".pptx"
    },

    # Social Research & Policy (Programme 3)
    {
        "id": "30000000-0000-0000-0000-000000000036",
        "programme": "Social Research & Policy",
        "programme_slug": "social-research-policy",
        "module": "0. Research Ethics, PII & Field Safeguarding",
        "module_num": 0,
        "res_num": "0.1",
        "title": "0.1 Ikaai Research Ethics & Safeguarding Manual",
        "type": "pdf",
        "slug": "research-ethics-manual",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000037",
        "programme": "Social Research & Policy",
        "programme_slug": "social-research-policy",
        "module": "1. Quantitative Survey Design & Sampling Protocols",
        "module_num": 1,
        "res_num": "1.1",
        "title": "1.1 Sample Design & Statistical Power Handbook",
        "type": "document",
        "slug": "sample-design-handbook",
        "ext": ".docx"
    },
    {
        "id": "30000000-0000-0000-0000-000000000038",
        "programme": "Social Research & Policy",
        "programme_slug": "social-research-policy",
        "module": "2. Digital Survey Engineering (XLSForm / Kobo)",
        "module_num": 2,
        "res_num": "2.1",
        "title": "2.1 Advanced XLSForm Programming Guide",
        "type": "pdf",
        "slug": "xlsform-programming-guide",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000039",
        "programme": "Social Research & Policy",
        "programme_slug": "social-research-policy",
        "module": "3. Fieldwork Operations & Investigator Supervision",
        "module_num": 3,
        "res_num": "3.1",
        "title": "3.1 Field Team Operations & Supervision SOP",
        "type": "document",
        "slug": "field-operations-sop",
        "ext": ".docx"
    },
    {
        "id": "30000000-0000-0000-0000-000000000040",
        "programme": "Social Research & Policy",
        "programme_slug": "social-research-policy",
        "module": "4. Qualitative Inquiry (FGDs, KIIs & Thematic Coding)",
        "module_num": 4,
        "res_num": "4.1",
        "title": "4.1 Qualitative Research Framework & Coding Guide",
        "type": "presentation",
        "slug": "qualitative-research-framework",
        "ext": ".pptx"
    },
    {
        "id": "30000000-0000-0000-0000-000000000041",
        "programme": "Social Research & Policy",
        "programme_slug": "social-research-policy",
        "module": "5. Policy Brief Drafting & Executive Translation",
        "module_num": 5,
        "res_num": "5.1",
        "title": "5.1 Writing Policy Briefs That Drive Action",
        "type": "pdf",
        "slug": "writing-policy-briefs",
        "ext": ".pdf"
    },

    # Design & Social Media (Programme 4)
    {
        "id": "30000000-0000-0000-0000-000000000042",
        "programme": "Design & Social Media",
        "programme_slug": "design-social-media",
        "module": "0. Brand Identity & Visual Design Standards",
        "module_num": 0,
        "res_num": "0.1",
        "title": "0.1 Ikaai Institutional Brand Styleguide 2026",
        "type": "pdf",
        "slug": "brand-styleguide-2026",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000043",
        "programme": "Design & Social Media",
        "programme_slug": "design-social-media",
        "module": "1. Editorial Design for Impact & Policy Reports",
        "module_num": 1,
        "res_num": "1.1",
        "title": "1.1 Editorial Design Manual for Development Reports",
        "type": "pdf",
        "slug": "editorial-design-manual",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000044",
        "programme": "Design & Social Media",
        "programme_slug": "design-social-media",
        "module": "2. Social Evidence Infographics & Data Visualization",
        "module_num": 2,
        "res_num": "2.1",
        "title": "2.1 Infographic Design Principles for Social Evidence",
        "type": "presentation",
        "slug": "infographic-design-principles",
        "ext": ".pptx"
    },
    {
        "id": "30000000-0000-0000-0000-000000000045",
        "programme": "Design & Social Media",
        "programme_slug": "design-social-media",
        "module": "3. LinkedIn & Thought Leadership Strategy",
        "module_num": 3,
        "res_num": "3.1",
        "title": "3.1 The Ikaai LinkedIn Playbook for Policy Think Tanks",
        "type": "document",
        "slug": "linkedin-playbook",
        "ext": ".docx"
    },
    {
        "id": "30000000-0000-0000-0000-000000000046",
        "programme": "Design & Social Media",
        "programme_slug": "design-social-media",
        "module": "4. Video & Audio Storytelling for Field Research",
        "module_num": 4,
        "res_num": "4.1",
        "title": "4.1 Video Production SOP for Field Research",
        "type": "pdf",
        "slug": "video-production-sop",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000047",
        "programme": "Design & Social Media",
        "programme_slug": "design-social-media",
        "module": "5. Multi-Channel Campaign Execution & Analytics",
        "module_num": 5,
        "res_num": "5.1",
        "title": "5.1 Digital Campaign Measurement Framework",
        "type": "document",
        "slug": "campaign-measurement-framework",
        "ext": ".docx"
    },

    # Business Development (Programme 5)
    {
        "id": "30000000-0000-0000-0000-000000000048",
        "programme": "Business Development",
        "programme_slug": "business-development",
        "module": "0. The Social Sector Landscape & Ikaai Positioning",
        "module_num": 0,
        "res_num": "0.1",
        "title": "0.1 Ikaai Corporate Profile & Capability Deck",
        "type": "presentation",
        "slug": "corporate-profile-deck",
        "ext": ".pptx"
    },
    {
        "id": "30000000-0000-0000-0000-000000000049",
        "programme": "Business Development",
        "programme_slug": "business-development",
        "module": "1. Opportunity Identification & RFP Sourcing",
        "module_num": 1,
        "res_num": "1.1",
        "title": "1.1 The Opportunity Qualification SOP",
        "type": "document",
        "slug": "opportunity-qualification-sop",
        "ext": ".docx"
    },
    {
        "id": "30000000-0000-0000-0000-000000000050",
        "programme": "Business Development",
        "programme_slug": "business-development",
        "module": "2. Proposal Architecture & Technical Writing",
        "module_num": 2,
        "res_num": "2.1",
        "title": "2.1 Technical Proposal Blueprint & Master Templates",
        "type": "pdf",
        "slug": "technical-proposal-blueprint",
        "ext": ".pdf"
    },
    {
        "id": "30000000-0000-0000-0000-000000000051",
        "programme": "Business Development",
        "programme_slug": "business-development",
        "module": "3. Budgeting & Financial Proposal Modeling",
        "module_num": 3,
        "res_num": "3.1",
        "title": "3.1 Consulting Financial Costing Model & Guidelines",
        "type": "document",
        "slug": "financial-costing-model",
        "ext": ".docx"
    },
    {
        "id": "30000000-0000-0000-0000-000000000052",
        "programme": "Business Development",
        "programme_slug": "business-development",
        "module": "4. Pitching & Institutional Client Presentation",
        "module_num": 4,
        "res_num": "4.1",
        "title": "4.1 The Art of the Development Pitch Deck",
        "type": "presentation",
        "slug": "development-pitch-deck",
        "ext": ".pptx"
    },
    {
        "id": "30000000-0000-0000-0000-000000000053",
        "programme": "Business Development",
        "programme_slug": "business-development",
        "module": "5. Client Relationship & Key Account Management",
        "module_num": 5,
        "res_num": "5.1",
        "title": "5.1 Key Account Management Playbook",
        "type": "document",
        "slug": "key-account-playbook",
        "ext": ".docx"
    }
]

print(f"Total structured resources: {len(RESOURCES)}")

# Compute storage_path for all
for r in RESOURCES:
    r['storage_path'] = f"{r['programme_slug']}/module-{r['module_num']}/{r['res_num']}-{r['slug']}{r['ext']}"

# Write CSV
csv_path = "docs/UPLOAD_CHECKLIST.csv"
fieldnames = [
    "programme",
    "module",
    "resource number",
    "resource title",
    "type",
    "exact file path to upload to in the course-files bucket",
    "uploaded (yes/no)"
]

with open(csv_path, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(fieldnames)
    for r in RESOURCES:
        writer.writerow([
            r["programme"],
            r["module"],
            r["res_num"],
            r["title"],
            r["type"],
            r["storage_path"],
            ""  # empty uploaded column
        ])

print(f"Wrote {csv_path} with {len(RESOURCES)} rows.")

# Write SQL Migration
sql_path = "supabase/migrations/20261104_04_set_storage_paths.sql"
sql_lines = [
    "-- ==========================================================================",
    "-- MIGRATION: 20261104_04_set_storage_paths.sql",
    "-- Set predictable storage_path for all 53 course resources",
    "-- Target Bucket: course-files",
    "-- Safe to run on existing database (does not drop or delete any data)",
    "-- ==========================================================================",
    "",
    "begin;",
    ""
]

for r in RESOURCES:
    # Update both storage_path and type (e.g. for resource 8 where type is image)
    sql_lines.append(f"-- {r['programme']} | Module {r['module_num']} | {r['title']}")
    sql_lines.append(
        f"update public.resources\n"
        f"set storage_path = '{r['storage_path']}',\n"
        f"    type = '{r['type']}'\n"
        f"where id = '{r['id']}';\n"
    )

sql_lines.append("commit;\n")

with open(sql_path, "w", encoding="utf-8") as f:
    f.write("\n".join(sql_lines))

print(f"Wrote {sql_path} with {len(RESOURCES)} updates.")

