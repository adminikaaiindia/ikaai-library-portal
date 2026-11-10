with open("scripts/debug_boot.js", "r", encoding="utf-8") as f:
    code = f.read()

code = code.replace("adminListAccessInvites: async () => []", "adminListAccessInvites: async () => [], openModule: async () => {}")

with open("scripts/debug_boot.js", "w", encoding="utf-8") as f:
    f.write(code)

