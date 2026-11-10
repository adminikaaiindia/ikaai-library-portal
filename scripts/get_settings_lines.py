with open('index.html', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if 'id="settingsScreenView"' in line:
        start_line = i
        break

for j in range(start_line, len(lines)):
    if '<!-- ==========================================' in lines[j] and j > start_line + 5:
        end_line = j
        break

print(f"settingsScreenView lines: {start_line+1} to {end_line+1}")
print("".join(lines[start_line:end_line]))

