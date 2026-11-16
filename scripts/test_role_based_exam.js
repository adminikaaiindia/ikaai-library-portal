// scripts/test_role_based_exam.js
// Automated verification suite for the 11-role role-based examination system.

const fs = require('fs');
const path = require('path');

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    testsPassed++;
    console.log(`  ✓ ${message}`);
  } else {
    testsFailed++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log('\n=== RUNNING ROLE-BASED EXAM VERIFICATION SUITE ===\n');

// 1. Verify Migration 19
console.log('1. Verifying Migration 19 (supabase/migrations/20261116_19_role_based_exam.sql)...');
const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20261116_19_role_based_exam.sql');
assert(fs.existsSync(migrationPath), 'Migration 19 file exists');
const migrationSql = fs.readFileSync(migrationPath, 'utf8');

assert(/alter\s+table\s+public\.profiles\s+add\s+column\s+if\s+not\s+exists\s+job_id\s+uuid\s+references\s+public\.jobs\(id\)/i.test(migrationSql), 'profiles has job_id foreign key');
assert(/alter\s+table\s+public\.access_invites\s+add\s+column\s+if\s+not\s+exists\s+job_id\s+uuid\s+references\s+public\.jobs\(id\)/i.test(migrationSql), 'access_invites has job_id foreign key');
assert(migrationSql.includes('create table if not exists public.exam_question_options'), 'exam_question_options table created');
assert(/uq_exam_question_options_correct/i.test(migrationSql), 'Partial unique index enforces exactly one correct option per MCQ');
assert(migrationSql.includes('create or replace function public.get_exam_paper()'), 'get_exam_paper() RPC defined');
assert(migrationSql.includes('create or replace function public.submit_exam'), 'submit_exam() RPC defined');
assert(migrationSql.includes('create or replace function public.grade_exam'), 'grade_exam() RPC defined');
assert(/update\s+public\.exam_questions\s+set\s+is_active\s*=\s*false\s+where\s+job_id\s+is\s+null/i.test(migrationSql), 'Deactivates legacy questions rather than deleting');
assert(migrationSql.includes('revoke execute on function public.get_exam_paper() from public, anon'), 'Revokes public/anon execute on get_exam_paper');

// 2. Verify Seed File
console.log('\n2. Verifying Seed File (supabase/seed_exam_questions.sql)...');
const seedPath = path.join(__dirname, '..', 'supabase', 'seed_exam_questions.sql');
assert(fs.existsSync(seedPath), 'Seed file exists');
const seedSql = fs.readFileSync(seedPath, 'utf8');

const expectedJobIds = [
  '90000000-0000-0000-0000-000000000001',
  '90000000-0000-0000-0000-000000000002',
  '90000000-0000-0000-0000-000000000003',
  '90000000-0000-0000-0000-000000000004',
  '90000000-0000-0000-0000-000000000005',
  '90000000-0000-0000-0000-000000000006',
  '90000000-0000-0000-0000-000000000007',
  '90000000-0000-0000-0000-000000000008',
  '90000000-0000-0000-0000-000000000009',
  '90000000-0000-0000-0000-000000000010',
  '90000000-0000-0000-0000-000000000011'
];

expectedJobIds.forEach(id => {
  assert(seedSql.includes(id), `Seed references job ${id}`);
});

// Check question counts
const questionInsertMatches = seedSql.match(/insert into public\.exam_questions/gi) || [];
assert(questionInsertMatches.length >= 1, 'Question inserts present');

// Count MCQ vs Written
const mcqCount = (seedSql.match(/'mcq'/g) || []).length;
const writtenCount = (seedSql.match(/'written'/g) || []).length;
assert(mcqCount === 66, `Exactly 66 MCQs across 11 roles (6 per role), found ${mcqCount}`);
assert(writtenCount === 44, `Exactly 44 Written questions across 11 roles (4 per role), found ${writtenCount}`);

// Count options
const optionMatches = (seedSql.match(/insert into public\.exam_question_options/gi) || []).length;
assert(optionMatches >= 1, 'Option inserts present');
const trueMatches = (seedSql.match(/,\s*true\s*,\s*\d+\s*\)/gi) || []).length;
assert(trueMatches === 66, `Exactly 66 correct MCQ options across 11 roles (1 per MCQ), found ${trueMatches}`);

