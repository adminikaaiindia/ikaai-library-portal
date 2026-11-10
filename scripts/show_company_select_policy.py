import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("supabase/migrations/20261105_01_company_resources.sql", encoding="utf-8") as f:
    text = f.read()

idx = text.find('create policy "company_documents_select_policy"')
print(text[idx:idx+400])

