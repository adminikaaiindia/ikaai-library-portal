import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("supabase/migrations/20261106_01_schema_reconciliation.sql", encoding="utf-8") as f:
    sql = f.read()

for term in ['allow_retake', 'submit_exam', 'grade_exam', 'allow_exam_retake', 'feedback']:
    idx = sql.find(term)
    if idx != -1:
        print(f"=== {term} in 20261106_01 ===")
        print(sql[idx-50:idx+400])
        print("-----------------------------------------")

