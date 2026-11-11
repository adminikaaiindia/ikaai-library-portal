import sys

with open('app.js', 'r', encoding='utf-8') as f:
    app = f.read()

# 1. Update isCurrentUserAdmin to be robust
target_is_admin = """  function isCurrentUserAdmin() {
    const role = (state.profile?.role || '').toLowerCase();
    const email = (state.profile?.email || '').toLowerCase().trim();
    return role === 'admin' || email === 'admin.ikaaiindia@gmail.com';
  }"""

replacement_is_admin = """  function isCurrentUserAdmin() {
    const role = (state && state.profile && state.profile.role ? state.profile.role : '').toLowerCase();
    const email = (state && state.profile && state.profile.email ? state.profile.email : '').toLowerCase().trim();
    if (role === 'admin' || email === 'admin.ikaaiindia@gmail.com') return true;
    try {
      const sessionRaw = localStorage.getItem('ikaai_portal_session');
      if (sessionRaw) {
        const u = JSON.parse(sessionRaw);
        if ((u.role && u.role.toLowerCase() === 'admin') || (u.email && u.email.toLowerCase().trim() === 'admin.ikaaiindia@gmail.com')) {
          return true;
        }
      }
    } catch (e) { }
    return false;
  }"""

if target_is_admin in app:
    app = app.replace(target_is_admin, replacement_is_admin, 1)
    print("1. Updated isCurrentUserAdmin definition")
else:
    print("Error: target_is_admin not found")
    sys.exit(1)

# 2. Update isModuleTimerUnlocked and isResourceTimerUnlocked
target_timers_unlock = """  function isModuleTimerUnlocked(mod) {
    if (!mod) return false;
    const key = getModuleTimerStorageKey(mod.id);
    const stored = localStorage.getItem(key);
    if (stored === 'unlocked' || stored === 'completed') return true;
    if (mod.timerUnlocked === true) return true;
    return false;
  }

  function isResourceTimerUnlocked(res) {
    if (!res) return false;
    if (res.completed) return true;
    const key = getResourceTimerStorageKey(res.id);
    const stored = localStorage.getItem(key);
    return stored === 'unlocked' || stored === 'completed';
  }"""

replacement_timers_unlock = """  function isModuleTimerUnlocked(mod) {
    if (!mod) return false;
    // Admins bypass all module timers and countdowns
    if (isCurrentUserAdmin()) return true;
    const key = getModuleTimerStorageKey(mod.id);
    const stored = localStorage.getItem(key);
    if (stored === 'unlocked' || stored === 'completed') return true;
    if (mod.timerUnlocked === true) return true;
    return false;
  }

  function isResourceTimerUnlocked(res) {
    if (!res) return false;
    // Admins bypass all resource review timers
    if (isCurrentUserAdmin()) return true;
    if (res.completed) return true;
    const key = getResourceTimerStorageKey(res.id);
    const stored = localStorage.getItem(key);
    return stored === 'unlocked' || stored === 'completed';
  }"""

if target_timers_unlock in app:
    app = app.replace(target_timers_unlock, replacement_timers_unlock, 1)
    print("2. Updated isModuleTimerUnlocked and isResourceTimerUnlocked to bypass for admins")
else:
    print("Error: target_timers_unlock not found")
    sys.exit(1)

# 3. Update startModuleTimer to hide timer card for admins
target_start_module_timer = """  function startModuleTimer(moduleId) {
    clearModuleTimer();

    const prog = getCurrentProgramme();
    const modules = prog.modules || [];
    const mod = modules.find(m => m.id === moduleId) || modules[currentModuleIndex];
    if (!mod) return;

    // Trigger server-side open timestamp"""

