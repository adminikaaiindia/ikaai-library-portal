import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("app.js", encoding="utf-8") as f:
    text = f.read()

funcs = ['renderExamScreen', 'renderGradeReportScreen', 'renderFeedbackScreen']
for fn in funcs:
    idx = text.find(f'function {fn}')
    if idx != -1:
        print(f"=== {fn} starts at {idx} ===")
        print(text[idx:idx+900])
        print("---------------------------------------")
    else:
        print(f"NOT FOUND: {fn}")

