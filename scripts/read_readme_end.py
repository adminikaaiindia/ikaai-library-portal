with open('README.md', encoding='utf-8') as f:
    readme = f.read()

print("README length:", len(readme))
print(readme[-1500:])

