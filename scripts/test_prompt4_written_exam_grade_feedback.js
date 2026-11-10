const fs = require('fs');
const assert = require('assert');

console.log('=== PROMPT 4 VERIFICATION: WRITTEN EXAM, GRADE & FEEDBACK ===\n');

// 1. Read files
const html = fs.readFileSync('index.html', 'utf8');
const dataJs = fs.readFileSync('data.js', 'utf8');
const appJs = fs.readFileSync('app.js', 'utf8');
const migrationSql = fs.readFileSync('supabase/migrations/20261106_06_exam_grade_feedback.sql', 'utf8');

// 2. Migration Checks
console.log('1. Checking Database Migration...');
assert.ok(migrationSql.includes('save_exam_draft'), 'Migration must declare save_exam_draft function');
assert.ok(migrationSql.includes('submit_exam'), 'Migration must declare submit_exam function');
assert.ok(migrationSql.includes('grade_exam'), 'Migration must declare grade_exam function');
assert.ok(migrationSql.includes('allow_exam_retake'), 'Migration must declare allow_exam_retake function');
assert.ok(migrationSql.includes('submit_feedback'), 'Migration must declare submit_feedback function');
assert.ok(migrationSql.includes('get_cohort_grade_roster'), 'Migration must declare get_cohort_grade_roster function');
assert.ok(migrationSql.includes('mark_feedback_reviewed'), 'Migration must declare mark_feedback_reviewed function');
assert.ok(migrationSql.includes('is_anonymous'), 'Migration must support is_anonymous column in feedback');
assert.ok(migrationSql.includes('chk_exam_submissions_status'), 'Migration must support draft in exam_submissions status');
console.log('   ✓ Database migration SQL verified.');

// 3. DataLayer Client Methods Checks
console.log('2. Checking DataLayer (data.js) methods...');
assert.ok(dataJs.includes('saveExamDraft('), 'DataLayer must provide saveExamDraft');
assert.ok(dataJs.includes('submitExam('), 'DataLayer must provide submitExam');
assert.ok(dataJs.includes('gradeExam('), 'DataLayer must provide gradeExam');
assert.ok(dataJs.includes('allowExamRetake('), 'DataLayer must provide allowExamRetake');
assert.ok(dataJs.includes('getInstructorExamSubmissions('), 'DataLayer must provide getInstructorExamSubmissions');
assert.ok(dataJs.includes('getCohortGradeRoster('), 'DataLayer must provide getCohortGradeRoster');
assert.ok(dataJs.includes('submitFeedback('), 'DataLayer must provide submitFeedback with anonymous option');
assert.ok(dataJs.includes('getMyFeedbackHistory('), 'DataLayer must provide getMyFeedbackHistory');
assert.ok(dataJs.includes('getInstructorFeedbackList('), 'DataLayer must provide getInstructorFeedbackList');
assert.ok(dataJs.includes('markFeedbackReviewed('), 'DataLayer must provide markFeedbackReviewed');
console.log('   ✓ DataLayer methods verified.');

// 4. Written Exam UI Checks
console.log('3. Checking Written Exam UI & Controllers...');
assert.ok(html.includes('id="saveDraftExamBtn"'), 'HTML must have save draft button');
assert.ok(html.includes('id="submitExamBtn"'), 'HTML must have submit exam button');
assert.ok(html.includes('id="retakeExamBtn"'), 'HTML must have retake exam button');
assert.ok(html.includes('id="instructorExamReviewSection"'), 'HTML must have instructor exam review section');
assert.ok(html.includes('id="gradeExamModal"'), 'HTML must have instructor grading modal');
assert.ok(appJs.includes('saveDraftExamBtn'), 'app.js must wire save draft button');
assert.ok(appJs.includes('retakeExamBtn'), 'app.js must wire retake button');
assert.ok(appJs.includes('openGradeExamModal'), 'app.js must provide grading modal controller');
console.log('   ✓ Written Exam UI and controllers verified.');

// 5. Grade Report UI & Honest Empty State Checks
console.log('4. Checking Grade Report & Cohort Roster...');
assert.ok(html.includes('id="learnerGradeEmptyState"'), 'HTML must provide honest empty state for learners');
assert.ok(html.includes('id="cohortGradeRosterSection"'), 'HTML must provide cohort roster section');
assert.ok(html.includes('id="exportCohortCsvBtn"'), 'HTML must provide CSV export button');
assert.ok(!html.includes('A (95%)'), 'HTML must not have hardcoded A (95%) dummy grades');
assert.ok(appJs.includes('exportCohortCsvBtn'), 'app.js must wire CSV export button');
assert.ok(appJs.includes('learnerGradeEmptyState'), 'app.js must toggle honest empty state');
console.log('   ✓ Grade Report and Cohort Roster verified.');

// 6. Feedback UI & Rate Limiting Checks
console.log('5. Checking Feedback Screen...');
assert.ok(html.includes('id="feedbackModuleSelect"'), 'HTML must provide related module selector');
assert.ok(html.includes('id="feedbackIsAnonymousCheckbox"'), 'HTML must provide anonymous checkbox');
assert.ok(html.includes('id="instructorFeedbackInboxCard"'), 'HTML must provide instructor feedback inbox card');
assert.ok(appJs.includes('feedbackIsAnonymousCheckbox'), 'app.js must handle anonymous feedback toggle');
assert.ok(appJs.includes('markFeedbackReviewed'), 'app.js must wire feedback review action');
assert.ok(appJs.includes('len < 10 || len > 1000') || appJs.includes('text.length < 10 || text.length > 1000'), 'app.js must enforce 10-1000 character validation');
console.log('   ✓ Feedback UI and controllers verified.');

console.log('\n=============================================================');
console.log('🎉 ALL PROMPT 4 VERIFICATIONS PASSED SUCCESSFULLY!');
console.log('=============================================================');

