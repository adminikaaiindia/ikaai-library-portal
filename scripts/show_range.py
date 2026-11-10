with open('index.html', encoding='utf-8') as f:
    lines = f.readlines()
for i in range(2045, 2150):
    if i < len(lines):
        print(f'{i+1}: {lines[i]}', end='')
