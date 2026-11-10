import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open("index.html", encoding="utf-8") as f:
    text = f.read()

matches = re.findall(r'id=["\']([^"\']*modal[^"\']*)["\']', text, re.IGNORECASE)
print('Modals found:', set(matches))

