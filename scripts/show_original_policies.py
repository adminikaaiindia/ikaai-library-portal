import sys
sys.stdout.reconfigure(encoding='utf-8')

for fname in ['supabase/migrations/20261105_01_company_resources.sql', 'supabase/migrations/20261105_02_personal_documents.sql']:
    print(f'=== {fname} ===')
    with open(fname, encoding='utf-8') as f:
        text = f.read()
    for line in text.splitlines():
        if 'create policy' in line.lower() or 'on public.company_documents' in line.lower() or 'on public.personal_documents' in line.lower():
            print(line)

