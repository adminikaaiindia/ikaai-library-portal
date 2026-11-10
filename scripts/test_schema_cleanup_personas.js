// ====================================================================
// TEST SUITE: SCHEMA RECONCILIATION & 4 PERSONA VALIDATION
// File: scripts/test_schema_cleanup_personas.js
// Personas:
//   1. HR Intern (Role: intern, Programme: Human Resources)
//   2. Data Analyst Intern (Role: intern, Programme: Data Analyst)
//   3. Instructor (Role: instructor, Programme: Human Resources)
//   4. Admin (Role: admin, Global access)
// ====================================================================

const assert = require('assert');
const fs = require('fs');

console.log('----------------------------------------------------');
console.log('RUNNING AUTOMATED TEST SUITE: SCHEMA RECONCILIATION');
console.log('----------------------------------------------------');

const results = {
  total: 0,
  passed: 0,
  failed: 0,
  details: []
};

function test(name, fn) {
  results.total++;
  try {
    fn();
    results.passed++;
    results.details.push({ name, status: 'PASS' });
    console.log(`[PASS] ${name}`);
  } catch (err) {
    results.failed++;
    results.details.push({ name, status: 'FAIL', error: err.message });
    console.error(`[FAIL] ${name}: ${err.message}`);
  }
}

// Mock Programme IDs matching backend metadata
const PROG_HR = '10000000-0000-0000-0000-000000000001';
const PROG_DATA = '10000000-0000-0000-0000-000000000002';
const PROG_RESEARCH = '10000000-0000-0000-0000-000000000003';

// Mock Personas
const personas = {
  hrIntern: {
    id: 'user_hr_intern_01',
    full_name: 'Aditi Rao',
    display_name: 'Aditi Rao',
    email: 'aditi.rao@ikaaiindia.org',
    role: 'intern',
    programme_id: PROG_HR,
    programme: 'human-resources',
    branch: 'New Delhi / Remote',
    position: 'HR Intern',
    member_since_date: '2026-10-01'
  },
  dataIntern: {
    id: 'user_data_intern_02',
    full_name: 'Rohan Verma',
    display_name: 'Rohan Verma',
    email: 'rohan.verma@ikaaiindia.org',
    role: 'intern',
    programme_id: PROG_DATA,
    programme: 'data-analyst',
    branch: 'Bengaluru / Remote',
    position: 'Data Analyst Intern',
    member_since_date: '2026-10-15'
  },
  instructor: {
    id: 'user_instructor_01',
    full_name: 'Neha Singhal',
    display_name: 'Neha Singhal',
    email: 'neha.singhal@ikaaiindia.org',
    role: 'instructor',
    programme_id: PROG_HR,
    programme: 'human-resources',
    branch: 'New Delhi HQ',
    position: 'Senior Faculty',
    member_since_date: '2026-06-01'
  },
  admin: {
    id: 'user_admin_01',
    full_name: 'Devashish Chauhan',
    display_name: 'Devashish Chauhan',
    email: 'devashish.chauhan@ikaaiindia.org',
    role: 'admin',
    programme_id: null,
    programme: 'all',
    branch: 'New Delhi HQ',
    position: 'Director of Operations',
    member_since_date: '2026-01-01'
  }
};

