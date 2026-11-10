with open("app.js", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "async function renderAdminPortal" in line:
        for j in range(max(0, i-5), min(len(lines), i + 90)):
            print(f"{j+1}: {lines[j]}", end="")
        break

