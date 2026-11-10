import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("index.html", encoding="utf-8") as f:
    lines = f.readlines()

for j in range(0, 35):
    print(f"{j+1}: {lines[j]}", end="")