// Simulation of guard_profile_updates() database trigger logic
function simulateGuardProfileUpdates(caller, oldProfile, newProfile) {
  const isAdmin = caller.role === 'admin';
  if (!isAdmin) {
    if (newProfile.role !== undefined && newProfile.role !== oldProfile.role) {
      throw new Error('Only administrators can change account roles.');
    }
    if (newProfile.email !== undefined && newProfile.email !== oldProfile.email) {
      throw new Error('Only administrators can change email addresses.');
    }
    if (newProfile.branch !== undefined && newProfile.branch !== oldProfile.branch) {
      throw new Error('Only administrators can change branch location.');
    }
    if (newProfile.position !== undefined && newProfile.position !== oldProfile.position) {
      throw new Error('Only administrators can change position title.');
    }
    if (newProfile.created_at !== undefined && newProfile.created_at !== oldProfile.created_at) {
      throw new Error('Account creation timestamp cannot be modified.');
    }
    if (oldProfile.programme_id && newProfile.programme_id !== undefined && newProfile.programme_id !== oldProfile.programme_id) {
      throw new Error('Only administrators can change assigned programmes.');
    }
    if (oldProfile.programme_id && newProfile.programme !== undefined && newProfile.programme !== oldProfile.programme) {
      throw new Error('Only administrators can change assigned programmes.');
    }
  }

  // Synchronize full_name as single source of truth
  const full_name = newProfile.full_name || oldProfile.full_name;
  return {
    ...oldProfile,
    ...newProfile,
    full_name,
    display_name: full_name, // mirrored for legacy compatibility
    updated_at: new Date().toISOString()
  };
}

// Simulation of submit_exam() and allow_exam_retake()
const examSubmissionsTable = [];

function simulateSubmitExam(caller, programmeId, answers) {
  const existing = examSubmissionsTable.find(
    s => s.user_id === caller.id && s.programme_id === programmeId
  );

  if (existing) {
    if (['submitted', 'graded'].includes(existing.status) && !existing.allow_retake) {
      throw new Error('Exam has already been submitted for this programme. Retakes are not allowed unless permitted by an instructor.');
    }
    existing.status = 'submitted';
    existing.submitted_at = new Date().toISOString();
    existing.allow_retake = false;
    existing.answers = answers;
    return { submission_id: existing.id, status: 'submitted', retake: true };
  }

  const newSub = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    user_id: caller.id,
    programme_id: programmeId,
    status: 'submitted',
    submitted_at: new Date().toISOString(),
    allow_retake: false,
    answers: answers
  };
  examSubmissionsTable.push(newSub);
  return { submission_id: newSub.id, status: 'submitted', retake: false };
}

function simulateAllowExamRetake(caller, submissionId) {
  if (caller.role !== 'admin' && caller.role !== 'instructor') {
    throw new Error('Only instructors or administrators can permit exam retakes.');
  }
  const sub = examSubmissionsTable.find(s => s.id === submissionId);
  if (!sub) throw new Error('Exam submission not found.');

  if (caller.role === 'instructor' && caller.programme_id !== sub.programme_id) {
    throw new Error('You are not authorized to permit retakes for this programme.');
  }

  sub.allow_retake = true;
  return { success: true, submission_id: submissionId, allow_retake: true };
}

// Simulation of message_threads filtering via programme_id and role
const mockThreads = [
  {
    id: 'thread_1',
    programme_id: PROG_HR,
    programme: 'hr',
    learner_id: 'user_hr_intern_01',
    subject: 'HR Policy Query',
    category: 'module_question',
    status: 'open',
    rating: null
  },
  {
    id: 'thread_2',
    programme_id: PROG_DATA,
    programme: 'data',
    learner_id: 'user_data_intern_02',
    subject: 'Python pandas query',
    category: 'technical_issue',
    status: 'answered',
    rating: 'up'
  },
  {
    id: 'thread_3',
    programme_id: PROG_HR,
    programme: 'hr',
    learner_id: 'user_other_intern',
    subject: 'HR attendance leave',
    category: 'leave_attendance',
    status: 'resolved',
    rating: 'up'
  }
];

function simulateQueryThreads(caller) {
  return mockThreads.filter(t => {
    if (caller.role === 'admin') return true;
    if (caller.role === 'instructor') {
      return t.programme_id === caller.programme_id;
    }
    // Learner can only see their own threads in their programme
    return t.learner_id === caller.id && t.programme_id === caller.programme_id;
  });
}

// ====================================================================
// TEST EXECUTION
// ====================================================================

