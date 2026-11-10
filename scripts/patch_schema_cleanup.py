import os

def patch_data_js():
    with open('data.js', 'r', encoding='utf-8') as f:
        c = f.read()

    # 1. Update updateProfile display_name comment
    old_up = """        const updates = { updated_at: new Date().toISOString() };
        if (fullName !== undefined) {
          updates.full_name = fullName;
          updates.display_name = fullName;
        }"""
    new_up = """        const updates = { updated_at: new Date().toISOString() };
        if (fullName !== undefined) {
          updates.full_name = fullName;
          // Deprecated: display_name is mirrored for backward compatibility only
          updates.display_name = fullName;
        }"""
    if old_up in c:
        c = c.replace(old_up, new_up, 1)

    # 2. Update adminGetUsers search query to use full_name
    target_search = "query = query.or(`display_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`);"
    replace_search = "query = query.or(`full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`);"
    if target_search in c:
        c = c.replace(target_search, replace_search, 1)

    # 3. Add allowExamRetake to DataLayer
    old_grade = "    async gradeExam(submissionId, marks, comment) {"
    new_retake = """    async allowExamRetake(submissionId) {
      const client = getClient();
      if (isLive()) {
        const { data, error } = await client.rpc('allow_exam_retake', {
          p_submission_id: submissionId
        });
        if (error) throw error;
        return data;
      }
      return { success: true, allow_retake: true };
    },

    async gradeExam(submissionId, marks, comment) {"""
    if old_grade in c and "allowExamRetake" not in c:
        c = c.replace(old_grade, new_retake, 1)

    with open('data.js', 'w', encoding='utf-8', newline='') as f:
        f.write(c)
    print("data.js successfully patched")


def patch_index_html():
    with open('index.html', 'r', encoding='utf-8') as f:
        c = f.read()

    # Normalize category options in newThreadCategorySelect
    old_cat_options = """                      <option value="Module question">Module question</option>
                      <option value="Technical issue">Technical issue</option>
                      <option value="Exam or grading">Exam or grading</option>
                      <option value="Leave or attendance">Leave or attendance</option>
                      <option value="Other">Other</option>"""

    new_cat_options = """                      <option value="module_question">Module question</option>
                      <option value="technical_issue">Technical issue</option>
                      <option value="exam_grading">Exam or grading</option>
                      <option value="leave_attendance">Leave or attendance</option>
                      <option value="other">Other</option>"""

    if old_cat_options in c:
        c = c.replace(old_cat_options, new_cat_options, 1)

    # Normalize category options in inboxCategoryFilter
    old_inbox_cats = """                        <option value="Module question">Module question</option>
                        <option value="Technical issue">Technical issue</option>
                        <option value="Exam or grading">Exam or grading</option>
                        <option value="Leave or attendance">Leave or attendance</option>
                        <option value="Other">Other</option>"""

    new_inbox_cats = """                        <option value="module_question">Module question</option>
                        <option value="technical_issue">Technical issue</option>
                        <option value="exam_grading">Exam or grading</option>
                        <option value="leave_attendance">Leave or attendance</option>
                        <option value="other">Other</option>"""

    if old_inbox_cats in c:
        c = c.replace(old_inbox_cats, new_inbox_cats, 1)

    with open('index.html', 'w', encoding='utf-8', newline='') as f:
        f.write(c)
    print("index.html successfully patched")


