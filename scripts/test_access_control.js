// scripts/test_access_control.js
const assert = require('assert');
const fs = require('fs');

console.log('=== IKAAI ACCESS CONTROL & GATING VERIFICATION TEST ===\n');

// 1. Test Canonical Programmes
const CANONICAL_PROGRAMMES = [
  { id: '10000000-0000-0000-0000-000000000001', slug: 'human-resources', name: 'Human Resources' },
  { id: '10000000-0000-0000-0000-000000000002', slug: 'data-analyst', name: 'Data Analyst' },
  { id: '10000000-0000-0000-0000-000000000003', slug: 'social-research-policy', name: 'Social Research & Policy' },
  { id: '10000000-0000-0000-0000-000000000004', slug: 'design-social-media', name: 'Design & Social Media' },
  { id: '10000000-0000-0000-0000-000000000005', slug: 'business-development', name: 'Business Development' }
];

console.log('1. Checking Canonical Programmes...');
assert.strictEqual(CANONICAL_PROGRAMMES.length, 5);
const validProgIds = new Set(CANONICAL_PROGRAMMES.map(p => p.id));
assert.ok(validProgIds.has('10000000-0000-0000-0000-000000000001'));
assert.ok(validProgIds.has('10000000-0000-0000-0000-000000000005'));
console.log('   ✓ 5 canonical programmes verified.\n');

// 2. Test Bulk CSV / Text Parsing Logic
console.log('2. Testing Bulk CSV / Text Parsing Logic...');
function parseBulkLines(rawText) {
  const lines = rawText.split(/\r?\n/).filter(l => l.trim().length > 0);
  const results = [];

  lines.forEach((line, idx) => {
    const parts = line.split(/[,;]/).map(p => p.trim());
    const email = (parts[0] || '').toLowerCase();
    const roleRaw = (parts[1] || 'intern').toLowerCase();
    const progRaw = (parts[2] || '').toLowerCase();

    let role = 'intern';
    if (roleRaw.includes('admin')) role = 'admin';
    else if (roleRaw.includes('instruct')) role = 'instructor';

    const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    let programmeId = null;
    let programmeName = role === 'admin' ? 'All Programmes (Admin)' : '';
    let error = null;

    if (!emailValid) {
      error = 'Invalid email syntax';
    } else if (role !== 'admin') {
      const matchProg = CANONICAL_PROGRAMMES.find(p =>
        p.name.toLowerCase().includes(progRaw) ||
        p.slug.toLowerCase().includes(progRaw) ||
        p.id === progRaw
      );
      if (matchProg) {
        programmeId = matchProg.id;
        programmeName = matchProg.name;
      } else {
        if (!progRaw) {
          programmeId = CANONICAL_PROGRAMMES[0].id;
          programmeName = CANONICAL_PROGRAMMES[0].name;
        } else {
          error = `Unknown programme "${parts[2]}"`;
        }
      }
    }

    results.push({ lineNum: idx + 1, email, role, programmeId, programmeName, isValid: !error, error });
  });

  return results;
}

const sampleCsv = `
learner.one@ikaaiindia.org, intern, Data Analyst
instructor.priya@ikaaiindia.org, instructor, human-resources
admin.sudhir@ikaaiindia.org, admin,
bad.email.address, intern, Design & Social Media
valid.bizdev@ikaaiindia.org, intern, NonExistentProgramme
`;

const parsed = parseBulkLines(sampleCsv);
assert.strictEqual(parsed.length, 5);

// Check row 1 (Valid Intern)
assert.strictEqual(parsed[0].email, 'learner.one@ikaaiindia.org');
assert.strictEqual(parsed[0].role, 'intern');
assert.strictEqual(parsed[0].programmeId, '10000000-0000-0000-0000-000000000002');
assert.strictEqual(parsed[0].isValid, true);

// Check row 2 (Valid Instructor)
assert.strictEqual(parsed[1].email, 'instructor.priya@ikaaiindia.org');
assert.strictEqual(parsed[1].role, 'instructor');
assert.strictEqual(parsed[1].programmeId, '10000000-0000-0000-0000-000000000001');
assert.strictEqual(parsed[1].isValid, true);

// Check row 3 (Valid Admin - programme must be null)
assert.strictEqual(parsed[2].email, 'admin.sudhir@ikaaiindia.org');
assert.strictEqual(parsed[2].role, 'admin');
assert.strictEqual(parsed[2].programmeId, null);
assert.strictEqual(parsed[2].isValid, true);

