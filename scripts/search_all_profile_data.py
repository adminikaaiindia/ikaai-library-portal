import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('data.js', encoding='utf-8') as f:
    data = f.read()

import re
matches = [m.start() for m in re.finditer(r'profile', data, re.I)]
print('Profile occurrences in data.js:', len(matches))
for m in matches[:10]:
    line = data[data.rfind('\n', 0, m)+1:data.find('\n', m)].strip()
    print(line)

