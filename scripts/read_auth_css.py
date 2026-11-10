with open('styles.css', encoding='utf-8') as f:
    css = f.read()

idx = css.find('.auth-screen')
print(css[idx:idx+500])

