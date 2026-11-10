/**
 * IKAAI ACADEMY / LIBRARY — DATA ACCESS LAYER (data.js)
 * High-level API for UI components to interact with Supabase backend.
 * Uses supabase-client.js with graceful fallback for local testing.
 */

(function () {
  'use strict';

  function getClient() {
    return window.SupabaseClient ? window.SupabaseClient.getClient() : null;
  }

  function isLive() {
    return Boolean(window.SupabaseClient && window.SupabaseClient.isReady() && getClient());
  }

  const DataLayer = {
    // ------------------------------------------------------------------------
    // 1. PROGRAMMES
    // ------------------------------------------------------------------------
    async getProgrammes() {
      const client = getClient();
      if (isLive()) {
        try {
          const { data, error } = await client
            .from('programmes')
            .select('*')
            .order('sort_order', { ascending: true });
          if (!error && data && data.length > 0) return data;
        } catch (e) {
          console.warn('[DataLayer] Error loading programmes from Supabase:', e);
        }
      }

      // Fallback
      return [
        { id: '10000000-0000-0000-0000-000000000001', slug: 'human-resources', name: 'Human Resources', tag_label: 'Human Resources', sort_order: 1 },
        { id: '10000000-0000-0000-0000-000000000002', slug: 'data-analyst', name: 'Data Analyst', tag_label: 'Data Analytics', sort_order: 2 },
        { id: '10000000-0000-0000-0000-000000000003', slug: 'social-research-policy', name: 'Social Research & Policy', tag_label: 'Social Research', sort_order: 3 },
        { id: '10000000-0000-0000-0000-000000000004', slug: 'design-social-media', name: 'Design & Social Media', tag_label: 'Design & Media', sort_order: 4 },
        { id: '10000000-0000-0000-0000-000000000005', slug: 'business-development', name: 'Business Development', tag_label: 'Partnerships & BD', sort_order: 5 }
      ];
    },

    async getProgramme(idOrSlug) {
      const progs = await DataLayer.getProgrammes();
      return progs.find(p => p.id === idOrSlug || p.slug === idOrSlug) || progs[0];
    },

    async getUserProgramme(userId) {
      const profile = await DataLayer.getProfile(userId);
      if (profile && profile.programme_id) {
        return await DataLayer.getProgramme(profile.programme_id);
      }
      return null;
    },

    async assignInitialProgramme(programmeId) {
      // Deprecated & Blocked: Programme assignments are exclusively managed by administrators
      console.warn('[DataLayer] User self-assignment of programmes is strictly disabled.');
      return false;
    },

    // ------------------------------------------------------------------------
    // 2. MODULES & CURRICULUM
    // ------------------------------------------------------------------------
    async getModules(programmeId) {
      const client = getClient();
      if (isLive()) {
        try {
          const { data, error } = await client
            .from('modules')
            .select(`
              id,
              programme_id,
              number,
              title,
              description,
              learning_objectives,
              sort_order,
              timer_seconds,
              resources (id, number, title, type, storage_path, sort_order),
              faqs (id, question, answer, sort_order),
              quizzes (id, title, pass_mark)
            `)
            .eq('programme_id', programmeId)
            .order('sort_order', { ascending: true });

          if (!error && data) {
            // Also fetch user module progress & completions
            const user = await window.SupabaseClient.getUser();
            if (user) {
              const { data: progressData } = await client
                .from('module_progress')
                .select('*')
                .eq('user_id', user.id);

              const { data: resCompData } = await client
                .from('resource_completions')
                .select('resource_id')
                .eq('user_id', user.id);

              const { data: faqReadsData } = await client
                .from('faq_reads')
                .select('faq_id')
                .eq('user_id', user.id);

              const completedResSet = new Set((resCompData || []).map(r => r.resource_id));
              const readFaqSet = new Set((faqReadsData || []).map(f => f.faq_id));
              const progressMap = new Map((progressData || []).map(p => [p.module_id, p]));

              // Compute unlock & completion state
              let prevComplete = true;
              return data.map((mod, idx) => {
                const prog = progressMap.get(mod.id) || {};
                const isUnlocked = idx === 0 ? true : prevComplete;
                const isComplete = Boolean(prog.completed_at);
                prevComplete = isComplete;

                return {
                  ...mod,
                  isUnlocked,
                  isComplete,
                  opened_at: prog.opened_at || null,
                  timer_completed_at: prog.timer_completed_at || null,
                  completed_at: prog.completed_at || null,
                  completedResources: (mod.resources || []).filter(r => completedResSet.has(r.id)).map(r => r.id),
                  readFaqs: (mod.faqs || []).filter(f => readFaqSet.has(f.id)).map(f => f.id)
                };
              });
            }
            return data;
          }
        } catch (e) {
          console.warn('[DataLayer] Error loading modules:', e);
        }
      }

      return null;
    },

    async openModule(moduleId) {
      const client = getClient();
      if (isLive()) {
        const { data, error } = await client.rpc('open_module', { p_module_id: moduleId });
        if (error) throw error;
        return data;
      }
      return { success: true, opened_at: new Date().toISOString() };
    },

    async completeModuleTimer(moduleId) {
      const client = getClient();
      if (isLive()) {
        const { data, error } = await client.rpc('complete_module_timer', { p_module_id: moduleId });
        if (error) throw error;
        return data;
      }
      return { success: true, timer_completed_at: new Date().toISOString() };
    },

    async markResourceComplete(resourceId) {
      const client = getClient();
      if (isLive()) {
        const { data, error } = await client.rpc('mark_resource_complete', { p_resource_id: resourceId });
        if (error) throw error;
        return data;
      }
      return { success: true };
    },

    async markFaqRead(faqId) {
      const client = getClient();
      if (isLive()) {
        const { data, error } = await client.rpc('mark_faq_read', { p_faq_id: faqId });
        if (error) throw error;
        return data;
      }
      return { success: true };
    },

    // ------------------------------------------------------------------------
    // 3. QUIZZES (Safe Options & Server-Side Scoring)
    // ------------------------------------------------------------------------
    async getQuizForModule(moduleId) {
      const client = getClient();
      if (isLive()) {
        try {
          const { data: quiz, error: qErr } = await client
            .from('quizzes')
            .select('id, module_id, title, pass_mark')
            .eq('module_id', moduleId)
            .maybeSingle();

          if (qErr || !quiz) return null;

          const { data: questions, error: qqErr } = await client
            .from('quiz_questions')
            .select('id, quiz_id, question, sort_order')
            .eq('quiz_id', quiz.id)
            .order('sort_order', { ascending: true });

          if (qqErr || !questions) return null;

          const questionIds = questions.map(q => q.id);
          // Query safe learner view without is_correct column!
          const { data: options, error: optErr } = await client
            .from('v_quiz_options_learner')
            .select('id, question_id, option_text, sort_order')
            .in('question_id', questionIds)
            .order('sort_order', { ascending: true });

          const optMap = {};
          (options || []).forEach(opt => {
            if (!optMap[opt.question_id]) optMap[opt.question_id] = [];
            optMap[opt.question_id].push(opt);
          });

          return {
            ...quiz,
            questions: questions.map(q => ({
              ...q,
              options: optMap[q.id] || []
            }))
          };
        } catch (e) {
          console.warn('[DataLayer] Error loading quiz:', e);
        }
      }
      return null;
    },

    async submitQuiz(quizId, answers) {
      const client = getClient();
      if (isLive()) {
        const { data, error } = await client.rpc('submit_quiz', {
          p_quiz_id: quizId,
          p_answers: answers
        });
        if (error) throw error;
        return data;
      }
      return { score: 10, total: 10, passed: true, percentage: 100 };
    },

    // ------------------------------------------------------------------------
    // 4. GRADES & PROGRESS
    // ------------------------------------------------------------------------
    async getMyGrades(programmeId) {
      const client = getClient();
      if (isLive()) {
        try {
          const { data, error } = await client
            .from('v_my_grades')
            .select('*')
            .eq('programme_id', programmeId)
            .order('module_number', { ascending: true });

          if (!error && data) return data;
        } catch (e) {
          console.warn('[DataLayer] Error loading grades:', e);
        }
      }
      return null;
    },

    async getProgrammeCompletion(programmeId) {
      const client = getClient();
      if (isLive()) {
        try {
          const { data, error } = await client
            .from('v_programme_completion')
            .select('*')
            .eq('programme_id', programmeId)
            .maybeSingle();

          if (!error && data) return data;
        } catch (e) {
          console.warn('[DataLayer] Error loading completion:', e);
        }
      }
      return { completion_percentage: 0, completed_modules: 0, total_modules: 6 };
    },

    // ------------------------------------------------------------------------
    // 5. WRITTEN EXAM
    // ------------------------------------------------------------------------
    async getExamQuestions(programmeId) {
      const client = getClient();
      if (isLive()) {
        try {
          const { data, error } = await client
            .from('exam_questions')
            .select('*')
            .eq('programme_id', programmeId)
            .order('sort_order', { ascending: true });
          if (!error && data && data.length > 0) return data;
        } catch (e) {
          console.warn('[DataLayer] Error loading exam questions:', e);
        }
      }
      return null;
    },

    async getExamSubmission(programmeId) {
      const client = getClient();
      if (isLive()) {
        try {
          const user = await window.SupabaseClient.getUser();
          if (user) {
            const { data, error } = await client
              .from('exam_submissions')
              .select(`
                *,
                exam_answers (question_id, answer_text, marks, comment)
              `)
              .eq('user_id', user.id)
              .eq('programme_id', programmeId)
              .maybeSingle();

            if (!error && data) return data;
          }
        } catch (e) {
          console.warn('[DataLayer] Error loading exam submission:', e);
        }
      }
      return { status: 'not_submitted', answers: [] };
    },

    async saveExamDraft(programmeId, answers) {
      const client = getClient();
      if (isLive()) {
        const { data, error } = await client.rpc('save_exam_draft', {
          p_programme_id: programmeId,
          p_answers: answers
        });
        if (error) throw error;
        return data;
      }
      return { success: true, status: 'draft', saved_at: new Date().toISOString() };
    },

    async submitExam(programmeId, answers) {
      const client = getClient();
      if (isLive()) {
        const { data, error } = await client.rpc('submit_exam', {
          p_programme_id: programmeId,
          p_answers: answers
        });
        if (error) throw error;
        return data;
      }
      return { status: 'submitted', submitted_at: new Date().toISOString() };
    },

    async allowExamRetake(submissionId) {
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

    async gradeExam(submissionId, marks, comment, answersGrades = null) {
      const client = getClient();
      if (isLive()) {
        const { data, error } = await client.rpc('grade_exam', {
          p_submission_id: submissionId,
          p_overall_marks: marks,
          p_overall_comment: comment,
          p_answers_grades: answersGrades
        });
        if (error) throw error;
        return data;
      }
      return { status: 'graded', score: marks };
    },

    async getInstructorExamSubmissions(programmeId) {
      const client = getClient();
      if (isLive()) {
        try {
          let query = client
            .from('exam_submissions')
            .select(`
              id,
              user_id,
              programme_id,
              status,
              submitted_at,
              grade,
              score,
              instructor_comment,
              graded_by,
              graded_at,
              allow_retake,
              created_at,
              profiles:user_id (id, full_name, email, avatar_url),
              programmes:programme_id (id, name),
              exam_answers (question_id, answer_text, marks, comment)
            `)
            .order('submitted_at', { ascending: false, nullsFirst: false });

          if (programmeId) {
            query = query.eq('programme_id', programmeId);
          }

          const { data, error } = await query;
          if (!error && data) return data;
          if (error) console.warn('[DataLayer] Error loading instructor exam submissions:', error);
        } catch (e) {
          console.warn('[DataLayer] getInstructorExamSubmissions exception:', e);
        }
      }
      return [];
    },

    async getCohortGradeRoster(programmeId) {
      const client = getClient();
      if (isLive()) {
        try {
          const { data, error } = await client.rpc('get_cohort_grade_roster', {
            p_programme_id: programmeId || null
          });
          if (!error && data) return data;
          if (error) console.warn('[DataLayer] getCohortGradeRoster error:', error);
        } catch (e) {
          console.warn('[DataLayer] getCohortGradeRoster exception:', e);
        }
      }
      return [];
    },

    // ------------------------------------------------------------------------
    // 6. JOB DESCRIPTIONS
    // ------------------------------------------------------------------------
    async getJobs() {
      const client = getClient();
      if (isLive()) {
        try {
          const { data, error } = await client
            .from('jobs')
            .select('id, title, slug, category, programme_id, docx_path, sort_order')
            .order('sort_order', { ascending: true });
          if (!error && data && data.length > 0) return data;
        } catch (e) {
          console.warn('[DataLayer] Error loading jobs:', e);
        }
      }
      return window.IKAAI_JOB_DESCRIPTIONS || [];
    },

    async getJob(slugOrId) {
      const client = getClient();
      if (isLive()) {
        try {
          const { data, error } = await client
            .from('jobs')
            .select('*')
            .or(`slug.eq.${slugOrId},id.eq.${slugOrId}`)
            .maybeSingle();
          if (!error && data) return data;
        } catch (e) {
          console.warn('[DataLayer] Error loading job:', e);
        }
      }
      const list = window.IKAAI_JOB_DESCRIPTIONS || [];
      return list.find(j => j.id === slugOrId || j.slug === slugOrId);
    },

    async getJobDownloadUrl(docxPath) {
      const client = getClient();
      if (isLive() && docxPath) {
        try {
          const { data, error } = await client
            .storage
            .from('job-descriptions')
            .createSignedUrl(docxPath, 3600);
          if (!error && data?.signedUrl) return data.signedUrl;
        } catch (e) {
          // fallback to local path
        }
      }
      return docxPath;
    },

    async getResourceSignedUrl(storagePath) {
      if (!storagePath) return null;
      const client = getClient();
      if (isLive() && client) {
        try {
          const { data, error } = await client
            .storage
            .from('course-files')
            .createSignedUrl(storagePath, 3600);
          if (!error && data?.signedUrl) return data.signedUrl;
          if (error) console.warn('[DataLayer] createSignedUrl error:', error.message);
        } catch (e) {
          console.warn('[DataLayer] getResourceSignedUrl exception:', e);
        }
      }
      return null;
    },

    // ------------------------------------------------------------------------
    // 7. FEEDBACK
    // ------------------------------------------------------------------------
    async submitFeedback({ moduleId, programmeId, topic, message, isAnonymous = false }) {
      const client = getClient();
      if (isLive()) {
        const { data, error } = await client.rpc('submit_feedback', {
          p_programme_id: programmeId,
          p_module_id: moduleId || null,
          p_topic: topic,
          p_message: message,
          p_is_anonymous: !!isAnonymous
        });
        if (error) throw error;
        return data;
      }
      return { success: true, status: 'new', created_at: new Date().toISOString() };
    },

    async getMyFeedbackHistory(programmeId) {
      const client = getClient();
      if (isLive()) {
        try {
          const user = await window.SupabaseClient.getUser();
          if (user) {
            let query = client
              .from('feedback')
              .select(`
                id,
                topic,
                message,
                status,
                is_anonymous,
                created_at,
                module:modules (id, title, number),
                programme:programmes (id, name)
              `)
              .eq('user_id', user.id)
              .order('created_at', { ascending: false });

            if (programmeId) {
              query = query.eq('programme_id', programmeId);
            }

            const { data, error } = await query;
            if (!error && data) return data;
            if (error) console.warn('[DataLayer] getMyFeedbackHistory error:', error);
          }
        } catch (e) {
          console.warn('[DataLayer] getMyFeedbackHistory exception:', e);
        }
      }
      return [];
    },

    async getInstructorFeedbackList(programmeId) {
      const client = getClient();
      if (isLive()) {
        try {
          let query = client
            .from('feedback')
            .select(`
              id,
              user_id,
              programme_id,
              module_id,
              topic,
              message,
              status,
              is_anonymous,
              created_at,
              profiles:user_id (id, full_name, email, avatar_url),
              module:modules (id, title, number),
              programme:programmes (id, name)
            `)
            .order('created_at', { ascending: false });

          if (programmeId) {
            query = query.eq('programme_id', programmeId);
          }

          const { data, error } = await query;
          if (!error && data) return data;
          if (error) console.warn('[DataLayer] getInstructorFeedbackList error:', error);
        } catch (e) {
          console.warn('[DataLayer] getInstructorFeedbackList exception:', e);
        }
      }
      return [];
    },

    async markFeedbackReviewed(feedbackId) {
      const client = getClient();
      if (isLive()) {
        const { data, error } = await client.rpc('mark_feedback_reviewed', {
          p_feedback_id: feedbackId
        });
        if (error) throw error;
        return data;
      }
      return { success: true, status: 'reviewed' };
    },

    // ------------------------------------------------------------------------
    // 7B. ANNOUNCEMENTS NOTICEBOARD SYSTEM
    // ------------------------------------------------------------------------
    async getAnnouncements({ category = 'All', search = '', status = 'published' } = {}) {
      const client = getClient();
      if (isLive()) {
        try {
          let query = client
            .from('announcements')
            .select(`
              id, title, body, category, audience_type, programme_id, target_role,
              is_pinned, is_urgent, requires_ack, comments_enabled, status,
              publish_at, expires_at, created_by, created_at, updated_at, edited_at,
              author:profiles!created_by (id, full_name, email, avatar_url, role),
              programme:programmes!programme_id (id, name),
              announcement_files (*),
              announcement_reads (user_id, read_at),
              announcement_acks (user_id, acknowledged_at),
              announcement_comments (
                id, announcement_id, user_id, body, created_at,
                commenter:profiles!user_id (id, full_name, avatar_url, role)
              )
            `)
            .order('is_pinned', { ascending: false })
            .order('is_urgent', { ascending: false })
            .order('publish_at', { ascending: false });

          if (status) {
            query = query.eq('status', status);
          }

          if (category && category !== 'All') {
            query = query.eq('category', category);
          }

          if (search && search.trim()) {
            query = query.ilike('title', `%${search.trim()}%`);
          }

          const { data, error } = await query;
          if (!error && data) return data;
          if (error) console.warn('[DataLayer] getAnnouncements error:', error);
        } catch (e) {
          console.warn('[DataLayer] getAnnouncements exception:', e);
        }
      }
      return window.INITIAL_DATA?.announcements || [];
    },

    async markAnnouncementRead(announcementId) {
      const client = getClient();
      if (isLive()) {
        const { data, error } = await client.rpc('mark_announcement_read', {
          p_announcement_id: announcementId
        });
        if (error) throw error;
        return data;
      }
      return { success: true, announcement_id: announcementId };
    },

    async markAllAnnouncementsRead() {
      const client = getClient();
      if (isLive()) {
        const { data, error } = await client.rpc('mark_all_announcements_read');
        if (error) throw error;
        return data;
      }
      return { success: true, marked_count: 0 };
    },

    async acknowledgeAnnouncement(announcementId) {
      const client = getClient();
      if (isLive()) {
        const { data, error } = await client.rpc('acknowledge_announcement', {
          p_announcement_id: announcementId
        });
        if (error) throw error;
        return data;
      }
      return { success: true, announcement_id: announcementId, acknowledged_at: new Date().toISOString() };
    },

    async publishAnnouncement(params) {
      const client = getClient();
      if (isLive()) {
        const { data, error } = await client.rpc('publish_announcement', {
          p_title: params.title,
          p_body: params.body,
          p_category: params.category,
          p_audience_type: params.audience_type || 'all',
          p_programme_id: params.programme_id || null,
          p_target_role: params.target_role || null,
          p_is_pinned: !!params.is_pinned,
          p_is_urgent: !!params.is_urgent,
          p_requires_ack: !!params.requires_ack,
          p_comments_enabled: !!params.comments_enabled,
          p_status: params.status || 'published',
          p_publish_at: params.publish_at || null,
          p_expires_at: params.expires_at || null,
          p_announcement_id: params.announcement_id || null
        });
        if (error) throw error;
        return data;
      }
      return { success: true, status: params.status || 'published' };
    },

    async archiveAnnouncement(announcementId) {
      const client = getClient();
      if (isLive()) {
        const { data, error } = await client.rpc('archive_announcement', {
          p_announcement_id: announcementId
        });
        if (error) throw error;
        return data;
      }
      return { success: true, announcement_id: announcementId, status: 'archived' };
    },

    async deleteAnnouncement(announcementId) {
      const client = getClient();
      if (isLive()) {
        const { data, error } = await client.rpc('delete_announcement', {
          p_announcement_id: announcementId
        });
        if (error) throw error;
        return data;
      }
      return { success: true, announcement_id: announcementId };
    },

    async postAnnouncementComment(announcementId, body) {
      const client = getClient();
      if (isLive()) {
        const { data, error } = await client.rpc('post_announcement_comment', {
          p_announcement_id: announcementId,
          p_body: body
        });
        if (error) throw error;
        return data;
      }
      return { success: true, created_at: new Date().toISOString() };
    },

    async getAnnouncementAuditReport(announcementId) {
      const client = getClient();
      if (isLive()) {
        try {
          const { data, error } = await client.rpc('get_announcement_audit_report', {
            p_announcement_id: announcementId
          });
          if (!error && data) return data;
          if (error) console.warn('[DataLayer] getAnnouncementAuditReport error:', error);
        } catch (e) {
          console.warn('[DataLayer] getAnnouncementAuditReport exception:', e);
        }
      }
      return [];
    },

    async uploadAnnouncementAttachment(file) {
      const client = getClient();
      if (isLive() && file) {
        const user = await window.SupabaseClient.getUser();
        if (!user) throw new Error('Authentication required.');
        const fileExt = file.name.split('.').pop().toLowerCase();
        const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
        const storagePath = `announcements/${Date.now()}_${cleanName}`;

        const { error: uploadError } = await client.storage
          .from('announcement-files')
          .upload(storagePath, file, { cacheControl: '3600', upsert: true });

        if (uploadError) throw uploadError;
        return { storagePath, fileName: file.name, fileSize: file.size };
      }
      return { storagePath: `local/${file.name}`, fileName: file.name, fileSize: file.size };
    },

    async getAnnouncementFileSignedUrl(storagePath) {
      const client = getClient();
      if (isLive() && storagePath) {
        try {
          const { data, error } = await client.storage
            .from('announcement-files')
            .createSignedUrl(storagePath, 3600);
          if (!error && data?.signedUrl) return data.signedUrl;
        } catch (e) {
          console.warn('[DataLayer] getAnnouncementFileSignedUrl error:', e);
        }
      }
      return null;
    },

    // ------------------------------------------------------------------------
    // 8. PROFILE & ACCOUNT SETTINGS
    // ------------------------------------------------------------------------
    async getProfile(userId) {
      const client = getClient();
      if (isLive()) {
        try {
          const uid = userId || (await window.SupabaseClient.getUser())?.id;
          if (uid) {
            const { data, error } = await client
              .from('profiles')
              .select('*')
              .eq('id', uid)
              .maybeSingle();

            if (!error && data) {
              // Resolve programme details if programme_id exists
              if (data.programme_id) {
                try {
                  const prog = await DataLayer.getProgramme(data.programme_id);
                  if (prog) data.programme = prog;
                } catch (pe) {
                  console.warn('[DataLayer] Error fetching programme for profile:', pe);
                }
              }
              return data;
            }
          }
        } catch (e) {
          console.warn('[DataLayer] Error loading profile:', e);
        }
      }
      return null;
    },

    async updateProfile({ fullName, phone, avatarUrl }) {
      const client = getClient();
      if (isLive()) {
        const user = await window.SupabaseClient.getUser();
        if (!user) throw new Error('Authentication required.');

        const updates = { updated_at: new Date().toISOString() };
        if (fullName !== undefined) {
          const trimmed = fullName.trim();
          if (trimmed.length < 2 || trimmed.length > 60) {
            throw new Error('Name must be between 2 and 60 characters.');
          }
          updates.full_name = trimmed;
          // Deprecated: display_name is mirrored for backward compatibility only
          updates.display_name = trimmed;
        }

        if (phone !== undefined) {
          const trimmedPhone = phone ? phone.trim() : '';
          if (!trimmedPhone) {
            throw new Error('Phone number is mandatory.');
          }
          if (!/^\+?[\d\s\-()]{7,20}$/.test(trimmedPhone)) {
            throw new Error('Please enter a valid phone number (e.g. +91 98765 43210).');
          }
          updates.phone = trimmedPhone;
        }

        if (avatarUrl !== undefined) {
          updates.avatar_url = avatarUrl;
        }

        const { data, error } = await client
          .from('profiles')
          .update(updates)
          .eq('id', user.id)
          .select()
          .single();

        if (error) throw error;

        // Resolve programme details if programme_id exists
        if (data && data.programme_id) {
          try {
            data.programme = await DataLayer.getProgramme(data.programme_id);
          } catch (pe) {
            // silent fallback
          }
        }
        return data;
      }
      return { success: true };
    },

    async uploadAvatar(file) {
      const client = getClient();
      if (!isLive() || !client) throw new Error('Backend connection required.');

      const user = await window.SupabaseClient.getUser();
      if (!user) throw new Error('Authentication required.');

      // Validation
      if (!file) throw new Error('No file selected.');
      const maxBytes = 2 * 1024 * 1024; // 2 MB limit
      if (file.size > maxBytes) {
        throw new Error('File exceeds maximum size limit of 2 MB.');
      }

      const allowedMimes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
      if (!allowedMimes.includes(file.type.toLowerCase())) {
        throw new Error('Only PNG, JPG, JPEG, and WebP image formats are allowed.');
      }

      const fileExt = file.name.split('.').pop().toLowerCase();
      const storagePath = `${user.id}/avatar_${Date.now()}.${fileExt}`;

      // Clean up any old avatar files in user's folder
      try {
        const { data: existingFiles } = await client.storage.from('avatars').list(user.id);
        if (existingFiles && existingFiles.length > 0) {
          const filesToRemove = existingFiles.map(f => `${user.id}/${f.name}`);
          await client.storage.from('avatars').remove(filesToRemove);
        }
      } catch (cleanErr) {
        console.warn('[DataLayer] Could not remove old avatar files:', cleanErr);
      }

      // Upload new avatar file
      const { error: uploadError } = await client.storage
        .from('avatars')
        .upload(storagePath, file, {
          cacheControl: '3600',
          upsert: true
        });

      if (uploadError) {
        throw new Error(`Avatar upload failed: ${uploadError.message}`);
      }

      // Retrieve public URL
      const { data: pubData } = client.storage.from('avatars').getPublicUrl(storagePath);
      const publicUrl = pubData?.publicUrl;

      // Update profiles.avatar_url
      await DataLayer.updateProfile({ avatarUrl: publicUrl });

      return publicUrl;
    },

    async removeAvatar() {
      const client = getClient();
      if (!isLive() || !client) throw new Error('Backend connection required.');

      const user = await window.SupabaseClient.getUser();
      if (!user) throw new Error('Authentication required.');

      // Remove existing files in user's folder
      try {
        const { data: existingFiles } = await client.storage.from('avatars').list(user.id);
        if (existingFiles && existingFiles.length > 0) {
          const filesToRemove = existingFiles.map(f => `${user.id}/${f.name}`);
          await client.storage.from('avatars').remove(filesToRemove);
        }
      } catch (cleanErr) {
        console.warn('[DataLayer] Could not remove avatar files from storage:', cleanErr);
      }

      // Set profiles.avatar_url = null
      await DataLayer.updateProfile({ avatarUrl: null });
      return true;
    },

    async changePassword(newPassword) {
      const client = getClient();
      if (!isLive() || !client) throw new Error('Backend connection required.');

      if (!newPassword || newPassword.length < 8) {
        throw new Error('Password must be at least 8 characters long.');
      }

      const { data, error } = await client.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;
      return data;
    },

    async signOut() {
      const client = getClient();
      if (isLive() && client) {
        try {
          await client.auth.signOut();
        } catch (e) {
          console.warn('[DataLayer] Sign out error:', e);
        }
      }
      return true;
    },

    async signOutAllDevices() {
      const client = getClient();
      if (isLive() && client) {
        try {
          await client.auth.signOut({ scope: 'global' });
        } catch (e) {
          console.warn('[DataLayer] Global sign out error:', e);
        }
      }
      return true;
    },

    // ------------------------------------------------------------------------
    // 9. ADMIN FUNCTIONS (USERS & ACCESS INVITATIONS)
    // ------------------------------------------------------------------------
    async adminListAccessInvites() {
      const client = getClient();
      if (isLive() && client) {
        try {
          const { data, error } = await client.rpc('list_access_invites');
          if (!error && Array.isArray(data)) return data;
          if (error) console.warn('[DataLayer] list_access_invites rpc note:', error);
        } catch (e) {
          console.warn('[DataLayer] list_access_invites error:', e);
        }

        // Direct table fallback if RPC is pending
        try {
          const { data: invites } = await client
            .from('access_invites')
            .select('*, programmes:programme_id(id, name, slug)')
            .order('created_at', { ascending: false });

          const { data: profiles } = await client
            .from('profiles')
            .select('*, programmes:programme_id(id, name, slug)')
            .order('created_at', { ascending: false });

          if (invites || profiles) {
            const combined = [];
            const seenEmails = new Set();

            (invites || []).forEach(inv => {
              seenEmails.add(inv.email.toLowerCase());
              const matchProfile = (profiles || []).find(p => p.email && p.email.toLowerCase() === inv.email.toLowerCase());
              combined.push({
                invite_id: inv.id,
                email: inv.email,
                role: inv.role,
                programme_id: inv.programme_id,
                programme_name: inv.programmes?.name || (inv.role === 'admin' ? 'All Programmes' : 'Unassigned'),
                status: matchProfile?.access_status || inv.status,
                created_at: inv.created_at,
                activated_at: inv.activated_at,
                profile_id: matchProfile?.id || null,
                profile_name: matchProfile?.full_name || matchProfile?.display_name || null,
                last_seen: matchProfile?.last_seen || null,
                is_pending_approval: false
              });
            });

            (profiles || []).forEach(p => {
              if (p.email && !seenEmails.has(p.email.toLowerCase())) {
                combined.push({
                  invite_id: null,
                  email: p.email,
                  role: p.role,
                  programme_id: p.programme_id,
                  programme_name: p.programmes?.name || (p.role === 'admin' ? 'All Programmes' : 'Unassigned'),
                  status: p.access_status || 'pending',
                  created_at: p.created_at,
                  activated_at: null,
                  profile_id: p.id,
                  profile_name: p.full_name || p.display_name || null,
                  last_seen: p.last_seen || null,
                  is_pending_approval: (p.access_status === 'pending')
                });
              }
            });

            return combined;
          }
        } catch (fbErr) {
          console.warn('[DataLayer] admin list fallback error:', fbErr);
        }
      }
      return [];
    },

    async adminInviteUser({ email, role, programmeId }) {
      const client = getClient();
      if (!isLive() || !client) throw new Error('Backend connection required.');

      const cleanEmail = (email || '').trim().toLowerCase();
      const cleanRole = (role || '').trim().toLowerCase();
      const cleanProg = cleanRole === 'admin' ? null : (programmeId || null);

      const { data, error } = await client.rpc('invite_user', {
        p_email: cleanEmail,
        p_role: cleanRole,
        p_programme_id: cleanProg
      });

      if (error) throw error;
      return data;
    },

    async adminUpdateUserAccess(userId, { role, programmeId }) {
      const client = getClient();
      if (!isLive() || !client) throw new Error('Backend connection required.');

      const cleanRole = (role || '').trim().toLowerCase();
      const cleanProg = cleanRole === 'admin' ? null : (programmeId || null);

      const { data, error } = await client.rpc('update_user_access', {
        p_user_id: userId,
        p_role: cleanRole,
        p_programme_id: cleanProg
      });

      if (error) throw error;
      return data;
    },

    async adminRevokeUserAccess(userId) {
      const client = getClient();
      if (!isLive() || !client) throw new Error('Backend connection required.');

      const { data, error } = await client.rpc('revoke_user_access', {
        p_user_id: userId
      });

      if (error) throw error;
      return data;
    },

    async adminRestoreUserAccess(userId) {
      const client = getClient();
      if (!isLive() || !client) throw new Error('Backend connection required.');

      const { data, error } = await client.rpc('restore_user_access', {
        p_user_id: userId
      });

      if (error) throw error;
      return data;
    },

    // Legacy method mapped to adminUpdateUserAccess for backwards compatibility
    async adminUpdateUser(userId, { role, programmeId }) {
      return await this.adminUpdateUserAccess(userId, { role, programmeId });
    },

    async adminGetUsers(searchQuery = '') {
      const list = await this.adminListAccessInvites();
      if (!searchQuery) return list;
      const q = searchQuery.toLowerCase();
      return list.filter(u => 
        (u.email && u.email.toLowerCase().includes(q)) || 
        (u.profile_name && u.profile_name.toLowerCase().includes(q))
      );
    },

    // ------------------------------------------------------------------------
    // 10. COMPANY RESOURCES
    // ------------------------------------------------------------------------
    async getCompanyDocuments({ programmeId, documentType, isPublished = null, isArchived = false, search = "" } = {}) {
      const client = getClient();
      if (isLive() && client) {
        try {
          let query = client
            .from("company_documents")
            .select(`
              id,
              title,
              description,
              document_type,
              programme_id,
              storage_path,
              file_name,
              file_size,
              mime_type,
              version,
              issued_by,
              issued_at,
              is_published,
              is_archived,
              created_at,
              updated_at,
              programmes:programme_id (id, slug, name),
              issuer:issued_by (id, full_name, email)
            `)
            .eq("is_archived", isArchived)
            .order("issued_at", { ascending: false });

          if (isPublished !== null) {
            query = query.eq("is_published", isPublished);
          }

          if (documentType && documentType !== "all") {
            query = query.eq("document_type", documentType);
          }

          if (programmeId !== undefined && programmeId !== "all") {
            if (programmeId === null) {
              query = query.is("programme_id", null);
            } else {
              query = query.or(`programme_id.eq.${programmeId},programme_id.is.null`);
            }
          }

          if (search && search.trim()) {
            const term = search.trim();
            query = query.or(`title.ilike.%${term}%,description.ilike.%${term}%,document_type.ilike.%${term}%`);
          }

          const { data, error } = await query;
          if (!error && data) {
            try {
              const { data: counts } = await client
                .from("company_document_downloads")
                .select("document_id");
              const countMap = {};
              (counts || []).forEach(c => {
                countMap[c.document_id] = (countMap[c.document_id] || 0) + 1;
              });
              return data.map(d => ({
                ...d,
                download_count: countMap[d.id] || 0
              }));
            } catch (errCount) {
              return data.map(d => ({ ...d, download_count: 0 }));
            }
          }
          if (error) console.warn("[DataLayer] getCompanyDocuments error:", error.message);
        } catch (e) {
          console.warn("[DataLayer] getCompanyDocuments exception:", e);
        }
      }

      return [];
    },

    async getCompanyDocumentSignedUrl(storagePath) {
      if (!storagePath) return null;
      const client = getClient();
      if (isLive() && client) {
        try {
          const { data, error } = await client
            .storage
            .from("company-documents")
            .createSignedUrl(storagePath, 3600);
          if (!error && data?.signedUrl) return data.signedUrl;
          if (error) console.warn("[DataLayer] company-documents signedUrl error:", error.message);
        } catch (e) {
          console.warn("[DataLayer] getCompanyDocumentSignedUrl exception:", e);
        }
      }
      return null;
    },

    async logCompanyDocumentDownload(documentId) {
      if (!documentId) return false;
      const client = getClient();
      if (isLive() && client) {
        try {
          const { error } = await client.rpc("log_company_document_download", { p_document_id: documentId });
          if (!error) return true;
          const user = await window.SupabaseClient.getUser();
          if (user) {
            await client.from("company_document_downloads").insert({
              document_id: documentId,
              user_id: user.id
            });
            return true;
          }
        } catch (e) {
          console.warn("[DataLayer] logCompanyDocumentDownload error:", e);
        }
      }
      return true;
    },

    async createCompanyDocument(docData, file) {
      const client = getClient();
      if (!isLive() || !client) throw new Error("Backend connection required to issue documents.");

      const user = await window.SupabaseClient.getUser();
      if (!user) throw new Error("Authentication required.");

      let storagePath = null;
      let fileName = docData.file_name || null;
      let fileSize = docData.file_size || null;
      let mimeType = docData.mime_type || null;

      if (file) {
        const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const progPart = docData.programme_id ? docData.programme_id : "all-programmes";
        const docTempId = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : ("doc_" + Date.now());
        storagePath = `${progPart}/${docTempId}/${cleanName}`;

        const { error: uploadError } = await client.storage
          .from("company-documents")
          .upload(storagePath, file, {
            cacheControl: "3600",
            upsert: false
          });

        if (uploadError) throw new Error(`File upload failed: ${uploadError.message}`);
        fileName = file.name;
        fileSize = file.size;
        mimeType = file.type || "application/octet-stream";
      }

      const insertPayload = {
        title: docData.title,
        description: docData.description || null,
        document_type: docData.document_type || "other",
        programme_id: docData.programme_id || null,
        storage_path: storagePath,
        file_name: fileName,
        file_size: fileSize,
        mime_type: mimeType,
        version: docData.version || "1.0",
        issued_by: user.id,
        issued_at: docData.issued_at || new Date().toISOString().split("T")[0],
        is_published: docData.is_published !== undefined ? docData.is_published : true,
        is_archived: false
      };

      const { data, error } = await client
        .from("company_documents")
        .insert(insertPayload)
        .select(`*, programmes:programme_id (id, slug, name), issuer:issued_by (id, full_name, email)`)
        .single();

      if (error) throw error;
      return data;
    },

    async updateCompanyDocument(docId, updates) {
      const client = getClient();
      if (!isLive() || !client) throw new Error("Backend connection required.");

      const { data, error } = await client
        .from("company_documents")
        .update(updates)
        .eq("id", docId)
        .select(`*, programmes:programme_id (id, slug, name), issuer:issued_by (id, full_name, email)`)
        .single();

      if (error) throw error;
      return data;
    },

    async uploadDocumentNewVersion(docId, { version, changelog, file }) {
      const client = getClient();
      if (!isLive() || !client) throw new Error("Backend connection required.");

      const user = await window.SupabaseClient.getUser();

      const { data: currentDoc, error: getErr } = await client
        .from("company_documents")
        .select("*")
        .eq("id", docId)
        .single();

      if (getErr || !currentDoc) throw new Error("Current document not found.");

      if (currentDoc.storage_path) {
        await client.from("document_versions").insert({
          document_id: docId,
          version: currentDoc.version,
          storage_path: currentDoc.storage_path,
          file_name: currentDoc.file_name,
          file_size: currentDoc.file_size,
          mime_type: currentDoc.mime_type,
          changelog: changelog || null,
          uploaded_by: currentDoc.issued_by
        });
      }

      let storagePath = currentDoc.storage_path;
      let fileName = currentDoc.file_name;
      let fileSize = currentDoc.file_size;
      let mimeType = currentDoc.mime_type;

      if (file) {
        const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const progPart = currentDoc.programme_id ? currentDoc.programme_id : "all-programmes";
        storagePath = `${progPart}/${docId}/${cleanName}`;

        const { error: uploadError } = await client.storage
          .from("company-documents")
          .upload(storagePath, file, {
            cacheControl: "3600",
            upsert: true
          });

        if (uploadError) throw new Error(`New version upload failed: ${uploadError.message}`);
        fileName = file.name;
        fileSize = file.size;
        mimeType = file.type || "application/octet-stream";
      }

      const { data, error } = await client
        .from("company_documents")
        .update({
          version: version || "2.0",
          storage_path: storagePath,
          file_name: fileName,
          file_size: fileSize,
          mime_type: mimeType,
          updated_at: new Date().toISOString()
        })
        .eq("id", docId)
        .select(`*, programmes:programme_id (id, slug, name), issuer:issued_by (id, full_name, email)`)
        .single();

      if (error) throw error;
      return data;
    },

    async getDocumentVersions(docId) {
      const client = getClient();
      if (isLive() && client) {
        try {
          const { data, error } = await client
            .from("document_versions")
            .select(`*, uploader:uploaded_by (id, full_name, email)`)
            .eq("document_id", docId)
            .order("uploaded_at", { ascending: false });
          if (!error && data) return data;
        } catch (e) {
          console.warn("[DataLayer] getDocumentVersions error:", e);
        }
      }
      return [];
    },

    async deleteCompanyDocument(docId) {
      const client = getClient();
      if (!isLive() || !client) throw new Error("Backend connection required.");

      const { error } = await client
        .from("company_documents")
        .delete()
        .eq("id", docId);

      if (error) throw error;
      return true;
    },

    getFallbackCompanyDocuments() {
      return [];
    },

    // ==========================================
    // SECTION 11: PERSONAL DOCUMENTS & AUDIT
    // ==========================================
    async getPersonalDocuments({ category, search } = {}) {
      const client = getClient();
      if (isLive() && client) {
        try {
          let query = client
            .from("personal_documents")
            .select("*, issuer:issued_by (id, full_name, email)")
            .eq("is_revoked", false)
            .order("issued_at", { ascending: false });

          if (category && category !== "all") {
            query = query.eq("category", category);
          }

          const { data, error } = await query;
          if (!error && Array.isArray(data)) {
            let res = data;
            if (search && search.trim()) {
              const s = search.trim().toLowerCase();
              res = res.filter(d => 
                (d.title || "").toLowerCase().includes(s) ||
                (d.description || "").toLowerCase().includes(s) ||
                (d.category || "").toLowerCase().includes(s)
              );
            }
            return res;
          }
          if (error) console.warn("[DataLayer] getPersonalDocuments error:", error.message);
        } catch (e) {
          console.warn("[DataLayer] getPersonalDocuments exception:", e);
        }
      }

      return [];
    },

    async markPersonalDocumentOpened(docId) {
      if (!docId) return false;
      const client = getClient();
      if (isLive() && client) {
        try {
          const { error } = await client.rpc("mark_document_opened", { p_document_id: docId });
          if (!error) return true;
          console.warn("[DataLayer] mark_document_opened error:", error.message);
        } catch (e) {
          console.warn("[DataLayer] mark_document_opened exception:", e);
        }
      }

      // Offline fallback
      if (window._fallbackPersonalDocs) {
        const doc = window._fallbackPersonalDocs.find(d => String(d.id) === String(docId));
        if (doc && !doc.first_opened_at) {
          doc.first_opened_at = new Date().toISOString();
        }
      }
      return true;
    },

    async acknowledgePersonalDocument(docId) {
      if (!docId) return false;
      const client = getClient();
      if (isLive() && client) {
        try {
          const { data, error } = await client.rpc("acknowledge_document", { p_document_id: docId });
          if (!error) return true;
          console.warn("[DataLayer] acknowledge_document error:", error.message);
          throw error;
        } catch (e) {
          console.warn("[DataLayer] acknowledge_document exception:", e);
          throw e;
        }
      }

      // Offline fallback
      if (window._fallbackPersonalDocs) {
        const doc = window._fallbackPersonalDocs.find(d => String(d.id) === String(docId));
        if (doc) {
          doc.acknowledged_at = new Date().toISOString();
          doc.first_opened_at = doc.first_opened_at || doc.acknowledged_at;
        }
      }
      return true;
    },

    async getPersonalDocumentSignedUrl(storagePath) {
      if (!storagePath) return null;
      const client = getClient();
      if (isLive() && client) {
        try {
          // Requirement: Short-lived signed URLs (60 seconds)
          const { data, error } = await client
            .storage
            .from("personal-documents")
            .createSignedUrl(storagePath, 60);
          if (!error && data?.signedUrl) return data.signedUrl;
          if (error) console.warn("[DataLayer] personal-documents signedUrl error:", error.message);
        } catch (e) {
          console.warn("[DataLayer] getPersonalDocumentSignedUrl exception:", e);
        }
      }
      return null;
    },

    async logDocumentAccess(documentKind, documentId, action) {
      if (!documentId) return false;
      const client = getClient();
      if (isLive() && client) {
        try {
          await client.rpc("log_document_access", {
            p_document_kind: documentKind || "personal",
            p_document_id: documentId,
            p_action: action || "view"
          });
          return true;
        } catch (e) {
          console.warn("[DataLayer] logDocumentAccess error:", e);
        }
      }
      return true;
    },

    async getUnopenedDocumentCount() {
      try {
        const client = getClient();
        let personalUnopened = 0;
        let programmeNew = 0;

        // 1. Personal docs unopened
        const personalDocs = await DataLayer.getPersonalDocuments();
        if (Array.isArray(personalDocs)) {
          personalUnopened = personalDocs.filter(d => !d.first_opened_at && !d.is_revoked).length;
        }

        // 2. Programme docs new in last 14 days
        const user = await window.SupabaseClient.getUser();
        const profile = await window.SupabaseClient.getProfile();
        const progId = profile?.programme_id;
        const progDocs = await DataLayer.getCompanyDocuments({
          programmeId: progId,
          isPublished: true,
          isArchived: false
        });
        if (Array.isArray(progDocs)) {
          const now = Date.now();
          programmeNew = progDocs.filter(d => {
            if (!d.issued_at) return false;
            return (now - new Date(d.issued_at).getTime()) <= 14 * 24 * 60 * 60 * 1000;
          }).length;
        }

        return personalUnopened + programmeNew;
      } catch (e) {
        return 0;
      }
    },

    // ==========================================
    // SECTION 12: ADMIN PERSONAL DOCUMENTS MANAGEMENT
    // ==========================================
    async getAllPersonalDocuments({ recipientId, category, isAcknowledged, isRevoked, search } = {}) {
      const client = getClient();
      if (isLive() && client) {
        try {
          let query = client
            .from("personal_documents")
            .select(`
              *,
              recipient:recipient_id (id, full_name, email, programme_id),
              issuer:issued_by (id, full_name, email)
            `)
            .order("created_at", { ascending: false });

          if (recipientId && recipientId !== "all") {
            query = query.eq("recipient_id", recipientId);
          }
          if (category && category !== "all") {
            query = query.eq("category", category);
          }
          if (isRevoked !== undefined && isRevoked !== null && isRevoked !== "all") {
            query = query.eq("is_revoked", isRevoked === true || isRevoked === "true");
          }
          if (isAcknowledged === true || isAcknowledged === "true") {
            query = query.not("acknowledged_at", "is", null);
          } else if (isAcknowledged === false || isAcknowledged === "false") {
            query = query.is("acknowledged_at", null);
          }

          const { data, error } = await query;
          if (!error && Array.isArray(data)) {
            let res = data;
            if (search && search.trim()) {
              const s = search.trim().toLowerCase();
              res = res.filter(d => 
                (d.title || "").toLowerCase().includes(s) ||
                (d.description || "").toLowerCase().includes(s) ||
                (d.category || "").toLowerCase().includes(s) ||
                (d.recipient?.full_name || "").toLowerCase().includes(s) ||
                (d.recipient?.email || "").toLowerCase().includes(s)
              );
            }
            return res;
          }
          if (error) console.warn("[DataLayer] getAllPersonalDocuments error:", error.message);
        } catch (e) {
          console.warn("[DataLayer] getAllPersonalDocuments exception:", e);
        }
      }

      return [];
    },

    async createPersonalDocument(docData, file) {
      const client = getClient();
      if (!isLive() || !client) {
        // Mock creation for offline
        const newDoc = {
          id: (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : ("doc_" + Date.now()),
          recipient_id: docData.recipient_id,
          title: docData.title,
          description: docData.description || null,
          category: docData.category || "other",
          storage_path: file ? `${docData.recipient_id}/${file.name}` : null,
          file_name: file ? file.name : (docData.file_name || "document.pdf"),
          file_size: file ? file.size : 1024000,
          mime_type: file ? file.type : "application/pdf",
          issued_by: null,
          issued_at: docData.issued_at || new Date().toISOString().split("T")[0],
          valid_until: docData.valid_until || null,
          requires_acknowledgement: Boolean(docData.requires_acknowledgement),
          acknowledged_at: null,
          first_opened_at: null,
          is_revoked: false,
          created_at: new Date().toISOString(),
          recipient: { full_name: docData.recipient_name || "Recipient User", email: docData.recipient_email || "user@ikaaiindia.org" },
          issuer: { full_name: "Devashish Chauhan" }
        };
        if (!window._fallbackPersonalDocs) window._fallbackPersonalDocs = [];
        window._fallbackPersonalDocs.unshift(newDoc);
        return newDoc;
      }

      const user = await window.SupabaseClient.getUser();
      if (!user) throw new Error("Admin authentication required.");

      let storagePath = null;
      let fileName = docData.file_name || null;
      let fileSize = docData.file_size || null;
      let mimeType = docData.mime_type || null;

      if (file) {
        const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
        const docTempId = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : ("doc_" + Date.now());
        // Storage path MUST start with recipient_id per DPDP/RLS policy
        storagePath = `${docData.recipient_id}/${docTempId}/${cleanName}`;

        const { error: uploadError } = await client.storage
          .from("personal-documents")
          .upload(storagePath, file, { cacheControl: "60", upsert: false });

        if (uploadError) throw new Error(`File upload failed: ${uploadError.message}`);
        fileName = file.name;
        fileSize = file.size;
        mimeType = file.type || "application/octet-stream";
      }

      const insertPayload = {
        recipient_id: docData.recipient_id,
        title: docData.title,
        description: docData.description || null,
        category: docData.category || "other",
        storage_path: storagePath,
        file_name: fileName,
        file_size: fileSize,
        mime_type: mimeType,
        issued_by: user.id,
        issued_at: docData.issued_at || new Date().toISOString().split("T")[0],
        valid_until: docData.valid_until || null,
        requires_acknowledgement: Boolean(docData.requires_acknowledgement),
        acknowledged_at: null,
        first_opened_at: null,
        is_revoked: false
      };

      const { data, error } = await client
        .from("personal_documents")
        .insert(insertPayload)
        .select(`
          *,
          recipient:recipient_id (id, full_name, email, programme_id),
          issuer:issued_by (id, full_name, email)
        `)
        .single();

      if (error) throw error;
      return data;
    },

    async bulkIssuePersonalDocuments(items, filesMap = {}) {
      const results = { successCount: 0, failedCount: 0, errors: [] };
      for (const item of items) {
        try {
          const file = filesMap[item.file_name];
          await DataLayer.createPersonalDocument(item, file);
          results.successCount++;
        } catch (e) {
          results.failedCount++;
          results.errors.push(`${item.email || item.recipient_id}: ${e.message}`);
        }
      }
      return results;
    },

    async revokePersonalDocument(docId) {
      const client = getClient();
      if (isLive() && client) {
        const { error } = await client
          .from("personal_documents")
          .update({ is_revoked: true })
          .eq("id", docId);
        if (error) throw error;
        return true;
      }
      if (window._fallbackPersonalDocs) {
        const d = window._fallbackPersonalDocs.find(x => String(x.id) === String(docId));
        if (d) d.is_revoked = true;
      }
      return true;
    },

    async unrevokePersonalDocument(docId) {
      const client = getClient();
      if (isLive() && client) {
        const { error } = await client
          .from("personal_documents")
          .update({ is_revoked: false })
          .eq("id", docId);
        if (error) throw error;
        return true;
      }
      if (window._fallbackPersonalDocs) {
        const d = window._fallbackPersonalDocs.find(x => String(x.id) === String(docId));
        if (d) d.is_revoked = false;
      }
      return true;
    },

    async replacePersonalDocumentFile(docId, file) {
      const client = getClient();
      if (!isLive() || !client) {
        if (window._fallbackPersonalDocs) {
          const d = window._fallbackPersonalDocs.find(x => String(x.id) === String(docId));
          if (d && file) {
            d.file_name = file.name;
            d.file_size = file.size;
            d.mime_type = file.type;
          }
        }
        return true;
      }

      // Fetch recipient_id
      const { data: currentDoc, error: fetchErr } = await client
        .from("personal_documents")
        .select("recipient_id")
        .eq("id", docId)
        .single();
      if (fetchErr) throw fetchErr;

      const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      const storagePath = `${currentDoc.recipient_id}/${docId}/${cleanName}`;

      const { error: uploadError } = await client.storage
        .from("personal-documents")
        .upload(storagePath, file, { cacheControl: "60", upsert: true });
      if (uploadError) throw uploadError;

      const { error: updateError } = await client
        .from("personal_documents")
        .update({
          storage_path: storagePath,
          file_name: file.name,
          file_size: file.size,
          mime_type: file.type || "application/octet-stream"
        })
        .eq("id", docId);
      if (updateError) throw updateError;
      return true;
    },

    async deletePersonalDocument(docId) {
      const client = getClient();
      if (isLive() && client) {
        const { error } = await client
          .from("personal_documents")
          .delete()
          .eq("id", docId);
        if (error) throw error;
        return true;
      }
      if (window._fallbackPersonalDocs) {
        window._fallbackPersonalDocs = window._fallbackPersonalDocs.filter(x => String(x.id) !== String(docId));
      }
      return true;
    },

    async getDocumentAccessLogs({ limit = 50, documentKind, documentId } = {}) {
      const client = getClient();
      if (isLive() && client) {
        try {
          let query = client
            .from("document_access_log")
            .select(`
              *,
              user:user_id (id, full_name, email, role)
            `)
            .order("created_at", { ascending: false })
            .limit(limit);

          if (documentKind) query = query.eq("document_kind", documentKind);
          if (documentId) query = query.eq("document_id", documentId);

          const { data, error } = await query;
          if (!error && Array.isArray(data)) return data;
        } catch (e) {
          console.warn("[DataLayer] getDocumentAccessLogs error:", e);
        }
      }

      return [];
    },

    async searchProfiles(searchQuery) {
      const client = getClient();
      if (isLive() && client) {
        try {
          let q = client
            .from("profiles")
            .select("id, full_name, email, role, programme_id")
            .order("full_name", { ascending: true })
            .limit(20);

          if (searchQuery && searchQuery.trim()) {
            const s = searchQuery.trim();
            q = q.or(`full_name.ilike.%${s}%,email.ilike.%${s}%`);
          }

          const { data, error } = await q;
          if (!error && Array.isArray(data)) return data;
        } catch (e) {
          console.warn("[DataLayer] searchProfiles error:", e);
        }
      }

      return [];
    },

    getFallbackPersonalDocuments() {
      return [];
    },

    // ------------------------------------------------------------------------
    // 10. REAL-TIME TEAM CHAT & DOCUMENTS
    // ------------------------------------------------------------------------
    async getChatConversations(programmeId, userProgrammeSlug) {
      const client = getClient();
      if (!isLive() || !client) return null;

      try {
        const { data, error } = await client
          .from('chat_conversations')
          .select(`
            *,
            members:chat_conversation_members(user_id, role, is_muted, notification_pref)
          `)
          .order('last_message_at', { ascending: false });

        if (error) {
          console.warn('[DataLayer] getChatConversations error:', error);
          return null;
        }
        return data;
      } catch (err) {
        console.warn('[DataLayer] getChatConversations exception:', err);
        return null;
      }
    },

    async getChatMessages(conversationId) {
      const client = getClient();
      if (!isLive() || !client || !conversationId) return null;

      try {
        const { data: messages, error: msgError } = await client
          .from('chat_messages')
          .select(`
            *,
            attachments:chat_attachments(*),
            reactions:chat_reactions(*)
          `)
          .eq('conversation_id', conversationId)
          .order('created_at', { ascending: true });

        if (msgError) {
          console.warn('[DataLayer] getChatMessages error:', msgError);
          return null;
        }
        return messages;
      } catch (err) {
        console.warn('[DataLayer] getChatMessages exception:', err);
        return null;
      }
    },

    async uploadChatAttachment(file, conversationId) {
      const client = getClient();
      if (!isLive() || !client || !file) {
        // Local / demo fallback
        const localUrl = URL.createObjectURL(file);
        return {
          file_name: file.name,
          file_size: file.size,
          mime_type: file.type || 'application/octet-stream',
          storage_path: `local/${Date.now()}_${file.name}`,
          file_url: localUrl
        };
      }

      // Generate a clean safe storage path
      const safeConvId = conversationId || 'general';
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const storagePath = `${safeConvId}/${Date.now()}_${cleanFileName}`;

      const { data: uploadData, error: uploadError } = await client.storage
        .from('chat-attachments')
        .upload(storagePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('[DataLayer] uploadChatAttachment error:', uploadError);
        throw new Error(`Document upload failed: ${uploadError.message}`);
      }

      let fileUrl = null;
      try {
        const { data: signedData } = await client.storage.from('chat-attachments').createSignedUrl(storagePath, 3600);
        if (signedData && signedData.signedUrl) fileUrl = signedData.signedUrl;
      } catch (e) {
        // signed URL will be fetched on demand
      }

      return {
        file_name: file.name,
        file_size: file.size,
        mime_type: file.type || 'application/octet-stream',
        storage_path: storagePath,
        file_url: fileUrl
      };
    },

    async getChatAttachmentDownloadUrl(storagePath, fileName) {
      if (!storagePath) return null;
      if (storagePath.startsWith('blob:') || storagePath.startsWith('data:') || storagePath.startsWith('http')) {
        return storagePath;
      }
      const client = getClient();
      if (!isLive() || !client) return null;

      try {
        const { data, error } = await client.storage
          .from('chat-attachments')
          .createSignedUrl(storagePath, 3600, {
            download: fileName || true
          });
        if (!error && data?.signedUrl) return data.signedUrl;
        return null;
      } catch (err) {
        console.warn('[DataLayer] getChatAttachmentDownloadUrl error:', err);
        return null;
      }
    },

    async sendChatMessage({ conversationId, content, parentMessageId, sharedItem, attachments = [] }) {
      const client = getClient();
      const currentUser = await window.SupabaseClient.getUser();
      const profile = await DataLayer.getMyProfile();

      if (!isLive() || !client || !currentUser) {
        return null; // Fallback to local in-memory
      }

      const senderName = profile?.full_name || profile?.display_name || currentUser.email.split('@')[0];
      const senderRole = profile?.role || 'learner';
      const senderAvatar = (senderName.split(' ').map(n => n[0]).join('').slice(0, 2) || 'U').toUpperCase();

      // Ensure conversation record exists in chat_conversations
      try {
        await client.from('chat_conversations').upsert({
          id: conversationId,
          name: conversationId.startsWith('dm_') ? 'Direct Message' : (conversationId === 'all-members' ? 'All Members' : '#' + conversationId),
          type: conversationId.startsWith('dm_') ? 'direct' : 'channel',
          last_message_at: new Date().toISOString(),
          last_message_preview: (content || '').substring(0, 100)
        }, { onConflict: 'id' });
      } catch (upsertErr) {
        console.warn('[DataLayer] Non-blocking conv upsert warning:', upsertErr);
      }

      // 1. Insert chat message
      const { data: newMsg, error: msgError } = await client
        .from('chat_messages')
        .insert({
          conversation_id: conversationId,
          sender_id: currentUser.id,
          sender_name: senderName,
          sender_role: senderRole,
          sender_avatar: senderAvatar,
          content: content || '',
          parent_message_id: parentMessageId || null,
          shared_item: sharedItem || null
        })
        .select()
        .single();

      if (msgError) {
        console.error('[DataLayer] sendChatMessage error:', msgError);
        throw msgError;
      }

      // 2. Insert chat attachments if any
      const insertedAttachments = [];
      if (attachments && attachments.length > 0) {
        const attRows = attachments.map(att => ({
          message_id: newMsg.id,
          conversation_id: conversationId,
          file_name: att.file_name || att.name,
          file_size: att.file_size || att.size || 0,
          mime_type: att.mime_type || att.type || 'application/octet-stream',
          storage_path: att.storage_path,
          public_url: att.file_url || null,
          uploaded_by: currentUser.id
        }));

        const { data: attData, error: attErr } = await client
          .from('chat_attachments')
          .insert(attRows)
          .select();

        if (attErr) {
          console.warn('[DataLayer] failed inserting chat_attachments rows:', attErr);
        } else if (attData) {
          insertedAttachments.push(...attData);
        }
      }

      return {
        ...newMsg,
        attachments: insertedAttachments,
        reactions: []
      };
    },

    async toggleChatReaction(messageId, emoji) {
      const client = getClient();
      const currentUser = await window.SupabaseClient.getUser();
      if (!isLive() || !client || !currentUser || !messageId || !emoji) return null;

      const profile = await DataLayer.getMyProfile();
      const userName = profile?.full_name || currentUser.email.split('@')[0];

      // Check if reaction already exists
      const { data: existing } = await client
        .from('chat_reactions')
        .select('id')
        .eq('message_id', messageId)
        .eq('user_id', currentUser.id)
        .eq('emoji', emoji)
        .maybeSingle();

      if (existing) {
        await client.from('chat_reactions').delete().eq('id', existing.id);
        return { action: 'removed', emoji };
      } else {
        await client.from('chat_reactions').insert({
          message_id: messageId,
          user_id: currentUser.id,
          user_name: userName,
          emoji: emoji
        });
        return { action: 'added', emoji };
      }
    },

    async pinChatMessage(messageId, isPinned) {
      const client = getClient();
      if (!isLive() || !client || !messageId) return false;
      const { error } = await client
        .from('chat_messages')
        .update({ is_pinned: isPinned, updated_at: new Date().toISOString() })
        .eq('id', messageId);
      return !error;
    },

    async deleteChatMessage(messageId) {
      const client = getClient();
      if (!isLive() || !client || !messageId) return false;
      const { error } = await client
        .from('chat_messages')
        .update({ is_deleted: true, content: 'This message was deleted.', updated_at: new Date().toISOString() })
        .eq('id', messageId);
      return !error;
    },

    async editChatMessage(messageId, newContent) {
      const client = getClient();
      if (!isLive() || !client || !messageId) return false;
      const { error } = await client
        .from('chat_messages')
        .update({ content: newContent, is_edited: true, updated_at: new Date().toISOString() })
        .eq('id', messageId);
      return !error;
    },

    async createChatGroup({ name, description, memberIds = [], programmeId = null, programmeSlug = 'hr' }) {
      const client = getClient();
      const currentUser = await window.SupabaseClient.getUser();
      if (!isLive() || !client || !currentUser) return null;

      const { data: conv, error: convErr } = await client
        .from('chat_conversations')
        .insert({
          name,
          description: description || null,
          type: 'group',
          slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          programme_id: programmeId,
          programme_slug: programmeSlug,
          created_by: currentUser.id
        })
        .select()
        .single();

      if (convErr || !conv) throw convErr || new Error('Could not create group.');

      const allMembers = Array.from(new Set([currentUser.id, ...memberIds]));
      const memberRows = allMembers.map(uid => ({
        conversation_id: conv.id,
        user_id: uid,
        role: uid === currentUser.id ? 'admin' : 'member'
      }));

      await client.from('chat_conversation_members').insert(memberRows);
      return conv;
    },

    async addMembersToChatGroup(conversationId, memberIds = []) {
      const client = getClient();
      if (!isLive() || !client || !conversationId || memberIds.length === 0) return false;

      const rows = memberIds.map(uid => ({
        conversation_id: conversationId,
        user_id: uid,
        role: 'member'
      }));

      const { error } = await client
        .from('chat_conversation_members')
        .insert(rows);

      return !error;
    },

    async getChatSharedFiles(conversationId) {
      const client = getClient();
      if (!isLive() || !client || !conversationId) return [];

      const { data, error } = await client
        .from('chat_attachments')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('[DataLayer] getChatSharedFiles error:', error);
        return [];
      }
      return data || [];
    }
  };

  window.DataLayer = DataLayer;
})();
