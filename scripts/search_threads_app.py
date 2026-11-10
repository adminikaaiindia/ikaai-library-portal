with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'message_threads', text)]
print('Matches count in app.js:', len(matches))
for m in matches:
    print('  ', text[m-40:m+100].replace('\n', ' '))

