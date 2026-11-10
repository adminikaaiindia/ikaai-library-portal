with open('app.js', encoding='utf-8') as f:
    app = f.read()

import re
matches = [m.start() for m in re.finditer(r'renderAccount|account-settings|accountSettings|screen.*account', app, re.I)]
print('Matches in app.js:', len(matches))
for pos in matches[:10]:
    print('--- AT', pos, '---')
    print(app[pos-50:pos+300])

with open('index.html', encoding='utf-8') as f:
    html = f.read()

matches_html = [m.start() for m in re.finditer(r'account', html, re.I)]
print('Matches in index.html:', len(matches_html))
for pos in matches_html[:10]:
    print('--- HTML AT', pos, '---')
    print(html[pos-50:pos+200])

