import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("supabase/migrations/20261106_01_schema_reconciliation.sql", encoding="utf-8") as f:
    text = f.read()

idx = text.find("public.feedback")
while idx != -1:
    print(text[idx:idx+400])
    print("-------------------------")
    idx = text.find("public.feedback", idx+1)

