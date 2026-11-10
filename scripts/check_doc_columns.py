import sys
sys.stdout.reconfigure(encoding='utf-8')

for fname in ['supabase/migrations/20261105_01_company_resources.sql', 'supabase/migrations/20261105_02_personal_documents.sql']:
    print(f'=== {fname} ===')
    with open(fname, encoding='utf-8') as f:
        text = f.read()
    for line in text.splitlines():
        if 'create table' in line.lower() or 'column' in line.lower() or 'status' in line.lower() or 'published' in line.lower() or 'is_published' in line.lower() or 'is_revoked' in line.lower():
            print(line[:100])

