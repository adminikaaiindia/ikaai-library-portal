with open("app.js", encoding="utf-8") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "checkFirstTimeProgrammeAssignment" in line or "handleSuccessfulAuth" in line or "initAuthentication" in line:
        print(f"{i+1}: {line.strip()[:80]}")

