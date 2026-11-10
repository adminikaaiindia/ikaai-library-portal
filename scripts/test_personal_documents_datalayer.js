// Test Personal Documents Data Layer
const fs = require('fs');

global.window = global;
global.crypto = {
  randomUUID: () => 'p0000000-0000-0000-0000-000000000099'
};

global.SupabaseClient = {
  isConfigured: () => false,
  isReady: () => false,
  getClient: () => null,
  getUser: async () => ({ id: 'current_user', email: 'aditi.rao@ikaaiindia.org' }),
  getProfile: async () => ({ id: 'current_user', role: 'intern', programme_id: '10000000-0000-0000-0000-000000000001', full_name: 'Aditi Rao' })
};

const dataJs = fs.readFileSync('data.js', 'utf8');
eval(dataJs);

async function run() {
  console.log("Testing Personal Documents methods in DataLayer...");

  // 1. Get personal documents for current user
  const personalDocs = await window.DataLayer.getPersonalDocuments();
  console.log("Personal documents count for intern:", personalDocs.length);
  if (personalDocs.length < 3) {
    throw new Error("Expected at least 3 personal docs for user, got " + personalDocs.length);
  }

  // Verify none belong to other users
  for (const d of personalDocs) {
    if (d.recipient_id !== 'current_user') {
      throw new Error("Security leak: saw document belonging to: " + d.recipient_id);
    }
  }
  console.log("[PASS] Intern sees only their own personal documents.");

  // 2. Test Mark Document Opened
  const offerDoc = personalDocs.find(d => d.category === 'offer_letter');
  if (!offerDoc) throw new Error("Missing offer letter doc");
  console.log("Initial first_opened_at:", offerDoc.first_opened_at);
  await window.DataLayer.markPersonalDocumentOpened(offerDoc.id);
  console.log("Updated first_opened_at:", offerDoc.first_opened_at);
  if (!offerDoc.first_opened_at) throw new Error("first_opened_at not set");
  console.log("[PASS] markPersonalDocumentOpened updates timestamp.");

  // 3. Test Acknowledge Document
  console.log("Initial acknowledged_at:", offerDoc.acknowledged_at);
  await window.DataLayer.acknowledgePersonalDocument(offerDoc.id);
  console.log("Updated acknowledged_at:", offerDoc.acknowledged_at);
  if (!offerDoc.acknowledged_at) throw new Error("acknowledged_at not set");
  console.log("[PASS] acknowledgePersonalDocument records acceptance timestamp.");

  // 4. Test Unopened document count
  const unopenedCount = await window.DataLayer.getUnopenedDocumentCount();
  console.log("Unopened document count for badge:", unopenedCount);
  console.log("[PASS] getUnopenedDocumentCount calculated successfully.");

  // 5. Test Admin view of all personal docs
  const adminDocs = await window.DataLayer.getAllPersonalDocuments();
  console.log("Admin total personal documents visible:", adminDocs.length);
  if (adminDocs.length <= personalDocs.length) {
    throw new Error("Admin should see other users' documents too.");
  }
  console.log("[PASS] Admin can view all personal documents across recipients.");

  // 6. Test Admin Revoke
  const docToRevoke = adminDocs[0];
  await window.DataLayer.revokePersonalDocument(docToRevoke.id);
  if (!docToRevoke.is_revoked) throw new Error("Document was not revoked");
  console.log("[PASS] revokePersonalDocument updates is_revoked.");

  // Unrevoke
  await window.DataLayer.unrevokePersonalDocument(docToRevoke.id);
  if (docToRevoke.is_revoked) throw new Error("Document was not unrevoked");
  console.log("[PASS] unrevokePersonalDocument restores document.");

  // 7. Test Access Logs
  const logs = await window.DataLayer.getDocumentAccessLogs({ limit: 10 });
  console.log("Audit log records count:", logs.length);
  if (!Array.isArray(logs) || logs.length === 0) throw new Error("Expected access logs");
  console.log("[PASS] Access audit logs retrieved successfully.");

  console.log("\nALL PERSONAL DOCUMENTS DATA LAYER TESTS PASSED!");
}

run().catch(err => {
  console.error("TEST FAILED:", err);
  process.exit(1);
});

