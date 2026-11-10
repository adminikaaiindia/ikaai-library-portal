# encoding: utf-8
import sys

print("Adding Personal Documents & Management methods to data.js...")

with open("data.js", "r", encoding="utf-8") as f:
    text = f.read()

target = "  window.DataLayer = DataLayer;\n})();"

personal_methods = """
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

      return DataLayer.getFallbackPersonalDocuments({ category, search });
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

      // Offline fallback
      return DataLayer.getFallbackPersonalDocuments({ category, search, isAdmin: true, recipientId, isAcknowledged, isRevoked });
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

      return [
        {
          id: "log_demo_1",
          document_kind: "personal",
          document_id: "p0000000-0000-0000-0000-000000000001",
          user_id: "u_demo_1",
          action: "acknowledge",
          created_at: new Date(Date.now() - 3600000).toISOString(),
          user: { full_name: "Aditi Rao", email: "aditi.rao@ikaaiindia.org", role: "intern" }
        },
        {
          id: "log_demo_2",
          document_kind: "personal",
          document_id: "p0000000-0000-0000-0000-000000000002",
          user_id: "u_demo_1",
          action: "download",
          created_at: new Date(Date.now() - 7200000).toISOString(),
          user: { full_name: "Aditi Rao", email: "aditi.rao@ikaaiindia.org", role: "intern" }
        },
        {
          id: "log_demo_3",
          document_kind: "personal",
          document_id: "p0000000-0000-0000-0000-000000000001",
          user_id: "u_demo_1",
          action: "view",
          created_at: new Date(Date.now() - 86400000).toISOString(),
          user: { full_name: "Aditi Rao", email: "aditi.rao@ikaaiindia.org", role: "intern" }
        }
      ];
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

      const mockProfiles = [
        { id: "10000000-0000-0000-0000-000000000001", full_name: "Aditi Rao (HR Intern)", email: "aditi.rao@ikaaiindia.org", role: "intern", programme_id: "10000000-0000-0000-0000-000000000001" },
        { id: "10000000-0000-0000-0000-000000000002", full_name: "Rohan Verma (Data Analyst Intern)", email: "rohan.verma@ikaaiindia.org", role: "intern", programme_id: "10000000-0000-0000-0000-000000000002" },
        { id: "10000000-0000-0000-0000-000000000003", full_name: "Sneha Patel (Research Intern)", email: "sneha.patel@ikaaiindia.org", role: "intern", programme_id: "10000000-0000-0000-0000-000000000003" },
        { id: "10000000-0000-0000-0000-000000000004", full_name: "Aman Gupta (Design Intern)", email: "aman.gupta@ikaaiindia.org", role: "intern", programme_id: "10000000-0000-0000-0000-000000000004" },
        { id: "10000000-0000-0000-0000-000000000005", full_name: "Pooja Sharma (BD Intern)", email: "pooja.sharma@ikaaiindia.org", role: "intern", programme_id: "10000000-0000-0000-0000-000000000005" },
        { id: "00000000-0000-0000-0000-000000000002", full_name: "Neha Singhal (Instructor)", email: "neha.singhal@ikaaiindia.org", role: "instructor", programme_id: "10000000-0000-0000-0000-000000000001" },
        { id: "00000000-0000-0000-0000-000000000001", full_name: "Devashish Chauhan (Admin)", email: "devashish@ikaaiindia.in", role: "admin", programme_id: null }
      ];

      if (searchQuery && searchQuery.trim()) {
        const s = searchQuery.trim().toLowerCase();
        return mockProfiles.filter(p => p.full_name.toLowerCase().includes(s) || p.email.toLowerCase().includes(s));
      }
      return mockProfiles;
    },

    getFallbackPersonalDocuments({ category, search, isAdmin = false, recipientId, isAcknowledged, isRevoked } = {}) {
      if (!window._fallbackPersonalDocs) {
        window._fallbackPersonalDocs = [
          {
            id: "p0000000-0000-0000-0000-000000000001",
            recipient_id: "current_user",
            title: "Official Internship Offer & Appointment Letter",
            description: "Your official letter of appointment as a cohort intern at Ikaai India Foundation outlining terms, duration, and supervisory assignment.",
            category: "offer_letter",
            storage_path: "current_user/p0000000-0000-0000-0000-000000000001/Offer_Letter_Ikaai.pdf",
            file_name: "Offer_Letter_Ikaai.pdf",
            file_size: 1450000,
            mime_type: "application/pdf",
            issued_by: "00000000-0000-0000-0000-000000000001",
            issued_at: new Date(Date.now() - 3 * 86400000).toISOString().split("T")[0],
            valid_until: null,
            requires_acknowledgement: true,
            acknowledged_at: null,
            first_opened_at: null,
            is_revoked: false,
            created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
            recipient: { full_name: "You (Signed-in User)", email: "user@ikaaiindia.org" },
            issuer: { full_name: "Devashish Chauhan" }
          },
          {
            id: "p0000000-0000-0000-0000-000000000002",
            recipient_id: "current_user",
            title: "Digital Internship Identity & Facility Access Card",
            description: "Official credential certificate and access card authorization for Ikaai Foundation research facilities and field stations.",
            category: "id_card",
            storage_path: "current_user/p0000000-0000-0000-0000-000000000002/Intern_ID_Card.png",
            file_name: "Intern_ID_Card.png",
            file_size: 890000,
            mime_type: "image/png",
            issued_by: "00000000-0000-0000-0000-000000000001",
            issued_at: new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0],
            valid_until: "2027-03-31",
            requires_acknowledgement: false,
            acknowledged_at: null,
            first_opened_at: new Date(Date.now() - 6 * 86400000).toISOString(),
            is_revoked: false,
            created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
            recipient: { full_name: "You (Signed-in User)", email: "user@ikaaiindia.org" },
            issuer: { full_name: "Devashish Chauhan" }
          },
          {
            id: "p0000000-0000-0000-0000-000000000003",
            recipient_id: "current_user",
            title: "Data Confidentiality & PII Protection Agreement",
            description: "Statutory declaration compliant with India DPDP Act 2023 governing non-disclosure of beneficiary survey records and primary field research data.",
            category: "agreement",
            storage_path: "current_user/p0000000-0000-0000-0000-000000000003/DPDP_Confidentiality_Agreement.pdf",
            file_name: "DPDP_Confidentiality_Agreement.pdf",
            file_size: 1980000,
            mime_type: "application/pdf",
            issued_by: "00000000-0000-0000-0000-000000000001",
            issued_at: new Date(Date.now() - 10 * 86400000).toISOString().split("T")[0],
            valid_until: null,
            requires_acknowledgement: true,
            acknowledged_at: new Date(Date.now() - 8 * 86400000).toISOString(),
            first_opened_at: new Date(Date.now() - 9 * 86400000).toISOString(),
            is_revoked: false,
            created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
            recipient: { full_name: "You (Signed-in User)", email: "user@ikaaiindia.org" },
            issuer: { full_name: "Devashish Chauhan" }
          },
          {
            id: "p0000000-0000-0000-0000-000000000004",
            recipient_id: "current_user",
            title: "Monthly Internship Stipend Advice - Month 1",
            description: "Official disbursement voucher and stipend credit verification for completion of Foundation Month 1 deliverables.",
            category: "payslip",
            storage_path: "current_user/p0000000-0000-0000-0000-000000000004/Stipend_Voucher_Month1.pdf",
            file_name: "Stipend_Voucher_Month1.pdf",
            file_size: 640000,
            mime_type: "application/pdf",
            issued_by: "00000000-0000-0000-0000-000000000001",
            issued_at: new Date(Date.now() - 18 * 86400000).toISOString().split("T")[0],
            valid_until: null,
            requires_acknowledgement: false,
            acknowledged_at: null,
            first_opened_at: new Date(Date.now() - 15 * 86400000).toISOString(),
            is_revoked: false,
            created_at: new Date(Date.now() - 18 * 86400000).toISOString(),
            recipient: { full_name: "You (Signed-in User)", email: "user@ikaaiindia.org" },
            issuer: { full_name: "Devashish Chauhan" }
          },
          {
            id: "p0000000-0000-0000-0000-000000000005",
            recipient_id: "10000000-0000-0000-0000-000000000002",
            title: "Special Commendation Certificate for Data Pipeline Automation",
            description: "Executive commendation issued for zero-defect field survey data cleaning.",
            category: "certificate",
            storage_path: "10000000-0000-0000-0000-000000000002/Commendation_Certificate.pdf",
            file_name: "Commendation_Certificate.pdf",
            file_size: 2150000,
            mime_type: "application/pdf",
            issued_by: "00000000-0000-0000-0000-000000000001",
            issued_at: new Date(Date.now() - 5 * 86400000).toISOString().split("T")[0],
            valid_until: null,
            requires_acknowledgement: false,
            acknowledged_at: null,
            first_opened_at: null,
            is_revoked: false,
            created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
            recipient: { full_name: "Rohan Verma", email: "rohan.verma@ikaaiindia.org" },
            issuer: { full_name: "Devashish Chauhan" }
          }
        ];
      }

      return window._fallbackPersonalDocs.filter(d => {
        if (!isAdmin) {
          // Normal user: see only their own active documents
          if (d.recipient_id !== "current_user") return false;
          if (d.is_revoked) return false;
        } else {
          // Admin filters
          if (recipientId && recipientId !== "all") {
            if (d.recipient_id !== recipientId && d.recipient?.id !== recipientId) return false;
          }
          if (isRevoked !== undefined && isRevoked !== null && isRevoked !== "all") {
            const revBool = isRevoked === true || isRevoked === "true";
            if (d.is_revoked !== revBool) return false;
          }
          if (isAcknowledged === true || isAcknowledged === "true") {
            if (!d.acknowledged_at) return false;
          } else if (isAcknowledged === false || isAcknowledged === "false") {
            if (d.acknowledged_at) return false;
          }
        }

        if (category && category !== "all" && d.category !== category) return false;

        if (search && search.trim()) {
          const s = search.trim().toLowerCase();
          const matchTitle = (d.title || "").toLowerCase().includes(s);
          const matchDesc = (d.description || "").toLowerCase().includes(s);
          const matchCat = (d.category || "").toLowerCase().includes(s);
          const matchRecip = (d.recipient?.full_name || "").toLowerCase().includes(s) || (d.recipient?.email || "").toLowerCase().includes(s);
          if (!matchTitle && !matchDesc && !matchCat && !matchRecip) return false;
        }
        return true;
      });
    }
"""

if target in text:
    text = text.replace(target, personal_methods + "\n  window.DataLayer = DataLayer;\n})();", 1)
    with open("data.js", "w", encoding="utf-8") as f:
        f.write(text)
    print("[OK] Successfully appended Section 11 & 12 to data.js")
else:
    print("! Could not find target in data.js")

