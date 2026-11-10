with open("app.js", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "adminUsersTableBody: document.getElementById('adminUsersTableBody')" in line:
        print(f"el definitions around line {i+1}")
        for j in range(max(0, i-5), min(len(lines), i+15)):
            print(f"{j+1}: {lines[j]}", end="")
        break

