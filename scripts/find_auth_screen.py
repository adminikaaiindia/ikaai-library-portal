with open('index.html', encoding='utf-8') as f:
    html = f.read()

idx = html.find('id="authScreen"')
print('authScreen at:', idx)
end_auth = html.find('<!-- Top Navigation Bar -->', idx)
print('Top Navigation Bar at:', end_auth)

