import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("supabase/migrations/20261106_01_schema_reconciliation.sql", encoding="utf-8") as f:
    sql = f.read()

idx = sql.find("create or replace function public.submit_exam")
print("=== submit_exam ===")
print(sql[idx:idx+1200])

idx = sql.find("create or replace function public.allow_exam_retake")
print("\n=== allow_exam_retake ===")
print(sql[idx:idx+800])

