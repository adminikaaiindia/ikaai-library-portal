import re

with open('index.html', encoding='utf-8') as f:
    html = f.read()

matches = re.findall(r'id=[\"\']([a-zA-Z0-9_-]*account[a-zA-Z0-9_-]*)[\"\']', html, re.I)
print('Account matches in HTML:', matches)

idx = html.find('Sudhir')
print('Sudhir in HTML index:', idx)
if idx != -1:
    print(html[idx-100:idx+600])

with open('app.js', encoding='utf-8') as f:
    app = f.read()

idx_app = app.find('Sudhir')
print('Sudhir in app.js index:', idx_app)
if idx_app != -1:
    print(app[idx_app-100:idx_app+600])

