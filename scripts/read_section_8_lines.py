with open('data.js', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if '8. PROFILE & ACCOUNT SETTINGS' in l:
        print(f"Found section 8 at line {i+1}:")
        print("".join(lines[i:i+60]))
        break

