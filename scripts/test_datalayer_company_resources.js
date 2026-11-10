// Test DataLayer methods in Node.js
const fs = require('fs');

// Create mock browser window/global
global.window = global;
global.crypto = {
  randomUUID: () => 'c0000000-0000-0000-0000-000000000099'
};

// Load supabase client mock
global.SupabaseClient = {
  isConfigured: () => false,
  isReady: () => false,
  getClient: () => null,
  getUser: async () => ({ id: 'u0000000-0000-0000-0000-000000000001', email: 'devashish@ikaaiindia.in' }),
  getProfile: async () => ({ id: 'u0000000-0000-0000-0000-000000000001', role: 'admin', full_name: 'Devashish Chauhan' })
};

// Evaluate data.js
const dataJs = fs.readFileSync('data.js', 'utf8');
eval(dataJs);

async function runTests() {
  console.log("Testing DataLayer Company Resources methods...");

  // 1. Test getCompanyDocuments fallback
  const allDocs = await window.DataLayer.getCompanyDocuments({});
  console.log("Total demo docs returned:", allDocs.length);
  if (allDocs.length < 8) {
    throw new Error("Expected at least 8 fallback demo documents, got " + allDocs.length);
  }

  // 2. Test Intern in Human Resources
  const hrDocs = await window.DataLayer.getCompanyDocuments({
    programmeId: '10000000-0000-0000-0000-000000000001',
    isPublished: true,
    isArchived: false
  });
  console.log("HR Intern visible docs:", hrDocs.length);
  // Verify that HR Intern sees ONLY HR docs or All Programmes docs
  for (const d of hrDocs) {
    if (d.programme_id !== null && d.programme_id !== '10000000-0000-0000-0000-000000000001') {
      throw new Error(`Data leakage: HR Intern saw document from programme ${d.programme_id}`);
    }
    if (!d.is_published) {
      throw new Error(`Data leakage: HR Intern saw unpublished draft document: ${d.title}`);
    }
    if (d.is_archived) {
      throw new Error(`Data leakage: HR Intern saw archived document: ${d.title}`);
    }
  }
  console.log("[PASS] HR Intern sees only HR and Global published documents.");

  // 3. Test Intern in Data Analyst
  const daDocs = await window.DataLayer.getCompanyDocuments({
    programmeId: '10000000-0000-0000-0000-000000000002',
    isPublished: true,
    isArchived: false
  });
  console.log("Data Analyst Intern visible docs:", daDocs.length);
  for (const d of daDocs) {
    if (d.programme_id !== null && d.programme_id !== '10000000-0000-0000-0000-000000000002') {
      throw new Error(`Data leakage: Data Analyst Intern saw document from programme ${d.programme_id}`);
    }
  }
  console.log("[PASS] Data Analyst Intern sees only Data Analyst and Global published documents.");

  // 4. Test Search filter
  const searchDocs = await window.DataLayer.getCompanyDocuments({
    search: 'leave'
  });
  console.log("Search 'leave' results:", searchDocs.length);
  if (!searchDocs.some(d => d.title.toLowerCase().includes('leave'))) {
    throw new Error("Search filter failed to find Leave Policy");
  }
  console.log("[PASS] Search query successfully filters documents.");

  // 5. Test Type filter
  const policyDocs = await window.DataLayer.getCompanyDocuments({
    documentType: 'policy'
  });
  console.log("Type 'policy' results:", policyDocs.length);
  for (const d of policyDocs) {
    if (d.document_type !== 'policy') {
      throw new Error("Type filter returned non-policy document: " + d.document_type);
    }
  }
  console.log("[PASS] Document type filter works accurately.");

  // 6. Test Drafts tab (is_published = false)
  const drafts = await window.DataLayer.getCompanyDocuments({
    isPublished: false
  });
  console.log("Draft documents count:", drafts.length);
  if (drafts.length === 0) {
    throw new Error("Expected at least 1 draft document in demo dataset");
  }
  for (const d of drafts) {
    if (d.is_published) {
      throw new Error("Draft filter returned published document: " + d.title);
    }
  }
  console.log("[PASS] Draft filter accurately returns unpublished documents.");

  // 7. Test Download Logger
  const logged = await window.DataLayer.logCompanyDocumentDownload(allDocs[0].id);
  console.log("[PASS] logCompanyDocumentDownload returned:", logged);

  console.log("\nALL COMPANY RESOURCES DATA LAYER TESTS PASSED SUCCESSFULLY!");
}

runTests().catch(err => {
  console.error("TEST FAILED:", err);
  process.exit(1);
});
