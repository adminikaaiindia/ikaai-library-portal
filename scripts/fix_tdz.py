# scripts/fix_tdz.py

with open("app.js", "r", encoding="utf-8") as f:
    code = f.read()

# 1. Change `let adminPortalEventsWired` to `var adminPortalEventsWired`
code = code.replace("let adminPortalCachedUsers = [];", "var adminPortalCachedUsers = [];")
code = code.replace("let adminPortalEventsWired = false;", "var adminPortalEventsWired = false;")
code = code.replace("let bulkParsedEntries = [];", "var bulkParsedEntries = [];")

# 2. Also ensure wireAdminPortalEvents() is called safely
code = code.replace("wireAdminPortalEvents();", "if (typeof wireAdminPortalEvents === 'function') wireAdminPortalEvents();")

with open("app.js", "w", encoding="utf-8") as f:
    f.write(code)

print("Updated app.js variables to var and guarded wireAdminPortalEvents.")

