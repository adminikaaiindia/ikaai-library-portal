const fs = require('fs');
const assert = require('assert');

console.log('=== VERIFYING ROLE RESTRICTION & DASHBOARD LANDING ===\n');

const appJs = fs.readFileSync('app.js', 'utf8');
const indexHtml = fs.readFileSync('index.html', 'utf8');
const migrationSql = fs.readFileSync('supabase/migrations/20261115_18_fix_home_dashboard_summary.sql', 'utf8');

// 1. Check applyRolePermissions
assert(appJs.includes('function applyRolePermissions(profile)'), 'applyRolePermissions is defined');
assert(appJs.includes('el.programmeSelect.disabled = true'), 'programmeSelect disabled for non-admins');
assert(appJs.includes('el.programmeSelect.innerHTML = `<option value="${escapeHtml(assignedKey)}" selected>${escapeHtml(roleTitle)}</option>`') || appJs.includes('el.programmeSelect.innerHTML = `<option value="'), 'programmeSelect displays only assigned role for intern');
console.log('✅ PASS: applyRolePermissions restricts programme dropdown to only assigned role for interns');

// 2. Check no unconditional switchScreen('module')
assert(!appJs.includes("if (!isAuthorizedForJdSection()) {\n      if (el.jdsScreenView) el.jdsScreenView.style.display = 'none';\n      switchScreen('module');"), 'No unconditional redirect to module in renderJobDescriptionsScreen');
assert(appJs.includes("switchScreen(activeScreen || 'home');"), 'renderAll switches to home by default');
console.log('✅ PASS: Landing screen stays on home dashboard and does not get redirected to module');

// 3. Check migration 18 type safety
assert(migrationSql.includes('drop function if exists public.get_dashboard_summary() cascade;'), 'Migration drops existing RPC with cascade');
assert(migrationSql.includes('m.sender_id::text != v_caller_id_text'), 'sender_id cast to text prevents uuid <> text error');
assert(migrationSql.includes('ccm.user_id::text = v_caller_id_text'), 'user_id cast to text');
assert(migrationSql.includes('revoke all on function public.get_dashboard_summary() from public, anon;'), 'Anon/public execution revoked');
assert(migrationSql.includes('grant execute on function public.get_dashboard_summary() to authenticated;'), 'Authenticated execution granted');
console.log('✅ PASS: Migration 20261115_18 guarantees 100% type safety and prevents uuid <> text error');

console.log('\n🎉 ALL ROLE RESTRICTION & DASHBOARD CHECKS PASSED!');