replacement_start_module_timer = """  function startModuleTimer(moduleId) {
    clearModuleTimer();

    const prog = getCurrentProgramme();
    const modules = prog.modules || [];
    const mod = modules.find(m => m.id === moduleId) || modules[currentModuleIndex];
    if (!mod) return;

    const timerCard = document.getElementById('moduleTimerCard');
    const isAdmin = isCurrentUserAdmin();

    // Hide timer card and grant unrestricted access for admins
    if (isAdmin) {
      if (timerCard) timerCard.style.display = 'none';
      const isLastModule = (currentModuleIndex === modules.length - 1);
      const nextBtnLabel = isLastModule ? 'Written Exam ›' : 'Next module ›';
      setModuleControlsLockState(false, mod, nextBtnLabel);
      renderSidebar();
      return;
    }

    if (timerCard) timerCard.style.display = '';

    // Trigger server-side open timestamp"""

if target_start_module_timer in app:
    app = app.replace(target_start_module_timer, replacement_start_module_timer, 1)
    print("3. Updated startModuleTimer to immediately hide timer card for admins")
else:
    print("Error: target_start_module_timer not found")
    sys.exit(1)

# 4. Update renderSidebar sequential unlock for admin
target_sidebar_unlock = """      const isSequentialUnlocked = (idx === 0) || Boolean(prog.modules[idx - 1] && calculateModuleCompletion(prog.modules[idx - 1]) >= 80);
      const isTimerUnlocked = isModuleTimerUnlocked(mod);
      const isFullyUnlocked = isSequentialUnlocked && isTimerUnlocked;"""

replacement_sidebar_unlock = """      const isAdmin = isCurrentUserAdmin();
      const isSequentialUnlocked = isAdmin || (idx === 0) || Boolean(prog.modules[idx - 1] && calculateModuleCompletion(prog.modules[idx - 1]) >= 80);
      const isTimerUnlocked = isModuleTimerUnlocked(mod);
      const isFullyUnlocked = isSequentialUnlocked && isTimerUnlocked;"""

if target_sidebar_unlock in app:
    app = app.replace(target_sidebar_unlock, replacement_sidebar_unlock, 1)
    print("4. Updated renderSidebar sequential check for admin")
else:
    print("Error: target_sidebar_unlock not found")
    sys.exit(1)

# 5. In renderResourcesList hide 15s timer bar for admins
target_res_timer_bar = """          <div class="resource-timer-bar-wrap ${isResourceTimerUnlocked(res) ? 'completed' : ''}" id="resTimer_${res.id}">"""

replacement_res_timer_bar = """          <div class="resource-timer-bar-wrap ${isResourceTimerUnlocked(res) ? 'completed' : ''}" id="resTimer_${res.id}" style="${isCurrentUserAdmin() ? 'display: none !important;' : ''}">"""

if target_res_timer_bar in app:
    app = app.replace(target_res_timer_bar, replacement_res_timer_bar, 1)
    print("5. Updated renderResourcesList timer bar for admin")
else:
    print("Error: target_res_timer_bar not found")
    sys.exit(1)

# 6. Set body.is-admin in applyRolePermissions and initAuthentication
target_apply_role = """    if (isAdmin) {
      if (profile) profile.role = 'admin';
      state.profile.role = 'admin';
    } else {"""

replacement_apply_role = """    if (isAdmin) {
      if (profile) profile.role = 'admin';
      state.profile.role = 'admin';
      try { document.body.classList.add('is-admin'); } catch (e) { }
    } else {
      try { document.body.classList.remove('is-admin'); } catch (e) { }"""

if target_apply_role in app:
    app = app.replace(target_apply_role, replacement_apply_role, 1)
    print("6. Updated applyRolePermissions body class")
else:
    print("Error: target_apply_role not found")
    sys.exit(1)

# In handleSignOutCleanup remove body is-admin
target_cleanup_body = """    try {
      document.documentElement.classList.remove('has-portal-session');
    } catch (e) { }"""

replacement_cleanup_body = """    try {
      document.documentElement.classList.remove('has-portal-session');
      document.body.classList.remove('is-admin');
    } catch (e) { }"""

if target_cleanup_body in app:
    app = app.replace(target_cleanup_body, replacement_cleanup_body, 1)
    print("7. Updated handleSignOutCleanup to remove is-admin body class")
else:
    print("Error: target_cleanup_body not found")
    sys.exit(1)

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(app)

print("SUCCESS: app.js successfully patched for admin timer bypass!")
