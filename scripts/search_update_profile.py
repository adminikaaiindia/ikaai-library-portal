import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('data.js', encoding='utf-8') as f:
    data = f.read()

import re
matches = [m.start() for m in re.finditer(r'updateProfile', data)]
print('updateProfile matches in data.js:', matches)
for m in matches:
    print(data[m-50:m+600])
    print('---')