// 1. PERSONA 1: HR INTERN
test('HR Intern cannot change assigned programme_id or programme text column', () => {
  assert.throws(() => {
    simulateGuardProfileUpdates(personas.hrIntern, personas.hrIntern, { programme_id: PROG_DATA });
  }, /Only administrators can change assigned programmes/);

  assert.throws(() => {
    simulateGuardProfileUpdates(personas.hrIntern, personas.hrIntern, { programme: 'data-analyst' });
  }, /Only administrators can change assigned programmes/);
});

test('HR Intern cannot elevate role, email, branch, or position', () => {
  assert.throws(() => {
    simulateGuardProfileUpdates(personas.hrIntern, personas.hrIntern, { role: 'admin' });
  }, /Only administrators can change account roles/);

  assert.throws(() => {
    simulateGuardProfileUpdates(personas.hrIntern, personas.hrIntern, { email: 'hacked@ikaaiindia.org' });
  }, /Only administrators can change email addresses/);

  assert.throws(() => {
    simulateGuardProfileUpdates(personas.hrIntern, personas.hrIntern, { position: 'Chief Operations Officer' });
  }, /Only administrators can change position title/);
});

test('HR Intern user name displays consistently from full_name', () => {
  const updated = simulateGuardProfileUpdates(personas.hrIntern, personas.hrIntern, { full_name: 'Aditi Rao Sharma' });
  assert.strictEqual(updated.full_name, 'Aditi Rao Sharma');
  assert.strictEqual(updated.display_name, 'Aditi Rao Sharma');
});

test('HR Intern sees only own HR threads matching programme_id', () => {
  const threads = simulateQueryThreads(personas.hrIntern);
  assert.strictEqual(threads.length, 1);
  assert.strictEqual(threads[0].id, 'thread_1');
  assert.strictEqual(threads[0].programme_id, PROG_HR);
});

test('HR Intern cannot submit a second exam without retake permission', () => {
  const sub1 = simulateSubmitExam(personas.hrIntern, PROG_HR, { q1: 'HR Answer 1' });
  assert.strictEqual(sub1.status, 'submitted');

  assert.throws(() => {
    simulateSubmitExam(personas.hrIntern, PROG_HR, { q1: 'HR Answer 2' });
  }, /Retakes are not allowed unless permitted by an instructor/);
});

// 2. PERSONA 2: DATA ANALYST INTERN
test('Data Analyst Intern cannot change assigned programme or role', () => {
  assert.throws(() => {
    simulateGuardProfileUpdates(personas.dataIntern, personas.dataIntern, { programme_id: PROG_HR });
  }, /Only administrators can change assigned programmes/);

  assert.throws(() => {
    simulateGuardProfileUpdates(personas.dataIntern, personas.dataIntern, { role: 'instructor' });
  }, /Only administrators can change account roles/);
});

test('Data Analyst Intern threads isolate to Data Analyst programme_id', () => {
  const threads = simulateQueryThreads(personas.dataIntern);
  assert.strictEqual(threads.length, 1);
  assert.strictEqual(threads[0].id, 'thread_2');
  assert.strictEqual(threads[0].programme_id, PROG_DATA);
});

test('Data Analyst Intern exam duplicate submission is blocked', () => {
  simulateSubmitExam(personas.dataIntern, PROG_DATA, { q1: 'Data Answer 1' });
  assert.throws(() => {
    simulateSubmitExam(personas.dataIntern, PROG_DATA, { q1: 'Data Answer 2' });
  }, /Retakes are not allowed unless permitted by an instructor/);
});

// 3. PERSONA 3: INSTRUCTOR
test('Instructor can view all threads in their programme (PROG_HR)', () => {
  const threads = simulateQueryThreads(personas.instructor);
  // Instructor in PROG_HR sees both thread_1 and thread_3
  assert.strictEqual(threads.length, 2);
  assert(threads.every(t => t.programme_id === PROG_HR));
});

test('Instructor cannot permit retake for a different programme', () => {
  const dataSub = examSubmissionsTable.find(s => s.user_id === personas.dataIntern.id);
  assert(dataSub, 'Data intern submission must exist');
  assert.throws(() => {
    simulateAllowExamRetake(personas.instructor, dataSub.id);
  }, /You are not authorized to permit retakes for this programme/);
});

