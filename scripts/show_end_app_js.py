import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("app.js", encoding="utf-8") as f:
    lines = f.readlines()

for j in range(len(lines)-60, len(lines)):
    print(f"{j+1}: {lines[j]}", end="")

