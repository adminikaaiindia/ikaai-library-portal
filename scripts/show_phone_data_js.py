import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("data.js", encoding="utf-8") as f:
    lines = f.readlines()

for j in range(500, 540):
    if j < len(lines):
        print(f"{j+1}: {lines[j]}", end="")

