import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("app.js", encoding="utf-8") as f:
    lines = f.readlines()

for j in range(10860, 10950):
    if j < len(lines):
        print(f"{j+1}: {lines[j]}", end="")

