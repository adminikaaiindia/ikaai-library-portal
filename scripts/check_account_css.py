with open('styles.css', encoding='utf-8') as f:
    css = f.read()

import re
matches = re.findall(r'\.account-[a-zA-Z0-9_-]+', css)
print('Account classes in styles.css:', set(matches))

