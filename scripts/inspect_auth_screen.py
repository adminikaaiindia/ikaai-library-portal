with open("index.html", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'id="authScreen"' in line:
        print(f"authScreen starts at line {i+1}")
        for j in range(i, min(len(lines), i + 35)):
            print(f"{j+1}: {lines[j]}", end="")
        break

for i, line in enumerate(lines):
    if 'id="appShell"' in line:
        print(f"\nappShell starts at line {i+1}")
        break

