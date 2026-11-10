import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('index.html', encoding='utf-8') as f:
    html = f.read()

start_idx = html.find('id="settingsScreenView"')
end_idx = html.find('</div>\n    </div>', start_idx) + 16
print(html[start_idx:end_idx])

