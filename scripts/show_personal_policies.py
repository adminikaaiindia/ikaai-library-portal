import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("supabase/migrations/20261105_02_personal_documents.sql", encoding="utf-8") as f:
    text = f.read()

idx = text.find('CREATE POLICY "personal_documents_recipient_select"')
print(text[idx:idx+700])

