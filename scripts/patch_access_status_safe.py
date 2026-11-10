import sys
sys.stdout.reconfigure(encoding='utf-8')

with open("app.js", "r", encoding="utf-8") as f:
    code = f.read()

target_str = """        if (profile) {
          const accessStatus = profile.access_status || 'pending';"""

replacement_str = """        if (profile) {
          // Determine access status safely (admins are always active; existing profiles default to active)
          let accessStatus = profile.access_status;
          if (profile.role === 'admin') {
            accessStatus = 'active';
          } else if (!accessStatus) {
            // If access_status is not yet populated or column not yet added in DB, keep existing users active
            accessStatus = 'active';
          }"""

if target_str in code:
    code = code.replace(target_str, replacement_str)
    print("Updated access status safe check in app.js.")
else:
    print("WARNING: target_str not found in app.js!")

with open("app.js", "w", encoding="utf-8") as f:
    f.write(code)

