// Test script to verify Prompt 6: Security Audit & Hardening
const fs = require('fs');
const path = require('path');

let errors = [];

function assert(condition, message) {
  if (!condition) {
    errors.push(message);
    console.error('❌ ' + message);
  } else {
    console.log('✅ ' + message);
  }
}

console.log('=== PROMPT 6: SECURITY AUDIT & HARDENING VERIFICATION ===\n');

// 1. Check Migration File: 20261106_08_security_hardening.sql
console.log('--- 1. Database Security Migration ---');
const migPath = path.join(__dirname, '..', 'supabase', 'migrations', '20261106_08_security_hardening.sql');
assert(fs.existsSync(migPath), 'Migration 20261106_08_security_hardening.sql exists');

if (fs.existsSync(migPath)) {
  const migContent = fs.readFileSync(migPath, 'utf8');
  assert(migContent.includes("update storage.buckets set public = false"), 'Explicitly sets private buckets public = false');
  assert(migContent.includes("update storage.buckets set public = true where id = 'avatars'"), 'Sets avatars public = true');
  assert(migContent.includes("with (security_invoker = true)"), 'Recreates views with (security_invoker = true)');
  assert(migContent.includes("v_quiz_options_learner"), 'Hardens v_quiz_options_learner view');
  assert(migContent.includes("v_my_grades"), 'Hardens v_my_grades view');
  assert(migContent.includes("v_programme_completion"), 'Hardens v_programme_completion view');
  assert(migContent.includes("personal_documents_recipient_select"), 'Enforces RLS policy for personal documents');
  assert(migContent.includes("set search_path = public, pg_temp"), 'Hardens security definer functions with search_path hygiene');
}

// 2. Secrets Audit
console.log('\n--- 2. Secrets & Credential Exposure Audit ---');
const clientFiles = ['supabase-config.js', 'supabase-client.js', 'data.js', 'app.js', 'index.html'];
clientFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const hasServiceRole = /service_role/i.test(content);
    assert(!hasServiceRole, `${file} does not contain any service_role key`);
  }
});

// 3. Removal of Offline Fake Fallback Data
console.log('\n--- 3. Offline Fake Demo Data Audit ---');
const dataJsPath = path.join(__dirname, '..', 'data.js');
const dataJsContent = fs.readFileSync(dataJsPath, 'utf8');
assert(!dataJsContent.includes('p0000000-0000-0000-0000-000000000001'), 'Fake personal document UUIDs eliminated from data.js');
assert(!dataJsContent.includes('c0000000-0000-0000-0000-000000000001'), 'Fake company document UUIDs eliminated from data.js');
assert(!dataJsContent.includes('from(\'chat-attachments\').getPublicUrl'), 'Chat attachments private bucket never falls back to public URL');

// 4. Documentation & Minimisation Deliverables
console.log('\n--- 4. Security Documentation & Data Minimisation ---');
const rlsDocPath = path.join(__dirname, '..', 'docs', 'RLS_SUMMARY.md');
assert(fs.existsSync(rlsDocPath), 'docs/RLS_SUMMARY.md exists');
if (fs.existsSync(rlsDocPath)) {
  const rlsDoc = fs.readFileSync(rlsDocPath, 'utf8');
  assert(rlsDoc.includes('is_active_user()'), 'Documents access gating via is_active_user()');
  assert(rlsDoc.includes('personal_documents'), 'Documents personal_documents security rules');
  assert(rlsDoc.includes('Instructors CANNOT read'), 'Documents instructor personal documents restriction');
}

const optionalCleanupPath = path.join(__dirname, '..', 'supabase', 'migrations', 'optional_data_minimisation_cleanup.sql');
assert(fs.existsSync(optionalCleanupPath), 'supabase/migrations/optional_data_minimisation_cleanup.sql exists');

if (errors.length > 0) {
  console.error(`\n❌ Security audit failed with ${errors.length} issue(s).`);
  process.exit(1);
} else {
  console.log('\n🎉 ALL SECURITY AUDIT CHECKS PASSED: Prompt 6 hardening is verified!');
}