// 3. Verify Optional Deletion Script
console.log('\n3. Verifying Optional Deletion Script...');
const optPath = path.join(__dirname, '..', 'supabase', 'optional_delete_old_exam_questions.sql');
assert(fs.existsSync(optPath), 'Optional deletion script exists');
const optSql = fs.readFileSync(optPath, 'utf8');
assert(/delete\s+from\s+public\.exam_questions\s+where\s+is_active\s*=\s*false\s+and\s+job_id\s+is\s+null/i.test(optSql), 'Optional script safely deletes legacy questions');

// 4. Verify data.js
console.log('\n4. Verifying data.js...');
const dataJsPath = path.join(__dirname, '..', 'data.js');
const dataJs = fs.readFileSync(dataJsPath, 'utf8');

assert(dataJs.includes('async getExamPaper()'), 'DataLayer.getExamPaper is defined');
assert(dataJs.includes("rpc('get_exam_paper')"), 'getExamPaper calls get_exam_paper RPC');
assert(dataJs.includes('selected_option_id'), 'getExamSubmission selects selected_option_id');
assert(dataJs.includes('adminInviteUser({ email, role, programmeId, position, jobId })'), 'adminInviteUser handles jobId');
assert(dataJs.includes('adminUpdateUserAccess(userId, { role, programmeId, position, email, jobId })'), 'adminUpdateUserAccess handles jobId');

// 5. Verify app.js
console.log('\n5. Verifying app.js...');
const appJsPath = path.join(__dirname, '..', 'app.js');
const appJs = fs.readFileSync(appJsPath, 'utf8');

expectedJobIds.forEach(id => {
  assert(appJs.includes(id), `app.js JD_ASSIGNMENT_MAP references job ${id}`);
});

assert(appJs.includes('examUnassignedNotice'), 'app.js handles unassigned role state');
assert(appJs.includes('Role unassigned'), 'app.js updates status pill for unassigned role');
assert(appJs.includes('examAnsweredCounter'), 'app.js includes live answered counter');
assert(appJs.includes('gradeLiveTotalScore'), 'app.js includes live grading preview');
assert(appJs.includes('Role not assigned'), 'app.js displays "Role not assigned" badge in admin table for unassigned interns');

// Security check: learner review mode never leaks correct answer
const reviewSection = appJs.slice(appJs.indexOf('if (el.reviewExamBtn)'), appJs.indexOf('if (el.reviewExamBtn)') + 3000);
assert(!reviewSection.includes('opt.is_correct'), 'Learner review mode does NOT reveal is_correct to learner');

// 6. Verify index.html & styles.css
console.log('\n6. Verifying index.html & styles.css...');
const htmlPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
assert(html.includes('<th style="padding: 10px 12px;">Role</th>'), 'instructorExamTable header includes Role column');
assert(html.includes('id="examUnassignedNotice"'), 'index.html contains examUnassignedNotice container');
assert(html.includes('id="gradeLiveScorePreview"'), 'index.html contains gradeLiveScorePreview container');
assert(html.includes('id="gradeLearnerRole"'), 'index.html contains gradeLearnerRole');

const stylesPath = path.join(__dirname, '..', 'styles.css');
const styles = fs.readFileSync(stylesPath, 'utf8');
assert(styles.includes('.exam-mcq-grid'), 'styles.css contains .exam-mcq-grid');
assert(styles.includes('.exam-option-card'), 'styles.css contains .exam-option-card');
assert(styles.includes('.exam-marking-guide-box'), 'styles.css contains .exam-marking-guide-box');

console.log(`\n==================================================`);
console.log(`TEST RESULTS: ${testsPassed} passed, ${testsFailed} failed`);
console.log(`==================================================\n`);

if (testsFailed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
