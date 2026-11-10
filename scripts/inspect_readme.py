import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("README.md", "r", encoding="utf-8") as f:
    text = f.read()

print("README length:", len(text))
for line in text.splitlines():
    if line.startswith("# ") or line.startswith("## ") or line.startswith("### "):
        print(line)

