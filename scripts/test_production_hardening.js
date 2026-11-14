/**
 * Comprehensive Automated Verification for Production Hardening (Phase 2)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

function testProductionHardening() {
  console.log('=== RUNNING PRODUCTION HARDENING VALIDATION ===\n');
  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${message}`);
      failed++;
    }
  }

  // 1. Migration 20261114_17
  const migPath = path.join(ROOT, 'supabase', 'migrations', '20261114_17_production_hardening.sql');
  assert(fs.existsSync(migPath), 'Migration 20261114_17 exists');
  const migSql = fs.readFileSync(migPath, 'utf8');

  assert(migSql.includes('alter table if exists public.chat_conversations enable row level security;'), 'RLS enabled on chat_conversations');
  assert(migSql.includes('alter table if exists public.chat_messages enable row level security;'), 'RLS enabled on chat_messages');
  assert(migSql.includes('alter table if exists public.chat_conversation_members enable row level security;'), 'RLS enabled on chat_conversation_members');
  assert(migSql.includes('alter table if exists public.chat_attachments enable row level security;'), 'RLS enabled on chat_attachments');
  assert(migSql.includes('alter table if exists public.chat_reactions enable row level security;'), 'RLS enabled on chat_reactions');
  assert(migSql.includes('can_access_chat_conversation(conv_id text, check_user_id uuid)'), 'can_access_chat_conversation supports text conv_id');
  assert(migSql.includes('revoke execute on all functions in schema public from public, anon;'), 'Execute revoked on all public functions from anon/public');
  assert(migSql.includes('grant execute on all functions in schema public to authenticated;'), 'Execute granted to authenticated');
  assert(migSql.includes('file_size_limit = 10485760'), 'Storage bucket 10MB limit set');
  assert(migSql.includes('idx_chat_msg_conv_deleted'), 'Composite index idx_chat_msg_conv_deleted present');
  assert(migSql.includes('idx_exam_sub_status_grade'), 'Composite index idx_exam_sub_status_grade present');
  assert(migSql.includes('drop table if exists public.backup_profiles_20261106'), 'Backup tables drop included');
  assert(migSql.includes("notify pgrst, 'reload schema';"), 'Schema reload notify included');

  // 2. Verification file verify_20261114_17.sql
  const verPath = path.join(ROOT, 'supabase', 'migrations', 'verify_20261114_17.sql');
  assert(fs.existsSync(verPath), 'Verification file verify_20261114_17.sql exists');

  // 3. index.html checks
  const htmlPath = path.join(ROOT, 'index.html');
  const html = fs.readFileSync(htmlPath, 'utf8');
  assert(html.includes('meta name="referrer" content="strict-origin-when-cross-origin"'), 'Referrer-Policy meta tag present in index.html');
  assert(html.includes('window.top !== window.self'), 'Frame-busting check present in index.html');
  assert(!html.includes('script src="jd-data.js'), 'jd-data.js script tag removed from index.html');
  assert(!html.includes('s.kumar@ikaaiindia.org'), 'Mock email s.kumar@ikaaiindia.org removed from index.html');
  assert(html.includes('id="offlineStateContainer"'), 'Offline fallback container present in index.html');
  assert(!html.includes('<option value="custom">Custom Role...</option>'), 'Custom role removed from Admin invite options');

  // 4. app.js checks
  const appPath = path.join(ROOT, 'app.js');
  const app = fs.readFileSync(appPath, 'utf8');
  assert(!app.includes('isDemoAuth = !isConfigured'), 'isDemoAuth fallback removed from app.js');
  assert(!app.includes('akshaytiwarigaming@gmail.com'), 'Developer personal email removed from app.js');
  assert(!app.includes('akshaytiwari8527@gmail.com'), 'Developer personal email removed from app.js');
  assert(!app.includes("cleanEmail === 'admin.ikaaiindia@gmail.com'"), 'Hardcoded admin email bypass removed from app.js');

  // 5. data.js checks
  const dataPath = path.join(ROOT, 'data.js');
  const data = fs.readFileSync(dataPath, 'utf8');
  assert(!data.includes("cleanEmail === 'admin.ikaaiindia@gmail.com'"), 'Hardcoded admin check removed from data.js');
  assert(!data.includes('akshaytiwarigaming@gmail.com'), 'Developer email removed from data.js');
  assert(!data.includes('updates.display_name = trimmed;'), 'Deprecated display_name update removed from data.js');

  // 6. styles.css checks
  const cssPath = path.join(ROOT, 'styles.css');
  const css = fs.readFileSync(cssPath, 'utf8');
  assert(css.includes(':focus-visible'), ':focus-visible keyboard focus styling present in styles.css');

  console.log(`\n====================================================`);
  console.log(`TOTAL CHECKS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log(`====================================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

testProductionHardening();