def patch_app_js():
    with open('app.js', 'r', encoding='utf-8') as f:
        c = f.read()

    # 1. Update user name display in admin table: ${u.full_name || u.display_name || 'User'}
    # Keep u.full_name as single source of truth
    old_table_user = "${u.full_name || u.display_name || 'User'}"
    new_table_user = "${u.full_name || 'User'}"
    if old_table_user in c:
        c = c.replace(old_table_user, new_table_user)

    # 2. Update user name display in chat fallback
    old_chat_name = "name = currentUserProfile.display_name || name;"
    new_chat_name = "name = currentUserProfile.full_name || currentUserProfile.display_name || name;"
    if old_chat_name in c:
        c = c.replace(old_chat_name, new_chat_name)

    # 3. Add category normalization helper and friendly labels
    category_helper = """
  // Category helper for check constraint compliance ('module_question', 'technical_issue', 'exam_grading', 'leave_attendance', 'other')
  const SUPPORT_CATEGORY_LABELS = {
    module_question: 'Module question',
    technical_issue: 'Technical issue',
    exam_grading: 'Exam or grading',
    leave_attendance: 'Leave or attendance',
    other: 'Other'
  };

  function normalizeSupportCategory(cat) {
    if (!cat) return 'other';
    const c = String(cat).toLowerCase().trim().replace(/[\\s\\/-]+/g, '_');
    if (['module_question', 'technical_issue', 'exam_grading', 'leave_attendance', 'other'].includes(c)) return c;
    if (c.includes('module')) return 'module_question';
    if (c.includes('technical') || c.includes('tech')) return 'technical_issue';
    if (c.includes('exam') || c.includes('grade') || c.includes('grading')) return 'exam_grading';
    if (c.includes('leave') || c.includes('attend')) return 'leave_attendance';
    return 'other';
  }
"""

    if "function normalizeSupportCategory" not in c:
        # insert right before generateDefaultSeedThreads
        target_fn = "  // Initial Seed generator for local storage fallback"
        if target_fn in c:
            c = c.replace(target_fn, category_helper + "\n" + target_fn, 1)

    # 4. Update generateDefaultSeedThreads categories to normalized check constraint values
    c = c.replace("category: 'Module question',", "category: 'module_question', // check constraint compliant\n        programme_id: getProgrammeDbId(currentProgrammeId),")
    c = c.replace("category: 'Technical issue',", "category: 'technical_issue', // check constraint compliant\n        programme_id: getProgrammeDbId(currentProgrammeId),")
    c = c.replace("category: 'Exam or grading',", "category: 'exam_grading', // check constraint compliant\n        programme_id: getProgrammeDbId(currentProgrammeId),")

    # 5. Update rating in seed thread 3 from 'helpful' to 'up'
    c = c.replace("rating: 'helpful',", "rating: 'up', // check constraint: 'up' | 'down' | null")

    # 6. Update support thread filtering to match on programme_id
    old_badge_filter = """    const visibleThreads = isLearner && currentUser.id
      ? threads.filter(t => {
          if (t.programme && t.programme !== currentProgrammeId) return false;"""

    new_badge_filter = """    const currentDbProgId = getProgrammeDbId(currentProgrammeId);
    const visibleThreads = isLearner && currentUser.id
      ? threads.filter(t => {
          const progId = t.programme_id ? getProgrammeKey(t.programme_id) : (t.programme ? getProgrammeKey(t.programme) : null);
          if (progId && progId !== currentProgrammeId) return false;"""

    if old_badge_filter in c:
        c = c.replace(old_badge_filter, new_badge_filter, 1)

    old_filter_prog = """    return threads.filter(t => {
      // Programme match
      if (t.programme && t.programme !== currentProgrammeId) return false;"""

    new_filter_prog = """    return threads.filter(t => {
      // Programme match via relational programme_id or legacy programme key
      const progId = t.programme_id ? getProgrammeKey(t.programme_id) : (t.programme ? getProgrammeKey(t.programme) : null);
      if (progId && progId !== currentProgrammeId) return false;"""

    if old_filter_prog in c:
        c = c.replace(old_filter_prog, new_filter_prog, 1)

    # 7. Update new thread creation in handleCreateNewThreadSubmit
    old_new_thread_obj = """    const newThread = {
      id: threadId,
      programme: currentProgrammeId,
      subject: subject,
      category: category,"""

    new_new_thread_obj = """    const progId = getProgrammeDbId(currentProgrammeId);
    const normalizedCat = normalizeSupportCategory(category);
    const newThread = {
      id: threadId,
      programme_id: progId, // Relational reference
      programme: currentProgrammeId, // Deprecated: backward compatibility
      subject: subject,
      category: normalizedCat, // Check constraint compliant
      module_ref: linkedModule ? (linkedModule.id && linkedModule.id.length > 20 ? linkedModule.id : null) : null,"""

    if old_new_thread_obj in c:
        c = c.replace(old_new_thread_obj, new_new_thread_obj, 1)

    # 8. Update rating handlers to use 'up' and 'down'
    old_rating_submit = """    thread.rating = selectedRatingTemp;
    thread.rating_comment = (el.ratingCommentInput.value || '').trim();"""

    new_rating_submit = """    // Normalize rating to check constraint ('up' | 'down')
    const normalizedRating = (selectedRatingTemp === 'helpful' || selectedRatingTemp === 'up') ? 'up' : 'down';
    thread.rating = normalizedRating;
    thread.rating_comment = (el.ratingCommentInput.value || '').trim();"""

    if old_rating_submit in c:
        c = c.replace(old_rating_submit, new_rating_submit, 1)

    # 9. Update exam submission error handling so retake exception is displayed
    old_exam_submit = """    if (window.DataLayer) {
      try {
        await window.DataLayer.submitExam(dbProgId, answersMap);
      } catch (err) {
        console.warn('[DataLayer] submitExam error:', err);
      }
    }"""

    new_exam_submit = """    if (window.DataLayer) {
      try {
        await window.DataLayer.submitExam(dbProgId, answersMap);
      } catch (err) {
        console.warn('[DataLayer] submitExam error:', err);
        alert(err.message || 'Error submitting exam: Retakes are not allowed unless permitted by an instructor.');
        return;
      }
    }"""

    if old_exam_submit in c:
        c = c.replace(old_exam_submit, new_exam_submit, 1)

    with open('app.js', 'w', encoding='utf-8', newline='') as f:
        f.write(c)
    print("app.js successfully patched")

if __name__ == '__main__':
    patch_data_js()
    patch_index_html()
    patch_app_js()

