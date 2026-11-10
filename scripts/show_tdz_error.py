import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("app.js", encoding="utf-8") as f:
    lines = f.readlines()

print("--- Around line 3330 ---")
for j in range(3320, 3345):
    if j < len(lines):
        print(f"{j+1}: {lines[j]}", end="")

print("\n--- Around line 7260 ---")
for j in range(7250, 7275):
    if j < len(lines):
        print(f"{j+1}: {lines[j]}", end="")

