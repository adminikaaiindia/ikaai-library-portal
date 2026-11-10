import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("supabase/migrations/20261104_03_server_functions.sql", encoding="utf-8") as f:
    sql = f.read()

idx = sql.find("create or replace function public.grade_exam")
print("=== grade_exam ===")
print(sql[idx:idx+1200])

