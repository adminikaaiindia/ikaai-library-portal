import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("supabase/migrations/20261104_01_core_schema.sql", encoding="utf-8") as f:
    core_sql = f.read()

terms = ['create table if not exists public.exam_questions',
         'create table if not exists public.exam_submissions',
         'create table if not exists public.exam_answers',
         'create table if not exists public.quiz_attempts',
         'create table if not exists public.feedback',
         'create or replace view public.v_my_grades',
         'create or replace view public.v_programme_completion']

for t in terms:
    idx = core_sql.find(t)
    if idx != -1:
        print(f"=== {t} ===")
        print(core_sql[idx:idx+700])
        print("-----------------------------------------")
    else:
        print(f"NOT FOUND: {t}")

