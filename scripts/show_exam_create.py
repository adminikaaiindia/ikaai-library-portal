import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("supabase/migrations/20261104_01_core_schema.sql", encoding="utf-8") as f:
    text = f.read()

idx = text.find("create table if not exists public.exam_submissions")
print(text[idx:idx+800])

