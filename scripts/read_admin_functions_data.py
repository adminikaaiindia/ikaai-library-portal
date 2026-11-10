with open('data.js', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if '9. ADMIN FUNCTIONS' in l:
        print(f"Admin functions at line {i+1}:")
        print("".join(lines[i:i+80]))
        break

