import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("scripts/debug_boot.js", "r", encoding="utf-8") as f:
    code = f.read()

code = code.replace("innerHTML: ''", "innerHTML: '', dataset: {}")

with open("scripts/debug_boot.js", "w", encoding="utf-8") as f:
    f.write(code)

print("Updated mock element dataset.")