test('Instructor permits retake for HR Intern, and HR Intern can then resubmit', () => {
  const hrSub = examSubmissionsTable.find(s => s.user_id === personas.hrIntern.id);
  assert(hrSub, 'HR intern submission must exist');
  
  const grant = simulateAllowExamRetake(personas.instructor, hrSub.id);
  assert.strictEqual(grant.allow_retake, true);

  // Resubmission now succeeds
  const subRetake = simulateSubmitExam(personas.hrIntern, PROG_HR, { q1: 'HR Answer Retake' });
  assert.strictEqual(subRetake.retake, true);
  assert.strictEqual(subRetake.status, 'submitted');
});

// 4. PERSONA 4: ADMIN
test('Admin can view all threads across all programmes', () => {
  const threads = simulateQueryThreads(personas.admin);
  assert.strictEqual(threads.length, 3);
});

test('Admin can update user programme_id and role', () => {
  const updatedUser = simulateGuardProfileUpdates(personas.admin, personas.hrIntern, {
    role: 'instructor',
    programme_id: PROG_RESEARCH,
    programme: 'social-research-policy'
  });
  assert.strictEqual(updatedUser.role, 'instructor');
  assert.strictEqual(updatedUser.programme_id, PROG_RESEARCH);
});

test('Admin can allow retakes across any programme', () => {
  const dataSub = examSubmissionsTable.find(s => s.user_id === personas.dataIntern.id);
  const grant = simulateAllowExamRetake(personas.admin, dataSub.id);
  assert.strictEqual(grant.allow_retake, true);
});

// 5. SCHEMA FILE INTEGRITY CHECKS
test('20261106_01_schema_reconciliation.sql contains all required constraint & backfill operations', () => {
  const sql = fs.readFileSync('supabase/migrations/20261106_01_schema_reconciliation.sql', 'utf-8');
  assert(sql.includes('member_since_date date'), 'Missing member_since_date column');
  assert(sql.includes('created_at timestamptz'), 'Missing created_at column');
  assert(sql.includes('phone text'), 'Missing phone column');
  assert(sql.includes('module_ref uuid'), 'Missing module_ref column');
  assert(sql.includes('chk_message_threads_status'), 'Missing status check constraint');
  assert(sql.includes('chk_message_threads_category'), 'Missing category check constraint');
  assert(sql.includes('chk_message_threads_rating'), 'Missing rating check constraint');
  assert(sql.includes('allow_retake boolean'), 'Missing allow_retake column');
  assert(sql.includes('uq_exam_sub_user_prog'), 'Missing exam_submissions unique constraint');
  assert(sql.includes('chk_feedback_status'), 'Missing feedback status check');
  assert(sql.includes('guard_profile_updates'), 'Missing guard_profile_updates');
});

test('verify_schema_cleanup.sql contains audits for all reconciliation targets', () => {
  const sql = fs.readFileSync('supabase/verify_schema_cleanup.sql', 'utf-8');
  assert(sql.includes('unbackfilled_member_since_date'));
  assert(sql.includes('unbackfilled_programme_id'));
  assert(sql.includes('invalid_status_count'));
  assert(sql.includes('submission_count'));
  assert(sql.includes('trg_guard_profile_updates'));
});

test('20261106_02_drop_deprecated_columns.sql safely handles optional future column dropping', () => {
  const sql = fs.readFileSync('supabase/migrations/20261106_02_drop_deprecated_columns.sql', 'utf-8');
  assert(sql.includes('drop column if exists display_name'));
  assert(sql.includes('drop column if exists programme'));
  assert(sql.includes('drop column if exists member_since'));
  assert(sql.includes('drop column if exists module_id'));
});

console.log('\n====================================================');
console.log(`TOTAL TESTS: ${results.total} | PASSED: ${results.passed} | FAILED: ${results.failed}`);
console.log('====================================================');

if (results.failed > 0) {
  process.exit(1);
}

