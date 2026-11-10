import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("index.html", encoding="utf-8") as f:
    lines = f.readlines()

for j in range(len(lines)-35, len(lines)):
    print(lines[j], end="")