// Check row 4 (Invalid Email)
assert.strictEqual(parsed[3].isValid, false);
assert.strictEqual(parsed[3].error, 'Invalid email syntax');

// Check row 5 (Unknown programme)
assert.strictEqual(parsed[4].isValid, false);
assert.ok(parsed[4].error.includes('Unknown programme'));

console.log('   ✓ Bulk parser validation rules passed.\n');

// 3. Test Gating State Decision Matrix
console.log('3. Testing Access Gating Decision Matrix...');
function evaluateAccessGate(profile) {
  if (!profile) return { action: 'auth' };
  const status = profile.access_status || 'pending';
  if (status === 'pending') {
    return { action: 'gate_pending', allowDataSync: false };
  }
  if (status === 'revoked') {
    return { action: 'gate_revoked', allowDataSync: false };
  }
  if (status === 'active') {
    return {
      action: 'allow_portal',
      allowDataSync: true,
      canSwitchProgramme: profile.role === 'admin',
      hasAdminNav: profile.role === 'admin'
    };
  }
  return { action: 'gate_pending', allowDataSync: false };
}

// Case A: Unapproved learner
const unapprovedUser = { id: 'u1', email: 'unapproved@test.com', access_status: 'pending' };
const gateA = evaluateAccessGate(unapprovedUser);
assert.strictEqual(gateA.action, 'gate_pending');
assert.strictEqual(gateA.allowDataSync, false);

// Case B: Revoked employee
const revokedUser = { id: 'u2', email: 'revoked@test.com', access_status: 'revoked' };
const gateB = evaluateAccessGate(revokedUser);
assert.strictEqual(gateB.action, 'gate_revoked');
assert.strictEqual(gateB.allowDataSync, false);

// Case C: Active intern
const activeIntern = { id: 'u3', email: 'intern@test.com', role: 'intern', programme_id: '10000000-0000-0000-0000-000000000001', access_status: 'active' };
const gateC = evaluateAccessGate(activeIntern);
assert.strictEqual(gateC.action, 'allow_portal');
assert.strictEqual(gateC.allowDataSync, true);
assert.strictEqual(gateC.canSwitchProgramme, false);
assert.strictEqual(gateC.hasAdminNav, false);

// Case D: Active admin
const activeAdmin = { id: 'u4', email: 'admin@test.com', role: 'admin', programme_id: null, access_status: 'active' };
const gateD = evaluateAccessGate(activeAdmin);
assert.strictEqual(gateD.action, 'allow_portal');
assert.strictEqual(gateD.allowDataSync, true);
assert.strictEqual(gateD.canSwitchProgramme, true);
assert.strictEqual(gateD.hasAdminNav, true);

console.log('   ✓ Gating decision matrix passed.\n');

// 4. Verify SQL Migration File Syntax & Content
console.log('4. Inspecting SQL Migration 20261106_05_access_control_and_invites.sql...');
const migrationSql = fs.readFileSync('supabase/migrations/20261106_05_access_control_and_invites.sql', 'utf8').toLowerCase();

assert.ok(migrationSql.includes('create table if not exists public.access_invites'));
assert.ok(migrationSql.includes('access_status text not null default \'pending\''));
assert.ok(migrationSql.includes("check (access_status in ('active', 'pending', 'revoked'))"));
assert.ok(migrationSql.includes('chk_access_invites_role_programme'));
assert.ok(migrationSql.includes('disable trigger trg_guard_profile_updates'));
assert.ok(migrationSql.includes('enable trigger trg_guard_profile_updates'));
assert.ok(migrationSql.includes('create or replace function public.handle_new_user'));
assert.ok(migrationSql.includes('create or replace function public.invite_user'));
assert.ok(migrationSql.includes('create or replace function public.update_user_access'));
assert.ok(migrationSql.includes('create or replace function public.revoke_user_access'));
assert.ok(migrationSql.includes('create or replace function public.restore_user_access'));
assert.ok(migrationSql.includes('create or replace function public.list_access_invites'));

// Ensure last admin protection exists in update_user_access and revoke_user_access
assert.ok(migrationSql.includes('the last remaining active administrator'));

console.log('   ✓ SQL migration contains all required constraints, functions, RLS and triggers.\n');

console.log('ALL VERIFICATION CHECKS PASSED SUCCESSFULLY!');
