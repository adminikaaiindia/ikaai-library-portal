with open("index.html", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "programmeSelectModal" in line or "adminScreenView" in line:
        print(f"{i+1}: {line.strip()[:80]}")

