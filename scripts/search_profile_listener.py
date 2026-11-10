import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('app.js', encoding='utf-8') as f:
    app = f.read()

import re
matches = [m.start() for m in re.finditer(r'profileActionsForm', app)]
print('profileActionsForm matches:', matches)
for m in matches:
    print(app[m-20:m+400])
    print('---')

