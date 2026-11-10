with open('styles.css', encoding='utf-8') as f:
    css = f.read()

for term in ['status-verified-badge', 'account-info-banner', 'avatar-preview']:
    print(f"'{term}' in styles.css:", term in css)

