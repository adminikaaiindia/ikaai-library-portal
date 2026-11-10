#!/usr/bin/env python3
"""
build_jobs_seed.py
IKAAI ACADEMY – Job Descriptions & Seed Generator

1. Reads every .docx file in the JD folder using mammoth.
2. Converts each document to clean HTML preserving all headings, paragraphs, lists, bold text, and tables.
3. Injects the converted HTML and metadata into supabase/seed.sql using PostgreSQL dollar quoting ($jd$ ... $jd$).
4. Also syncs jd-data.js (the frontend fallback/offline cache) to keep database seeds and frontend offline data perfectly aligned.
"""

import os
import sys
import json
import mammoth

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JD_DIR = os.path.join(ROOT_DIR, 'JD')
SEED_PATH = os.path.join(ROOT_DIR, 'supabase', 'seed.sql')
JD_DATA_JS_PATH = os.path.join(ROOT_DIR, 'jd-data.js')

# Official 11 job descriptions mapping with their exact UUIDs, slugs, categories, and programme associations
JOB_SPECS = [
    {
        'id': '90000000-0000-0000-0000-000000000001',
        'title': 'Data Analyst Intern',
        'slug': 'data-analyst-intern',
        'category': 'Data Analyst',
        'programme_id': '10000000-0000-0000-0000-000000000002',
        'programmes': ['data', 'hr'],
        'docx_file': 'Data Analyst Intern JD.docx',
        'summary': 'Data extraction, statistical modeling, quantitative survey analysis, dataset cleaning, and interactive dashboard visualization for public policy projects.',
        'sort_order': 0
    },
    {
        'id': '90000000-0000-0000-0000-000000000002',
        'title': 'HR Intern',
        'slug': 'hr-intern',
        'category': 'HR & Admin',
        'programme_id': '10000000-0000-0000-0000-000000000001',
        'programmes': ['hr'],
        'docx_file': 'HR Intern JD_Ikaai.docx',
        'summary': 'Talent acquisition coordination, candidate sourcing, internship onboarding, attendance records, and day-to-day HR operational support.',
        'sort_order': 1
    },
    {
        'id': '90000000-0000-0000-0000-000000000003',
        'title': 'HR and Admin',
        'slug': 'hr-and-admin',
        'category': 'HR & Admin',
        'programme_id': '10000000-0000-0000-0000-000000000001',
        'programmes': ['hr'],
        'docx_file': 'JD_HR and Admin.docx',
        'summary': 'Full-cycle recruitment, statutory compliance, HR policy implementation, office facilities management, vendor contracts, and team engagement.',
        'sort_order': 2
    },
    {
        'id': '90000000-0000-0000-0000-000000000004',
        'title': 'Associate – Partnerships and Business Development',
        'slug': 'associate-partnerships-bd',
        'category': 'Business Development',
        'programme_id': '10000000-0000-0000-0000-000000000005',
        'programmes': ['bd', 'hr'],
        'docx_file': 'JD_Associate- Partnerships and Business Development.docx',
        'summary': 'RFP sourcing, institutional proposal drafting, client relationship management, development sector pitching, and consortium building.',
        'sort_order': 3
    },
    {
        'id': '90000000-0000-0000-0000-000000000005',
        'title': 'Research Intern',
        'slug': 'research-intern',
        'category': 'Research',
        'programme_id': '10000000-0000-0000-0000-000000000003',
        'programmes': ['research', 'hr'],
        'docx_file': 'Research Intern JD-.docx',
        'summary': 'Literature reviews, quantitative dataset validation, qualitative interview transcription, field data collation, and policy brief drafting.',
        'sort_order': 4
    },
    {
        'id': '90000000-0000-0000-0000-000000000006',
        'title': 'Research Trainee',
        'slug': 'research-trainee',
        'category': 'Research',
        'programme_id': '10000000-0000-0000-0000-000000000003',
        'programmes': ['research'],
        'docx_file': 'JD_Research Trainee.docx',
        'summary': 'Foundational research methodology training, survey tool testing, primary field data collection, and structured research documentation.',
        'sort_order': 5
    },
    {
        'id': '90000000-0000-0000-0000-000000000007',
        'title': 'Research Assistant',
        'slug': 'research-assistant',
        'category': 'Research',
        'programme_id': '10000000-0000-0000-0000-000000000003',
        'programmes': ['research'],
        'docx_file': 'JD_Research Assistant.docx',
        'summary': '10-15 days field evaluation assignment: household surveys, enumerator coordination, and primary data collection across designated state districts.',
        'sort_order': 6
    },
    {
        'id': '90000000-0000-0000-0000-000000000008',
        'title': 'Research Associate',
        'slug': 'research-associate',
        'category': 'Research',
        'programme_id': '10000000-0000-0000-0000-000000000003',
        'programmes': ['research', 'hr'],
        'docx_file': 'JD_Research Associate.docx',
        'summary': 'Mixed-methods research design, quantitative/qualitative data analysis, field team supervision, client presentations, and evaluation report authorship.',
        'sort_order': 7
    },
    {
        'id': '90000000-0000-0000-0000-000000000009',
        'title': 'Research Executive',
        'slug': 'research-executive',
        'category': 'Research',
        'programme_id': '10000000-0000-0000-0000-000000000003',
        'programmes': ['research'],
        'docx_file': 'JD_Research Executive.docx',
        'summary': 'Project leadership (1-3 yrs experience), field evaluation oversight, donor deliverable management, and technical evaluation report writing.',
        'sort_order': 8
    },
    {
        'id': '90000000-0000-0000-0000-000000000010',
        'title': 'Sr. Research Associate',
        'slug': 'sr-research-associate',
        'category': 'Research',
        'programme_id': '10000000-0000-0000-0000-000000000003',
        'programmes': ['research'],
        'docx_file': 'JD_Sr. Research Associate.docx',
        'summary': 'Senior research leadership (3+ yrs experience): multi-state study design, advanced statistical frameworks, client liaison, and team mentorship.',
        'sort_order': 9
    },
    {
        'id': '90000000-0000-0000-0000-000000000011',
        'title': 'Social Media cum Graphic Design Intern',
        'slug': 'social-media-design-intern',
        'category': 'Social Media & Design',
        'programme_id': '10000000-0000-0000-0000-000000000004',
        'programmes': ['design', 'hr'],
        'docx_file': 'Social Media cum Graphic Design Intern JD.docx',
        'summary': 'Visual identity design, multi-page publication layouts, high-impact LinkedIn carousels, data infographics, and social media outreach.',
        'sort_order': 10
    }
]

