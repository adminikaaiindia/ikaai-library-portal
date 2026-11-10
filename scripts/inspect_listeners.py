with open("app.js", encoding="utf-8") as f:
    lines = f.readlines()

for j in range(3275, 3315):
    print(f"{j+1}: {lines[j]}", end="")

