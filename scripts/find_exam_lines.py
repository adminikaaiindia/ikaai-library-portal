import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("app.js", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "function renderExamScreen(" in line or "function renderGradeReportScreen(" in line or "function renderFeedbackScreen(" in line:
        print(f"Line {i+1}: {line.strip()}")