def main():
    print(f"Building jobs seed from directory: {JD_DIR}")
    if not os.path.isdir(JD_DIR):
        print(f"Error: JD directory not found at {JD_DIR}")
        sys.exit(1)

    processed_jobs = []
    jds_frontend_data = []
    validation_passed = True

    for spec in JOB_SPECS:
        docx_path = os.path.join(JD_DIR, spec['docx_file'])
        if not os.path.exists(docx_path):
            print(f"Error: File not found: {docx_path}")
            validation_passed = False
            continue

        with open(docx_path, 'rb') as f:
            res = mammoth.convert_to_html(f)
            html_content = res.value

        # Clean unicode artifacts
        html_content = html_content.replace('\ufffd', '–').replace('\xa0', ' ').strip()
        storage_docx_path = f"JD/{spec['docx_file']}"

        # Validation check: None of content_html, summary, category, programme_id, docx_path must be empty/null
        if not html_content:
            print(f"Error: Empty HTML content for {spec['title']}")
            validation_passed = False
        if not spec['summary']:
            print(f"Error: Empty summary for {spec['title']}")
            validation_passed = False
        if not spec['category']:
            print(f"Error: Empty category for {spec['title']}")
            validation_passed = False
        if not spec['programme_id']:
            print(f"Error: Empty programme_id for {spec['title']}")
            validation_passed = False
        if not storage_docx_path:
            print(f"Error: Empty docx_path for {spec['title']}")
            validation_passed = False

        processed_jobs.append({
            **spec,
            'content_html': html_content,
            'docx_path': storage_docx_path,
            'char_len': len(html_content)
        })

        jds_frontend_data.append({
            'id': spec['slug'],
            'title': spec['title'],
            'category': spec['category'],
            'fileName': spec['docx_file'],
            'downloadPath': storage_docx_path,
            'excerpt': spec['summary'],
            'programmes': spec['programmes'],
            'html': html_content
        })

    if not validation_passed or len(processed_jobs) != 11:
        print("Validation failed!")
        sys.exit(1)

    # Print Verification Table
    print("\n" + "="*110)
    print(f"{'#':<3} | {'Job Title':<38} | {'Category':<22} | {'Summary?':<9} | {'HTML Chars':<10} | {'File Name'}")
    print("="*110)
    for j in processed_jobs:
        has_summary = "YES (" + str(len(j['summary'])) + "c)" if j['summary'] else "NO"
        print(f"{j['sort_order']:<3} | {j['title']:<38} | {j['category']:<22} | {has_summary:<9} | {j['char_len']:<10} | {j['docx_file']}")
    print("="*110)

    # 1. Update seed.sql
    sql_chunks = [
        "-- -----------------------------------------------------",
        "-- 3. JOBS (11 Official Role Specifications)",
        "-- Converted directly from .docx with complete HTML",
        "-- -----------------------------------------------------",
        "alter table public.jobs add column if not exists summary text;\n"
    ]

    for j in processed_jobs:
        stmt = f"""insert into public.jobs (id, title, slug, category, programme_id, summary, content_html, docx_path, sort_order)
values (
  '{j['id']}',
  '{j['title']}',
  '{j['slug']}',
  '{j['category']}',
  '{j['programme_id']}',
  $sum${j['summary']}$sum$,
  $jd${j['content_html']}$jd$,
  '{j['docx_path']}',
  {j['sort_order']}
)
on conflict (slug) do update set
  title = excluded.title,
  category = excluded.category,
  programme_id = excluded.programme_id,
  summary = excluded.summary,
  content_html = excluded.content_html,
  docx_path = excluded.docx_path,
  sort_order = excluded.sort_order;
"""
        sql_chunks.append(stmt)

    new_jobs_sql = "\n".join(sql_chunks).strip() + "\n"

    with open(SEED_PATH, 'r', encoding='utf-8') as f:
        seed_content = f.read()

    marker = "-- 3. JOBS"
    if marker in seed_content:
        jobs_start_idx = seed_content.index(marker)
        prev_divider = seed_content.rfind("-- -----------------------------------------------------", 0, jobs_start_idx)
        if prev_divider != -1:
            jobs_start_idx = prev_divider
    else:
        jobs_start_idx = seed_content.index("insert into public.jobs")
        prev_divider = seed_content.rfind("-- -----------------------------------------------------", 0, jobs_start_idx)
        if prev_divider != -1:
            jobs_start_idx = prev_divider

    updated_seed = seed_content[:jobs_start_idx].rstrip() + "\n\n" + new_jobs_sql

    with open(SEED_PATH, 'w', encoding='utf-8') as f:
        f.write(updated_seed)

    print(f"\n[1/2] Successfully updated {SEED_PATH} ({len(new_jobs_sql)} chars of SQL).")

    # 2. Update jd-data.js (Frontend offline fallback)
    js_content = f"""/**
 * IKAAI ACADEMY – JOB DESCRIPTIONS DATA
 * Generated from official Word (.docx) specifications in the JD folder.
 * Preserves all headings, paragraphs, lists, bold text, and tables.
 */

window.IKAAI_JOB_DESCRIPTIONS = {json.dumps(jds_frontend_data, indent=2, ensure_ascii=False)};

if (typeof module !== 'undefined' && module.exports) {{
  module.exports = window.IKAAI_JOB_DESCRIPTIONS;
}}
"""
    with open(JD_DATA_JS_PATH, 'w', encoding='utf-8') as f:
        f.write(js_content)

    print(f"[2/2] Successfully synced {JD_DATA_JS_PATH} ({len(jds_frontend_data)} job descriptions).")

if __name__ == '__main__':
    main()
