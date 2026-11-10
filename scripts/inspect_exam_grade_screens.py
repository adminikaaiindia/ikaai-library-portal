import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("index.html", encoding="utf-8") as f:
    html = f.read()

import re

screens = re.findall(r'<div[^>]*class=["\'][^"\']*screen-view[^"\']*["\'][^>]*id=["\'](\w+)["\']', html)
print('Screen views in index.html:', screens)

for s in ['exam', 'grade', 'feedback']:
    for scr in screens:
        if s in scr.lower():
            idx = html.find(f'id="{scr}"')
            print(f'=== {scr} starts at index {idx} ===')
            print(html[idx:idx+500])
            print('-------------------------------------------')

