with open("app.js", encoding="utf-8") as f:
    lines = f.readlines()

for j in range(10384, 10455):
    print(f"{j+1}: {lines[j]}", end="")

