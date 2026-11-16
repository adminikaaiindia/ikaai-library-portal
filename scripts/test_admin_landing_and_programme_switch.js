const fs = require('fs');
const assert = require('assert');

console.log('=== VERIFYING ADMIN LANDING & PROGRAMME SWITCH BEHAVIOUR ===\n');

const appJs = fs.readFileSync('app.js', 'utf8').replace(/\r\n/g, '\n');
const stylesCss = fs.readFileSync('styles.css', 'utf8').replace(/\r\n/g, '\n');

// 1. Verify applyRolePermissions routes home to module for admins
assert(appJs.includes("if (activeScreen === 'home') {\n        activeScreen = 'module';\n      }"), 'applyRolePermissions sets activeScreen to module for admins');
console.log('✅ PASS: applyRolePermissions sets activeScreen to module instead of admin');

// 2. Verify switchScreen routes home to module for admins
assert(appJs.includes("// For admins, remove dashboard: redirect any home navigation to curriculum (module)\n    if (isAdmin && screenKey === 'home') {\n      screenKey = 'module';\n    }"), 'switchScreen redirects home to module for admins');
console.log('✅ PASS: switchScreen redirects home to module instead of admin');

// 3. Verify renderHomeScreen routes admins to module
assert(appJs.includes("async function renderHomeScreen(force = false) {\n    const rawRole = (state.profile?.role || '').toLowerCase().trim();\n    if (rawRole === 'admin') {\n      switchScreen('module');\n      return;\n    }"), 'renderHomeScreen redirects admin to module');
console.log('✅ PASS: renderHomeScreen redirects admin to module');

// 4. Verify renderHomeSummaryData routes admins to module
assert(appJs.includes("if (role === 'admin' || (state.profile?.role || '').toLowerCase() === 'admin') {\n      switchScreen('module');\n      return;\n    }"), 'renderHomeSummaryData redirects admin to module');
console.log('✅ PASS: renderHomeSummaryData redirects admin to module');

// 5. Verify programmeSelect listener keeps current activeScreen
assert(appJs.includes("const targetScreen = activeScreen && activeScreen !== 'home' ? activeScreen : 'module';"), 'programmeSelect change listener keeps current activeScreen');
assert(!appJs.includes("el.programmeSelect.addEventListener('change', (e) => {\n    if (!isCurrentUserAdmin()) {\n      e.preventDefault();\n      return;\n    }\n    clearModuleTimer();\n    currentProgrammeId = e.target.value;\n    localStorage.setItem('ikaai_active_programme', currentProgrammeId);\n    currentModuleIndex = 0;\n    expandedModules = new Set([0]);\n    renderAll();"), 'programmeSelect change listener does not call renderAll()');
console.log('✅ PASS: programmeSelect change listener keeps activeScreen and refreshes without forced admin redirect');

// 6. Verify Dashboard is hidden for admins in CSS
assert(stylesCss.includes('body.is-admin #navHome'), 'CSS rule hides Dashboard nav button for admins');
console.log('✅ PASS: Dashboard navigation item remains hidden for admins');

console.log('\n🎉 ALL ADMIN LANDING & PROGRAMME SWITCH TESTS PASSED!');
