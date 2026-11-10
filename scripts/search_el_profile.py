with open('app.js', encoding='utf-8') as f:
    app = f.read()

idx = app.find('profileEmail')
while idx != -1:
    print('profileEmail at', idx, ':')
    print(app[idx-40:idx+200])
    print('---')
    idx = app.find('profileEmail', idx+1)

