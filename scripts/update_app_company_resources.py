# encoding: utf-8
import sys

print("Updating Company Resources module in app.js with Personal Documents & Admin Manage tab...")

# Load full new module code
new_module_code = r'''  // ==========================================
  // SECTION 2B: COMPANY RESOURCES MODULE (PROGRAMME + PERSONAL + MANAGE)
  // ==========================================
  const compResState = {
    mainTab: localStorage.getItem('comp_res_active_tab') || 'programme', // 'programme' | 'personal' | 'manage'
    activeTab: 'published', // 'published' | 'drafts' (inside programme pane)
    selectedProgramme: 'all', // 'all' or UUID
    selectedType: 'all', // 'all' or document_type
    searchQuery: '',
    viewMode: 'grid', // 'grid' | 'list'
    documents: [],
    
    // Personal documents state
    personalCategory: 'all',
    personalSearch: '',
    personalViewMode: 'grid',
    personalDocs: [],

    // Admin Manage state
    manageView: 'docs', // 'docs' | 'users' | 'logs'
    manageRecipient: 'all',
    manageCategory: 'all',
    manageAck: 'all',
    manageRevoked: 'false',
    manageSearch: '',
    allPersonalDocs: [],
    accessLogs: [],
    profilesList: [],

    loading: false,
    initialized: false,
    activeMenuDocId: null
  };

  const COMP_RES_PROGRAMMES = {
    '10000000-0000-0000-0000-000000000001': 'Human Resources',
    '10000000-0000-0000-0000-000000000002': 'Data Analyst',
    '10000000-0000-0000-0000-000000000003': 'Social Research & Policy',
    '10000000-0000-0000-0000-000000000004': 'Design & Social Media',
    '10000000-0000-0000-0000-000000000005': 'Business Development'
  };

  const COMP_RES_TYPE_LABELS = {
    'policy': 'Policies',
    'guideline': 'Guidelines',
    'template': 'Templates',
    'form': 'Forms',
    'letter': 'Letters & Official Correspondence',
    'report': 'Reports',
    'other': 'Other Documents'
  };

  const COMP_RES_PERSONAL_CATEGORY_LABELS = {
    'offer_letter': 'Offer & Appointment Letters',
    'certificate': 'Certificates',
    'id_card': 'ID & Access Cards',
    'evaluation_letter': 'Performance & Evaluation Letters',
    'agreement': 'Agreements & Declarations',
    'payslip': 'Payslips & Stipend Letters',
    'other': 'Other Personal Documents'
  };

  function getCompResUserRole() {
    if (state && state.profile && state.profile.role) {
      return state.profile.role;
    }
    return 'intern';
  }

  function isCompResAdmin() {
    return getCompResUserRole() === 'admin';
  }

  function isCompResAdminOrInstructor() {
    const role = getCompResUserRole();
    return role === 'admin' || role === 'instructor';
  }

  function formatCompResFileSize(bytes) {
    if (!bytes || isNaN(bytes)) return 'Unknown size';
    const num = Number(bytes);
    if (num < 1024) return num + ' B';
    if (num < 1024 * 1024) return (num / 1024).toFixed(1) + ' KB';
    return (num / (1024 * 1024)).toFixed(1) + ' MB';
  }

  function formatCompResDate(dateStr) {
    if (!dateStr) return '—';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  }

  function getCompResFileTypeInfo(fileName, mimeType) {
    const name = (fileName || '').toLowerCase();
    const mime = (mimeType || '').toLowerCase();

    if (mime.includes('pdf') || name.endsWith('.pdf')) {
      return {
        type: 'PDF',
        class: 'comp-res-icon-pdf',
        canPreview: true,
        svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="9" y1="15" x2="15" y2="15"></line></svg>`
      };
    }
    if (mime.includes('word') || name.endsWith('.doc') || name.endsWith('.docx')) {
      return {
        type: 'Word',
        class: 'comp-res-icon-doc',
        canPreview: false,
        svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6a2 2 0 0 0-2 2z"></path><line x1="14" y1="2" x2="14" y2="8"></line><line x1="14" y1="8" x2="20" y2="8"></line><path d="M8 13l2 5 2-5 2 5 2-5"></path></svg>`
      };
    }
    if (mime.includes('sheet') || mime.includes('excel') || mime.includes('csv') || name.endsWith('.xls') || name.endsWith('.xlsx') || name.endsWith('.csv')) {
      return {
        type: 'Excel',
        class: 'comp-res-icon-xls',
        canPreview: false,
        svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>`
      };
    }
    if (mime.includes('presentation') || mime.includes('powerpoint') || name.endsWith('.ppt') || name.endsWith('.pptx')) {
      return {
        type: 'PowerPoint',
        class: 'comp-res-icon-ppt',
        canPreview: false,
        svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 3h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></path><path d="M8 21h8"></path><path d="M12 17v4"></path></svg>`
      };
    }
    if (mime.startsWith('image/') || /\.(png|jpe?g|webp|gif|svg)$/i.test(name)) {
      return {
        type: 'Image',
        class: 'comp-res-icon-img',
        canPreview: true,
        svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`
      };
    }
    return {
      type: 'File',
      class: 'comp-res-icon-other',
      canPreview: false,
      svg: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>`
    };
  }

  async function updateSidebarCompanyResourcesBadge() {
    const badge = document.getElementById('sidebarCompanyResourcesCountBadge');
    if (!badge) return;
    try {
      if (window.DataLayer && typeof window.DataLayer.getUnopenedDocumentCount === 'function') {
        const count = await window.DataLayer.getUnopenedDocumentCount();
        badge.textContent = count;
      }
    } catch (e) {
      console.warn('[CompanyResources] updateSidebarCount error:', e);
    }
  }

  function initCompanyResourcesEvents() {
    if (compResState.initialized) return;
    compResState.initialized = true;

    // 1. Top-Level Main Tabs: Programme, My Documents, Manage
    const tabProg = document.getElementById('compResNavTabProgramme');
    const tabPersonal = document.getElementById('compResNavTabPersonal');
    const tabManage = document.getElementById('compResNavTabManage');

    if (tabProg) tabProg.addEventListener('click', () => switchCompResMainTab('programme'));
    if (tabPersonal) tabPersonal.addEventListener('click', () => switchCompResMainTab('personal'));
    if (tabManage) tabManage.addEventListener('click', () => switchCompResMainTab('manage'));

    // 2. Programme Search input
    if (el.compResSearchInput) {
      let searchTimeout = null;
      el.compResSearchInput.addEventListener('input', (e) => {
        compResState.searchQuery = e.target.value;
        if (el.compResSearchClear) {
          el.compResSearchClear.style.display = compResState.searchQuery ? 'block' : 'none';
        }
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => renderCompanyResourcesList(), 200);
      });
    }

    if (el.compResSearchClear) {
      el.compResSearchClear.addEventListener('click', () => {
        if (el.compResSearchInput) el.compResSearchInput.value = '';
        compResState.searchQuery = '';
        el.compResSearchClear.style.display = 'none';
        renderCompanyResourcesList();
      });
    }

    // 3. Programme View mode toggle
    if (el.compResViewGridBtn && el.compResViewListBtn) {
      el.compResViewGridBtn.addEventListener('click', () => {
        compResState.viewMode = 'grid';
        el.compResViewGridBtn.classList.add('active');
        el.compResViewListBtn.classList.remove('active');
        renderCompanyResourcesList();
      });
      el.compResViewListBtn.addEventListener('click', () => {
        compResState.viewMode = 'list';
        el.compResViewListBtn.classList.add('active');
        el.compResViewGridBtn.classList.remove('active');
        renderCompanyResourcesList();
      });
    }

    // 4. Programme Document type chips
    if (el.compResTypeChipsBar) {
      const chips = el.compResTypeChipsBar.querySelectorAll('.comp-res-chip');
      chips.forEach(chip => {
        chip.addEventListener('click', () => {
          chips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          compResState.selectedType = chip.getAttribute('data-type') || 'all';
          renderCompanyResourcesList();
        });
      });
    }

    // 5. Programme Sub-tabs: Published vs Drafts
    if (el.compResTabPublished && el.compResTabDrafts) {
      el.compResTabPublished.addEventListener('click', () => {
        compResState.activeTab = 'published';
        el.compResTabPublished.classList.add('active');
        el.compResTabDrafts.classList.remove('active');
        loadCompanyResourcesDocuments();
      });
      el.compResTabDrafts.addEventListener('click', () => {
        compResState.activeTab = 'drafts';
        el.compResTabDrafts.classList.add('active');
        el.compResTabPublished.classList.remove('active');
        loadCompanyResourcesDocuments();
      });
    }

    // 6. Admin programme dropdown
    if (el.compResProgSelect) {
      el.compResProgSelect.addEventListener('change', (e) => {
        compResState.selectedProgramme = e.target.value;
        loadCompanyResourcesDocuments();
      });
    }

    // 7. Open Issue Programme Document modal
    if (el.openIssueDocBtn) {
      el.openIssueDocBtn.addEventListener('click', openIssueDocModal);
    }

    // 8. Personal Search & Filters
    const personalSearch = document.getElementById('compResPersonalSearchInput');
    const personalClear = document.getElementById('compResPersonalSearchClear');
    if (personalSearch) {
      let pSearchTimeout = null;
      personalSearch.addEventListener('input', (e) => {
        compResState.personalSearch = e.target.value;
        if (personalClear) personalClear.style.display = compResState.personalSearch ? 'block' : 'none';
        clearTimeout(pSearchTimeout);
        pSearchTimeout = setTimeout(() => renderPersonalDocumentsList(), 200);
      });
    }
    if (personalClear) {
      personalClear.addEventListener('click', () => {
        if (personalSearch) personalSearch.value = '';
        compResState.personalSearch = '';
        personalClear.style.display = 'none';
        renderPersonalDocumentsList();
      });
    }

    // Personal view mode toggle
    const pGridBtn = document.getElementById('compResPersonalViewGridBtn');
    const pListBtn = document.getElementById('compResPersonalViewListBtn');
    if (pGridBtn && pListBtn) {
      pGridBtn.addEventListener('click', () => {
        compResState.personalViewMode = 'grid';
        pGridBtn.classList.add('active');
        pListBtn.classList.remove('active');
        renderPersonalDocumentsList();
      });
      pListBtn.addEventListener('click', () => {
        compResState.personalViewMode = 'list';
        pListBtn.classList.add('active');
        pGridBtn.classList.remove('active');
        renderPersonalDocumentsList();
      });
    }

    // Personal Category chips
    const personalChipsBar = document.getElementById('compResPersonalCategoryChips');
    if (personalChipsBar) {
      const chips = personalChipsBar.querySelectorAll('.comp-res-chip');
      chips.forEach(chip => {
        chip.addEventListener('click', () => {
          chips.forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
          compResState.personalCategory = chip.getAttribute('data-category') || 'all';
          renderPersonalDocumentsList();
        });
      });
    }

    // 9. Admin Manage Sub-tabs
    const mDocsBtn = document.getElementById('compResManageTabDocs');
    const mUsersBtn = document.getElementById('compResManageTabUsers');
    const mLogsBtn = document.getElementById('compResManageTabLogs');

    if (mDocsBtn) mDocsBtn.addEventListener('click', () => switchManageView('docs'));
    if (mUsersBtn) mUsersBtn.addEventListener('click', () => switchManageView('users'));
    if (mLogsBtn) mLogsBtn.addEventListener('click', () => switchManageView('logs'));

    // Admin Manage Filters
    const mRecip = document.getElementById('compResManageRecipientFilter');
    const mCat = document.getElementById('compResManageCategoryFilter');
    const mAck = document.getElementById('compResManageAckFilter');
    const mRev = document.getElementById('compResManageRevokedFilter');
    const mSearch = document.getElementById('compResManageSearchInput');

    if (mRecip) mRecip.addEventListener('change', (e) => { compResState.manageRecipient = e.target.value; loadAndRenderManageDocs(); });
    if (mCat) mCat.addEventListener('change', (e) => { compResState.manageCategory = e.target.value; loadAndRenderManageDocs(); });
    if (mAck) mAck.addEventListener('change', (e) => { compResState.manageAck = e.target.value; loadAndRenderManageDocs(); });
    if (mRev) mRev.addEventListener('change', (e) => { compResState.manageRevoked = e.target.value; loadAndRenderManageDocs(); });
    if (mSearch) {
      let mTimeout = null;
      mSearch.addEventListener('input', (e) => {
        compResState.manageSearch = e.target.value;
        clearTimeout(mTimeout);
        mTimeout = setTimeout(() => loadAndRenderManageDocs(), 250);
      });
    }

    // Admin Manage Action Buttons
    const openIssuePersonalBtn = document.getElementById('openIssuePersonalDocBtn');
    if (openIssuePersonalBtn) openIssuePersonalBtn.addEventListener('click', openIssuePersonalDocModal);

    const openBulkBtn = document.getElementById('openBulkIssueModalBtn');
    if (openBulkBtn) openBulkBtn.addEventListener('click', openBulkIssueModal);

    // Modal dismissals
    setupCompResModalDismiss('issueDocModal', 'closeIssueDocModalBtn', 'cancelIssueDocBtn');
    setupCompResModalDismiss('editDocModal', 'closeEditDocModalBtn', 'cancelEditDocBtn');
    setupCompResModalDismiss('newVersionModal', 'closeNewVersionModalBtn', 'cancelNewVersionBtn');
    setupCompResModalDismiss('deleteDocConfirmModal', 'closeDeleteDocModalBtn', 'cancelDeleteDocBtn');
    setupCompResModalDismiss('issuePersonalDocModal', 'closeIssuePersonalModalBtn', 'cancelIssuePersonalBtn');
    setupCompResModalDismiss('bulkIssueModal', 'closeBulkIssueModalBtn', 'cancelBulkIssueBtn');
    setupCompResModalDismiss('replacePersonalFileModal', 'closeReplaceFileModalBtn', 'cancelReplaceFileBtn');
    setupCompResModalDismiss('confirmAcknowledgeModal', 'closeAckModalBtn', 'cancelAckModalBtn');

    // Close preview modal
    const closePreviewBtn = document.getElementById('closeCompDocPreviewBtn');
    const previewModal = document.getElementById('compDocPreviewModal');
    if (closePreviewBtn && previewModal) {
      closePreviewBtn.addEventListener('click', () => {
        previewModal.style.display = 'none';
        const body = document.getElementById('compDocPreviewBody');
        if (body) body.innerHTML = '';
      });
      previewModal.addEventListener('click', (e) => {
        if (e.target === previewModal) {
          previewModal.style.display = 'none';
          const body = document.getElementById('compDocPreviewBody');
          if (body) body.innerHTML = '';
        }
      });
    }

    // Forms setup
    setupIssueDocForm();
    setupEditDocForm();
    setupNewVersionForm();
    setupIssuePersonalDocForm();
    setupBulkIssueForm();
    setupReplacePersonalFileForm();

    // Close open menus on click outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.comp-res-admin-actions')) {
        document.querySelectorAll('.comp-res-dropdown-menu.active').forEach(m => m.classList.remove('active'));
        compResState.activeMenuDocId = null;
      }
    });
  }

  function switchCompResMainTab(tabKey) {
    const isAdmin = isCompResAdmin();
    if (tabKey === 'manage' && !isAdmin) tabKey = 'programme';

    compResState.mainTab = tabKey;
    localStorage.setItem('comp_res_active_tab', tabKey);

    const tabProg = document.getElementById('compResNavTabProgramme');
    const tabPersonal = document.getElementById('compResNavTabPersonal');
    const tabManage = document.getElementById('compResNavTabManage');

    if (tabProg) tabProg.classList.toggle('active', tabKey === 'programme');
    if (tabPersonal) tabPersonal.classList.toggle('active', tabKey === 'personal');
    if (tabManage) tabManage.classList.toggle('active', tabKey === 'manage');

    const paneProg = document.getElementById('compResPaneProgramme');
    const panePersonal = document.getElementById('compResPanePersonal');
    const paneManage = document.getElementById('compResPaneManage');

    if (paneProg) paneProg.style.display = tabKey === 'programme' ? 'block' : 'none';
    if (panePersonal) panePersonal.style.display = tabKey === 'personal' ? 'block' : 'none';
    if (paneManage) paneManage.style.display = tabKey === 'manage' ? 'block' : 'none';

    if (tabKey === 'programme') {
      loadCompanyResourcesDocuments();
    } else if (tabKey === 'personal') {
      loadPersonalDocuments();
    } else if (tabKey === 'manage') {
      loadAndRenderManageDocs();
    }
  }

  function setupCompResModalDismiss(modalId, closeBtnId, cancelBtnId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    const closeBtn = document.getElementById(closeBtnId);
    const cancelBtn = document.getElementById(cancelBtnId);

    const closeModal = () => { modal.style.display = 'none'; };
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  async function renderCompanyResourcesScreen() {
    initCompanyResourcesEvents();

    const role = getCompResUserRole();
    const isAdmin = role === 'admin';
    const isInstructor = role === 'instructor';
    const isStaff = isAdmin || isInstructor;

    // Show or hide Manage tab (Admin only)
    const tabManage = document.getElementById('compResNavTabManage');
    if (tabManage) {
      tabManage.style.display = isAdmin ? 'inline-flex' : 'none';
    }

    // Programme selector area
    if (isAdmin) {
      if (el.compResProgChip) el.compResProgChip.style.display = 'none';
      if (el.compResProgSelectWrapper) {
        el.compResProgSelectWrapper.style.display = 'inline-flex';
        if (el.compResProgSelect) el.compResProgSelect.value = compResState.selectedProgramme;
      }
    } else {
      if (el.compResProgSelectWrapper) el.compResProgSelectWrapper.style.display = 'none';
      if (el.compResProgChip) {
        el.compResProgChip.style.display = 'inline-flex';
        const progName = COMP_RES_PROGRAMMES[currentProgrammeId] || (state && state.programmes && state.programmes[currentProgrammeId] ? state.programmes[currentProgrammeId].name : 'Your Programme');
        if (el.compResProgChipText) el.compResProgChipText.textContent = progName;
      }
    }

    // Staff actions: Issue button & Drafts tab
    if (el.openIssueDocBtn) {
      el.openIssueDocBtn.style.display = isStaff ? 'inline-flex' : 'none';
    }
    if (el.compResTabDrafts) {
      el.compResTabDrafts.style.display = isStaff ? 'inline-flex' : 'none';
      if (!isStaff && compResState.activeTab === 'drafts') {
        compResState.activeTab = 'published';
        if (el.compResTabPublished) el.compResTabPublished.classList.add('active');
        el.compResTabDrafts.classList.remove('active');
      }
    }

    // Update counts & restore last active tab
    await updateSidebarCompanyResourcesBadge();
    const savedTab = localStorage.getItem('comp_res_active_tab') || 'programme';
    switchCompResMainTab(savedTab);
  }

  // ==========================================
  // TAB 1: PROGRAMME DOCUMENTS LOGIC
  // ==========================================
  async function loadCompanyResourcesDocuments() {
    if (!window.DataLayer || typeof window.DataLayer.getCompanyDocuments !== 'function') return;

    if (el.compResSkeleton) el.compResSkeleton.style.display = 'block';
    if (el.compResContent) el.compResContent.style.display = 'none';
    if (el.compResEmptyState) el.compResEmptyState.style.display = 'none';

    try {
      const role = getCompResUserRole();
      const isAdmin = role === 'admin';
      const progId = isAdmin ? (compResState.selectedProgramme === 'all' ? undefined : compResState.selectedProgramme) : currentProgrammeId;

      // 1. Fetch published documents count & documents
      const publishedDocs = await window.DataLayer.getCompanyDocuments({
        programmeId: progId,
        isPublished: true,
        isArchived: false
      });

      const progCount = Array.isArray(publishedDocs) ? publishedDocs.length : 0;
      if (el.compResPublishedCount) el.compResPublishedCount.textContent = progCount;
      const navProgCount = document.getElementById('compResNavProgrammeCount');
      if (navProgCount) navProgCount.textContent = progCount;

      // 2. If staff, fetch drafts count
      if (isCompResAdminOrInstructor()) {
        const draftDocs = await window.DataLayer.getCompanyDocuments({
          programmeId: progId,
          isPublished: false,
          isArchived: false
        });
        const archivedDocs = await window.DataLayer.getCompanyDocuments({
          programmeId: progId,
          isArchived: true
        });
        const totalDrafts = (Array.isArray(draftDocs) ? draftDocs.length : 0) + (Array.isArray(archivedDocs) ? archivedDocs.length : 0);
        if (el.compResDraftsCount) {
          el.compResDraftsCount.textContent = totalDrafts;
        }

        if (compResState.activeTab === 'drafts') {
          compResState.documents = [...(draftDocs || []), ...(archivedDocs || [])];
        } else {
          compResState.documents = publishedDocs || [];
        }
      } else {
        compResState.documents = publishedDocs || [];
      }
    } catch (e) {
      console.warn('[CompanyResources] load error:', e);
      compResState.documents = [];
    } finally {
      if (el.compResSkeleton) el.compResSkeleton.style.display = 'none';
      if (el.compResContent) el.compResContent.style.display = 'block';
      renderCompanyResourcesList();
    }
  }

  function renderCompanyResourcesList() {
    if (!el.compResContent) return;

    let docs = compResState.documents || [];

    // Filter by document_type
    if (compResState.selectedType && compResState.selectedType !== 'all') {
      docs = docs.filter(d => (d.document_type || 'other').toLowerCase() === compResState.selectedType.toLowerCase());
    }

    // Filter by search query
    if (compResState.searchQuery && compResState.searchQuery.trim()) {
      const q = compResState.searchQuery.trim().toLowerCase();
      docs = docs.filter(d => {
        const title = (d.title || '').toLowerCase();
        const desc = (d.description || '').toLowerCase();
        const type = (d.document_type || '').toLowerCase();
        const fileName = (d.file_name || '').toLowerCase();
        return title.includes(q) || desc.includes(q) || type.includes(q) || fileName.includes(q);
      });
    }

    if (docs.length === 0) {
      el.compResContent.innerHTML = '';
      if (el.compResEmptyState) {
        el.compResEmptyState.style.display = 'block';
        if (compResState.searchQuery || compResState.selectedType !== 'all') {
          if (el.compResEmptyTitle) el.compResEmptyTitle.textContent = 'No matching documents found';
          if (el.compResEmptyDesc) el.compResEmptyDesc.textContent = 'Try adjusting your search terms or clearing your filter chips.';
        } else if (compResState.activeTab === 'drafts') {
          if (el.compResEmptyTitle) el.compResEmptyTitle.textContent = 'No drafts or archived documents';
          if (el.compResEmptyDesc) el.compResEmptyDesc.textContent = 'Documents saved as drafts or archived will appear here.';
        } else {
          if (el.compResEmptyTitle) el.compResEmptyTitle.textContent = 'No documents have been issued for your programme yet.';
          if (el.compResEmptyDesc) el.compResEmptyDesc.textContent = 'Check back later or contact your instructor if you need official documents.';
        }
      }
      return;
    }

    if (el.compResEmptyState) el.compResEmptyState.style.display = 'none';

    // Group documents into sections by document_type
    const typeOrder = ['policy', 'guideline', 'template', 'form', 'letter', 'report', 'other'];
    const groups = {};
    docs.forEach(d => {
      const t = (d.document_type || 'other').toLowerCase();
      if (!groups[t]) groups[t] = [];
      groups[t].push(d);
    });

    let html = '';

    typeOrder.forEach(typeKey => {
      const typeDocs = groups[typeKey];
      if (!typeDocs || typeDocs.length === 0) return;

      const groupTitle = COMP_RES_TYPE_LABELS[typeKey] || (typeKey.charAt(0).toUpperCase() + typeKey.slice(1));
      html += `
        <section class="comp-res-section" data-group="${typeKey}">
          <div class="comp-res-section-header">
            <h2 class="comp-res-section-title">${escapeHtml(groupTitle)}</h2>
            <span class="comp-res-section-count">${typeDocs.length}</span>
          </div>
      `;

      if (compResState.viewMode === 'grid') {
        html += `<div class="comp-res-grid">`;
        typeDocs.forEach(doc => {
          html += renderCompResCardHtml(doc);
        });
        html += `</div>`;
      } else {
        html += renderCompResTableHtml(typeDocs);
      }

      html += `</section>`;
    });

    el.compResContent.innerHTML = html;
    attachCompResDocumentActions();
  }

  function renderCompResCardHtml(doc) {
    const fileInfo = getCompResFileTypeInfo(doc.file_name, doc.mime_type);
    const isNew = doc.issued_at && (Date.now() - new Date(doc.issued_at).getTime() <= 14 * 24 * 60 * 60 * 1000);
    const isUpdated = doc.is_updated || (doc.version && doc.version !== '1.0' && doc.version !== '1.0.0' && doc.version !== 'v1.0');
    const isDraft = !doc.is_published;
    const isArchived = doc.is_archived;
    const isStaff = isCompResAdminOrInstructor();

    let progBadgeHtml = '';
    if (!doc.programme_id) {
      progBadgeHtml = `<span class="badge-all-prog">All programmes</span>`;
    } else {
      const progName = COMP_RES_PROGRAMMES[doc.programme_id] || (doc.programmes && doc.programmes.name ? doc.programmes.name : 'Programme');
      progBadgeHtml = `<span class="badge-prog">${escapeHtml(progName)}</span>`;
    }

    const versionStr = doc.version ? `v${doc.version.replace(/^v/i, '')}` : 'v1.0';
    const issuerName = (doc.issuer && doc.issuer.full_name) ? doc.issuer.full_name : 'Ikaai India Foundation';

    return `
      <article class="comp-res-card" data-doc-id="${doc.id}">
        <div class="comp-res-card-top">
          <div class="comp-res-file-icon-wrap ${fileInfo.class}" title="${fileInfo.type}">
            ${fileInfo.svg}
          </div>
          <div class="comp-res-card-badges">
            ${isNew ? '<span class="badge-new">NEW</span>' : ''}
            ${isUpdated ? '<span class="badge-updated">UPDATED</span>' : ''}
            ${isDraft ? '<span class="badge-draft">DRAFT</span>' : ''}
            ${isArchived ? '<span class="badge-archived">ARCHIVED</span>' : ''}
            ${progBadgeHtml}
            <span class="badge-doc-type">${escapeHtml(doc.document_type || 'Document')}</span>
            <span class="badge-version">${escapeHtml(versionStr)}</span>
          </div>
        </div>

        <div class="comp-res-card-info">
          <h3 class="comp-res-card-title">${escapeHtml(doc.title || 'Untitled Document')}</h3>
          <p class="comp-res-card-desc">${escapeHtml(doc.description || 'No summary description provided for this document.')}</p>
          <div class="comp-res-card-meta">
            <span>Issued ${formatCompResDate(doc.issued_at)}</span>
            <span class="comp-res-card-meta-dot"></span>
            <span>By ${escapeHtml(issuerName)}</span>
            <span class="comp-res-card-meta-dot"></span>
            <span>${formatCompResFileSize(doc.file_size)}</span>
          </div>
        </div>

        <div class="comp-res-card-actions">
          <div class="comp-res-card-btns">
            <button type="button" class="comp-res-action-btn comp-res-btn-preview" data-doc-id="${doc.id}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <span>Preview</span>
            </button>
            <button type="button" class="comp-res-action-btn comp-res-btn-download" data-doc-id="${doc.id}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>Download</span>
            </button>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            ${isStaff ? `
              <span class="comp-res-download-stat" title="Total downloads">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                <span>${doc.download_count || 0}</span>
              </span>
              <div class="comp-res-admin-actions">
                <button type="button" class="comp-res-menu-btn" data-menu-id="${doc.id}" aria-label="Document options">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                </button>
                <div class="comp-res-dropdown-menu" id="compResMenu_${doc.id}">
                  <button type="button" class="comp-res-menu-item" data-action="edit" data-doc-id="${doc.id}">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    <span>Edit Details</span>
                  </button>
                  <button type="button" class="comp-res-menu-item" data-action="new-version" data-doc-id="${doc.id}">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 16 12 12 8 16"></polyline><line x1="12" y1="12" x2="12" y2="21"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path></svg>
                    <span>Upload New Version</span>
                  </button>
                  <button type="button" class="comp-res-menu-item" data-action="toggle-publish" data-doc-id="${doc.id}">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
                    <span>${doc.is_published ? 'Unpublish (Draft)' : 'Publish Document'}</span>
                  </button>
                  <button type="button" class="comp-res-menu-item" data-action="toggle-archive" data-doc-id="${doc.id}">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>
                    <span>${doc.is_archived ? 'Unarchive' : 'Archive'}</span>
                  </button>
                  <button type="button" class="comp-res-menu-item danger" data-action="delete" data-doc-id="${doc.id}">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    <span>Delete Document</span>
                  </button>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </article>
    `;
  }

  function renderCompResTableHtml(docs) {
    const isStaff = isCompResAdminOrInstructor();

    let rowsHtml = '';
    docs.forEach(doc => {
      const fileInfo = getCompResFileTypeInfo(doc.file_name, doc.mime_type);
      const isNew = doc.issued_at && (Date.now() - new Date(doc.issued_at).getTime() <= 14 * 24 * 60 * 60 * 1000);
      const isUpdated = doc.is_updated || (doc.version && doc.version !== '1.0' && doc.version !== '1.0.0' && doc.version !== 'v1.0');
      const progName = !doc.programme_id ? 'All programmes' : (COMP_RES_PROGRAMMES[doc.programme_id] || 'Programme');
      const versionStr = doc.version ? `v${doc.version.replace(/^v/i, '')}` : 'v1.0';
      const issuerName = (doc.issuer && doc.issuer.full_name) ? doc.issuer.full_name : 'Ikaai India';

      rowsHtml += `
        <tr data-doc-id="${doc.id}">
          <td style="min-width: 240px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div class="comp-res-file-icon-wrap ${fileInfo.class}" style="width: 32px; height: 32px;" title="${fileInfo.type}">
                ${fileInfo.svg}
              </div>
              <div>
                <strong style="display: block; font-size: 13.5px; color: var(--text-primary);">${escapeHtml(doc.title)}</strong>
                <span style="font-size: 11.5px; color: var(--text-secondary);">${escapeHtml(doc.file_name || 'Document')}</span>
                ${isNew ? '<span class="badge-new" style="margin-left: 6px;">NEW</span>' : ''}
                ${isUpdated ? '<span class="badge-updated" style="margin-left: 6px;">UPDATED</span>' : ''}
              </div>
            </div>
          </td>
          <td><span class="badge-doc-type">${escapeHtml(doc.document_type || 'other')}</span></td>
          <td><span class="${!doc.programme_id ? 'badge-all-prog' : 'badge-prog'}">${escapeHtml(progName)}</span></td>
          <td><span class="badge-version">${escapeHtml(versionStr)}</span></td>
          <td style="white-space: nowrap; font-size: 12px; color: var(--text-secondary);">${formatCompResDate(doc.issued_at)}</td>
          <td style="white-space: nowrap; font-size: 12px; color: var(--text-secondary);">${escapeHtml(issuerName)}</td>
          <td style="white-space: nowrap; font-size: 12px; color: var(--text-muted);">${formatCompResFileSize(doc.file_size)}</td>
          ${isStaff ? `<td style="font-size: 12px; color: var(--text-muted);">${doc.download_count || 0}</td>` : ''}
          <td style="white-space: nowrap;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <button type="button" class="comp-res-action-btn comp-res-btn-preview" data-doc-id="${doc.id}" style="padding: 4px 8px;" title="Preview">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
              <button type="button" class="comp-res-action-btn comp-res-btn-download" data-doc-id="${doc.id}" style="padding: 4px 8px;" title="Download">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </button>
              ${isStaff ? `
                <div class="comp-res-admin-actions">
                  <button type="button" class="comp-res-menu-btn" data-menu-id="${doc.id}" style="padding: 4px;" aria-label="Actions">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="5" r="1"></circle><circle cx="12" cy="19" r="1"></circle></svg>
                  </button>
                  <div class="comp-res-dropdown-menu" id="compResMenu_${doc.id}">
                    <button type="button" class="comp-res-menu-item" data-action="edit" data-doc-id="${doc.id}">Edit Details</button>
                    <button type="button" class="comp-res-menu-item" data-action="new-version" data-doc-id="${doc.id}">Upload New Version</button>
                    <button type="button" class="comp-res-menu-item" data-action="toggle-publish" data-doc-id="${doc.id}">${doc.is_published ? 'Unpublish' : 'Publish'}</button>
                    <button type="button" class="comp-res-menu-item" data-action="toggle-archive" data-doc-id="${doc.id}">${doc.is_archived ? 'Unarchive' : 'Archive'}</button>
                    <button type="button" class="comp-res-menu-item danger" data-action="delete" data-doc-id="${doc.id}">Delete</button>
                  </div>
                </div>
              ` : ''}
            </div>
          </td>
        </tr>
      `;
    });

    return `
      <div class="comp-res-table-wrap">
        <table class="comp-res-table">
          <thead>
            <tr>
              <th>Document</th>
              <th>Type</th>
              <th>Programme</th>
              <th>Version</th>
              <th>Issue Date</th>
              <th>Issued By</th>
              <th>Size</th>
              ${isStaff ? '<th>Downloads</th>' : ''}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
  }

  function attachCompResDocumentActions() {
    document.querySelectorAll('.comp-res-btn-preview').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const docId = btn.getAttribute('data-doc-id');
        const doc = (compResState.documents || []).find(d => String(d.id) === String(docId));
        if (doc) handlePreviewCompanyDoc(doc);
      });
    });

    document.querySelectorAll('.comp-res-btn-download').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const docId = btn.getAttribute('data-doc-id');
        const doc = (compResState.documents || []).find(d => String(d.id) === String(docId));
        if (doc) handleDownloadCompanyDoc(doc);
      });
    });

    document.querySelectorAll('.comp-res-menu-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const menuId = btn.getAttribute('data-menu-id');
        const menu = document.getElementById(`compResMenu_${menuId}`);
        const isCurrentActive = menu && menu.classList.contains('active');
        document.querySelectorAll('.comp-res-dropdown-menu.active').forEach(m => m.classList.remove('active'));
        if (menu && !isCurrentActive) {
          menu.classList.add('active');
          compResState.activeMenuDocId = menuId;
        } else {
          compResState.activeMenuDocId = null;
        }
      });
    });

    document.querySelectorAll('.comp-res-menu-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = item.getAttribute('data-action');
        const docId = item.getAttribute('data-doc-id');
        const doc = (compResState.documents || []).find(d => String(d.id) === String(docId));
        document.querySelectorAll('.comp-res-dropdown-menu.active').forEach(m => m.classList.remove('active'));

        if (!doc) return;

        if (action === 'edit') {
          openEditDocModal(doc);
        } else if (action === 'new-version') {
          openNewVersionModal(doc);
        } else if (action === 'toggle-publish') {
          togglePublishCompanyDoc(doc);
        } else if (action === 'toggle-archive') {
          toggleArchiveCompanyDoc(doc);
        } else if (action === 'delete') {
          openDeleteDocModal(doc);
        }
      });
    });
  }

  async function handlePreviewCompanyDoc(doc) {
    const modal = document.getElementById('compDocPreviewModal');
    const titleElem = document.getElementById('compDocPreviewTitle');
    const badgeElem = document.getElementById('compDocPreviewTypeBadge');
    const verElem = document.getElementById('compDocPreviewVer');
    const bodyElem = document.getElementById('compDocPreviewBody');
    const downloadBtn = document.getElementById('compDocPreviewDownloadBtn');

    if (!modal || !bodyElem) return;

    if (titleElem) titleElem.textContent = doc.title || 'Document Preview';
    if (badgeElem) badgeElem.textContent = (doc.document_type || 'Doc').toUpperCase();
    if (verElem) verElem.textContent = doc.version ? `v${doc.version.replace(/^v/i, '')}` : 'v1.0';

    if (downloadBtn) {
      downloadBtn.onclick = () => handleDownloadCompanyDoc(doc);
    }

    bodyElem.innerHTML = `
      <div style="padding: 40px; text-align: center; color: var(--text-secondary);">
        <div class="skeleton-shimmer" style="width: 120px; height: 120px; border-radius: 50%; margin: 0 auto 20px;"></div>
        <p style="font-size: 14px;">Generating secure preview...</p>
      </div>
    `;

    modal.style.display = 'flex';

    if (!doc.storage_path) {
      bodyElem.innerHTML = `
        <div class="comp-res-missing-file-alert">
          <div class="comp-res-missing-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <h4 class="comp-res-missing-title">File not uploaded yet</h4>
          <p class="comp-res-missing-desc">
            This document specification has been registered in the system, but the file has not been uploaded to the secure storage repository yet.
          </p>
        </div>
      `;
      return;
    }

    try {
      const signedUrl = await window.DataLayer.getCompanyDocumentSignedUrl(doc.storage_path);
      if (!signedUrl) throw new Error('Unable to generate signed URL');

      let fileExists = true;
      try {
        const headRes = await fetch(signedUrl, { method: 'HEAD' });
        if (!headRes.ok || headRes.status >= 400) fileExists = false;
      } catch (errHead) {}

      if (!fileExists) {
        bodyElem.innerHTML = `
          <div class="comp-res-missing-file-alert">
            <div class="comp-res-missing-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <h4 class="comp-res-missing-title">File not uploaded yet</h4>
            <p class="comp-res-missing-desc">The file path is assigned but no physical file exists in the storage bucket.</p>
          </div>
        `;
        return;
      }

      const fileInfo = getCompResFileTypeInfo(doc.file_name, doc.mime_type);

      if (fileInfo.type === 'PDF') {
        bodyElem.innerHTML = `<iframe class="comp-res-preview-iframe" src="${signedUrl}#toolbar=0" title="${escapeHtml(doc.title)}"></iframe>`;
      } else if (fileInfo.type === 'Image') {
        bodyElem.innerHTML = `<img class="comp-res-preview-img" src="${signedUrl}" alt="${escapeHtml(doc.title)}" />`;
      } else {
        bodyElem.innerHTML = `
          <div class="comp-res-missing-file-alert">
            <div style="width: 56px; height: 56px; border-radius: 12px; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;" class="${fileInfo.class}">
              ${fileInfo.svg}
            </div>
            <h4 class="comp-res-missing-title">In-Browser Preview Not Supported</h4>
            <p class="comp-res-missing-desc">
              ${escapeHtml(fileInfo.type)} documents cannot be previewed directly inside the web browser. Please download the file to view it on your device.
            </p>
            <button type="button" class="primary-btn" id="modalPromptDownloadBtn" style="display: inline-flex; align-items: center; gap: 8px;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>Download File (${formatCompResFileSize(doc.file_size)})</span>
            </button>
          </div>
        `;
        const promptBtn = document.getElementById('modalPromptDownloadBtn');
        if (promptBtn) promptBtn.onclick = () => handleDownloadCompanyDoc(doc);
      }
    } catch (e) {
      console.warn('[CompanyResources] preview error:', e);
      bodyElem.innerHTML = `
        <div class="comp-res-missing-file-alert">
          <div class="comp-res-missing-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg></div>
          <h4 class="comp-res-missing-title">File not uploaded yet</h4>
          <p class="comp-res-missing-desc">Unable to fetch document from storage repository.</p>
        </div>
      `;
    }
  }

  async function handleDownloadCompanyDoc(doc) {
    if (!doc.storage_path) {
      showToast('File not uploaded yet for this document.');
      handlePreviewCompanyDoc(doc);
      return;
    }

    try {
      showToast(`Preparing download for ${doc.title}...`);
      const signedUrl = await window.DataLayer.getCompanyDocumentSignedUrl(doc.storage_path);
      if (!signedUrl) throw new Error('Signed URL creation failed.');

      try {
        const headRes = await fetch(signedUrl, { method: 'HEAD' });
        if (!headRes.ok || headRes.status >= 400) {
          showToast('File not uploaded yet.');
          handlePreviewCompanyDoc(doc);
          return;
        }
      } catch (errHead) {}

      const fileName = doc.file_name || doc.storage_path.split('/').pop() || `${doc.title}.pdf`;
      const a = document.createElement('a');
      a.href = signedUrl;
      a.download = fileName;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => document.body.removeChild(a), 500);

      await window.DataLayer.logCompanyDocumentDownload(doc.id);
      doc.download_count = (doc.download_count || 0) + 1;
      showToast(`Download started: ${fileName}`);
    } catch (e) {
      console.warn('[CompanyResources] download error:', e);
      showToast('Download error: File not uploaded yet.');
    }
  }

  // --- Modals for Programme Documents ---
  function openIssueDocModal() {
    const modal = document.getElementById('issueDocModal');
    const form = document.getElementById('issueDocForm');
    const progSelect = document.getElementById('issueDocProgramme');
    const errAlert = document.getElementById('issueDocErrorAlert');
    const progressWrap = document.getElementById('issueDocProgressWrap');
    const dateInput = document.getElementById('issueDocDate');
    const label = document.getElementById('issueDocFileLabel');

    if (!modal || !form) return;
    form.reset();
    if (errAlert) errAlert.style.display = 'none';
    if (progressWrap) progressWrap.style.display = 'none';
    if (label) label.textContent = 'Choose file or drag & drop here';
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

    if (progSelect) {
      const role = getCompResUserRole();
      if (role === 'instructor') {
        progSelect.value = currentProgrammeId;
        Array.from(progSelect.options).forEach(opt => opt.disabled = (opt.value !== currentProgrammeId));
      } else {
        Array.from(progSelect.options).forEach(opt => opt.disabled = false);
        progSelect.value = compResState.selectedProgramme === 'all' ? '' : compResState.selectedProgramme;
      }
    }

    modal.style.display = 'flex';
  }

  function setupIssueDocForm() {
    const form = document.getElementById('issueDocForm');
    const fileInput = document.getElementById('issueDocFile');
    const label = document.getElementById('issueDocFileLabel');
    const errAlert = document.getElementById('issueDocErrorAlert');
    const progressWrap = document.getElementById('issueDocProgressWrap');
    const progressFill = document.getElementById('issueDocProgressFill');
    const submitBtn = document.getElementById('submitIssueDocBtn');

    if (fileInput && label) {
      fileInput.addEventListener('change', () => {
        if (fileInput.files && fileInput.files[0]) {
          label.textContent = fileInput.files[0].name + ` (${formatCompResFileSize(fileInput.files[0].size)})`;
        }
      });
    }

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (errAlert) errAlert.style.display = 'none';

        const title = document.getElementById('issueDocTitle')?.value.trim();
        const desc = document.getElementById('issueDocDesc')?.value.trim();
        const type = document.getElementById('issueDocType')?.value;
        const prog = document.getElementById('issueDocProgramme')?.value || null;
        const ver = document.getElementById('issueDocVersion')?.value.trim() || '1.0';
        const date = document.getElementById('issueDocDate')?.value || new Date().toISOString().split('T')[0];
        const isPub = document.getElementById('issueDocIsPublished')?.checked ?? true;
        const file = fileInput?.files?.[0];

        if (!title) { showModalError(errAlert, 'Document title is required.'); return; }
        if (file && file.size > 20 * 1024 * 1024) { showModalError(errAlert, 'File size exceeds maximum limit of 20 MB.'); return; }

        try {
          if (submitBtn) submitBtn.disabled = true;
          if (progressWrap) progressWrap.style.display = 'block';
          if (progressFill) progressFill.style.width = '60%';

          await window.DataLayer.createCompanyDocument({
            title, description: desc, document_type: type, programme_id: prog,
            version: ver, issued_at: date, is_published: isPub
          }, file);

          if (progressFill) progressFill.style.width = '100%';
          showToast('Programme document issued successfully!');
          const modal = document.getElementById('issueDocModal');
          if (modal) modal.style.display = 'none';

          await loadCompanyResourcesDocuments();
          await updateSidebarCompanyResourcesBadge();
        } catch (err) {
          showModalError(errAlert, err.message || 'Failed to issue document.');
        } finally {
          if (submitBtn) submitBtn.disabled = false;
        }
      });
    }
  }

  function openEditDocModal(doc) {
    const modal = document.getElementById('editDocModal');
    const idInput = document.getElementById('editDocId');
    const titleInput = document.getElementById('editDocTitle');
    const descInput = document.getElementById('editDocDesc');
    const typeSelect = document.getElementById('editDocType');
    const progSelect = document.getElementById('editDocProgramme');
    const verInput = document.getElementById('editDocVersion');
    const dateInput = document.getElementById('editDocDate');
    const pubCheck = document.getElementById('editDocIsPublished');
    const archCheck = document.getElementById('editDocIsArchived');
    const errAlert = document.getElementById('editDocErrorAlert');

    if (!modal) return;
    if (errAlert) errAlert.style.display = 'none';

    if (idInput) idInput.value = doc.id;
    if (titleInput) titleInput.value = doc.title || '';
    if (descInput) descInput.value = doc.description || '';
    if (typeSelect) typeSelect.value = doc.document_type || 'other';
    if (progSelect) {
      progSelect.value = doc.programme_id || '';
      const role = getCompResUserRole();
      if (role === 'instructor') {
        Array.from(progSelect.options).forEach(opt => opt.disabled = (opt.value !== currentProgrammeId));
      } else {
        Array.from(progSelect.options).forEach(opt => opt.disabled = false);
      }
    }
    if (verInput) verInput.value = doc.version || '1.0';
    if (dateInput) dateInput.value = doc.issued_at || '';
    if (pubCheck) pubCheck.checked = Boolean(doc.is_published);
    if (archCheck) archCheck.checked = Boolean(doc.is_archived);

    modal.style.display = 'flex';
  }

  function setupEditDocForm() {
    const form = document.getElementById('editDocForm');
    const errAlert = document.getElementById('editDocErrorAlert');
    const saveBtn = document.getElementById('saveEditDocBtn');

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const docId = document.getElementById('editDocId')?.value;
        const title = document.getElementById('editDocTitle')?.value.trim();
        const desc = document.getElementById('editDocDesc')?.value.trim();
        const type = document.getElementById('editDocType')?.value;
        const prog = document.getElementById('editDocProgramme')?.value || null;
        const ver = document.getElementById('editDocVersion')?.value.trim();
        const date = document.getElementById('editDocDate')?.value;
        const isPub = document.getElementById('editDocIsPublished')?.checked;
        const isArch = document.getElementById('editDocIsArchived')?.checked;

        if (!title) { showModalError(errAlert, 'Document title is required.'); return; }

        try {
          if (saveBtn) saveBtn.disabled = true;
          await window.DataLayer.updateCompanyDocument(docId, {
            title, description: desc, document_type: type, programme_id: prog,
            version: ver, issued_at: date, is_published: isPub, is_archived: isArch
          });
          showToast('Document details updated.');
          const modal = document.getElementById('editDocModal');
          if (modal) modal.style.display = 'none';

          await loadCompanyResourcesDocuments();
        } catch (err) {
          showModalError(errAlert, err.message || 'Failed to update document.');
        } finally {
          if (saveBtn) saveBtn.disabled = false;
        }
      });
    }
  }

  async function openNewVersionModal(doc) {
    const modal = document.getElementById('newVersionModal');
    const form = document.getElementById('newVersionForm');
    const idInput = document.getElementById('newVersionDocId');
    const titleDisplay = document.getElementById('newVersionDocTitle');
    const verInput = document.getElementById('newVersionNumber');
    const label = document.getElementById('newVersionFileLabel');
    const historyBox = document.getElementById('newVersionHistoryBox');
    const historyList = document.getElementById('newVersionHistoryList');
    const errAlert = document.getElementById('newVersionErrorAlert');

    if (!modal) return;
    if (form) form.reset();
    if (errAlert) errAlert.style.display = 'none';
    if (label) label.textContent = 'Choose file or drag & drop';

    if (idInput) idInput.value = doc.id;
    if (titleDisplay) titleDisplay.textContent = `Document: ${doc.title} (Current: v${doc.version || '1.0'})`;

    const currentNum = parseFloat((doc.version || '1.0').replace(/[^\d.]/g, ''));
    verInput.value = !isNaN(currentNum) ? (currentNum + 0.1).toFixed(1) : '2.0';

    if (historyBox && historyList && window.DataLayer.getDocumentVersions) {
      try {
        const versions = await window.DataLayer.getDocumentVersions(doc.id);
        if (versions && versions.length > 0) {
          historyBox.style.display = 'block';
          historyList.innerHTML = versions.map(v => `
            <div class="comp-res-history-item">
              <div><strong>v${escapeHtml(v.version)}</strong> &bull; <span style="color: var(--text-muted);">${formatCompResDate(v.uploaded_at)}</span></div>
              <span style="color: var(--text-muted); font-size: 11.5px;">${escapeHtml(v.storage_path ? v.storage_path.split('/').pop() : '')}</span>
            </div>
          `).join('');
        } else {
          historyBox.style.display = 'none';
        }
      } catch (errVer) {
        historyBox.style.display = 'none';
      }
    }

    modal.style.display = 'flex';
  }

  function setupNewVersionForm() {
    const form = document.getElementById('newVersionForm');
    const fileInput = document.getElementById('newVersionFile');
    const label = document.getElementById('newVersionFileLabel');
    const errAlert = document.getElementById('newVersionErrorAlert');
    const submitBtn = document.getElementById('submitNewVersionBtn');

    if (fileInput && label) {
      fileInput.addEventListener('change', () => {
        if (fileInput.files && fileInput.files[0]) {
          label.textContent = fileInput.files[0].name + ` (${formatCompResFileSize(fileInput.files[0].size)})`;
        }
      });
    }

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const docId = document.getElementById('newVersionDocId')?.value;
        const ver = document.getElementById('newVersionNumber')?.value.trim();
        const changelog = document.getElementById('newVersionChangelog')?.value.trim();
        const file = fileInput?.files?.[0];

        if (!ver) { showModalError(errAlert, 'Version number is required.'); return; }
        if (!file) { showModalError(errAlert, 'Please attach the new version file.'); return; }

        try {
          if (submitBtn) submitBtn.disabled = true;
          await window.DataLayer.uploadDocumentNewVersion(docId, { version: ver, changelog, file });
          showToast(`Version ${ver} uploaded successfully!`);
          const modal = document.getElementById('newVersionModal');
          if (modal) modal.style.display = 'none';
          await loadCompanyResourcesDocuments();
        } catch (err) {
          showModalError(errAlert, err.message || 'Failed to upload version.');
        } finally {
          if (submitBtn) submitBtn.disabled = false;
        }
      });
    }
  }

  function openDeleteDocModal(doc) {
    const modal = document.getElementById('deleteDocConfirmModal');
    const nameDisplay = document.getElementById('deleteDocName');
    const confirmBtn = document.getElementById('confirmDeleteDocBtn');

    if (!modal) return;
    if (nameDisplay) nameDisplay.textContent = doc.title;

    if (confirmBtn) {
      confirmBtn.onclick = async () => {
        try {
          confirmBtn.disabled = true;
          await window.DataLayer.deleteCompanyDocument(doc.id);
          showToast(`Document "${doc.title}" deleted.`);
          modal.style.display = 'none';
          await loadCompanyResourcesDocuments();
        } catch (err) {
          showToast('Failed to delete document: ' + err.message);
        } finally {
          confirmBtn.disabled = false;
        }
      };
    }

    modal.style.display = 'flex';
  }

  async function togglePublishCompanyDoc(doc) {
    try {
      const nextPub = !doc.is_published;
      await window.DataLayer.updateCompanyDocument(doc.id, { is_published: nextPub });
      showToast(nextPub ? 'Document published to learners.' : 'Document moved to drafts.');
      await loadCompanyResourcesDocuments();
    } catch (err) {
      showToast('Error changing document status: ' + err.message);
    }
  }

  async function toggleArchiveCompanyDoc(doc) {
    try {
      const nextArch = !doc.is_archived;
      await window.DataLayer.updateCompanyDocument(doc.id, { is_archived: nextArch });
      showToast(nextArch ? 'Document archived.' : 'Document unarchived.');
      await loadCompanyResourcesDocuments();
    } catch (err) {
      showToast('Error changing archive status: ' + err.message);
    }
  }

  // ==========================================
  // TAB 2: MY DOCUMENTS (PERSONAL DOCUMENTS) LOGIC
  // ==========================================
  async function loadPersonalDocuments() {
    const container = document.getElementById('compResPersonalContent');
    const emptyState = document.getElementById('compResPersonalEmptyState');
    if (!container) return;

    container.innerHTML = `
      <div style="padding: 40px; text-align: center;">
        <div class="skeleton-shimmer" style="height: 24px; width: 200px; margin: 0 auto 16px; border-radius: 4px;"></div>
        <div class="comp-res-grid">
          <div class="skeleton-shimmer comp-res-skel-card"></div>
          <div class="skeleton-shimmer comp-res-skel-card"></div>
        </div>
      </div>
    `;
    if (emptyState) emptyState.style.display = 'none';

    try {
      const docs = await window.DataLayer.getPersonalDocuments();
      compResState.personalDocs = Array.isArray(docs) ? docs : [];

      const navPersonalCount = document.getElementById('compResNavPersonalCount');
      if (navPersonalCount) navPersonalCount.textContent = compResState.personalDocs.length;
    } catch (e) {
      console.warn('[PersonalDocs] load error:', e);
      compResState.personalDocs = [];
    } finally {
      renderPersonalDocumentsList();
    }
  }

  function renderPersonalDocumentsList() {
    const container = document.getElementById('compResPersonalContent');
    const emptyState = document.getElementById('compResPersonalEmptyState');
    if (!container) return;

    let docs = compResState.personalDocs || [];

    // Filter by category
    if (compResState.personalCategory && compResState.personalCategory !== 'all') {
      docs = docs.filter(d => (d.category || 'other').toLowerCase() === compResState.personalCategory.toLowerCase());
    }

    // Filter by search
    if (compResState.personalSearch && compResState.personalSearch.trim()) {
      const q = compResState.personalSearch.trim().toLowerCase();
      docs = docs.filter(d => {
        const title = (d.title || '').toLowerCase();
        const desc = (d.description || '').toLowerCase();
        const cat = (d.category || '').toLowerCase();
        return title.includes(q) || desc.includes(q) || cat.includes(q);
      });
    }

    if (docs.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    // Group personal documents by category
    const catOrder = ['offer_letter', 'certificate', 'id_card', 'evaluation_letter', 'agreement', 'payslip', 'other'];
    const groups = {};
    docs.forEach(d => {
      const cat = (d.category || 'other').toLowerCase();
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(d);
    });

    let html = '';

    catOrder.forEach(catKey => {
      const catDocs = groups[catKey];
      if (!catDocs || catDocs.length === 0) return;

      const groupTitle = COMP_RES_PERSONAL_CATEGORY_LABELS[catKey] || (catKey.charAt(0).toUpperCase() + catKey.slice(1));
      html += `
        <section class="comp-res-section">
          <div class="comp-res-section-header">
            <h2 class="comp-res-section-title">${escapeHtml(groupTitle)}</h2>
            <span class="comp-res-section-count">${catDocs.length}</span>
          </div>
      `;

      if (compResState.personalViewMode === 'grid') {
        html += `<div class="comp-res-grid">`;
        catDocs.forEach(doc => {
          html += renderPersonalDocCardHtml(doc);
        });
        html += `</div>`;
      } else {
        html += renderPersonalDocTableHtml(catDocs);
      }

      html += `</section>`;
    });

    container.innerHTML = html;
    attachPersonalDocumentActions();
  }

  function renderPersonalDocCardHtml(doc) {
    const fileInfo = getCompResFileTypeInfo(doc.file_name, doc.mime_type);
    const isNew = !doc.first_opened_at;
    const isAckRequired = doc.requires_acknowledgement && !doc.acknowledged_at;
    const isAcknowledged = Boolean(doc.acknowledged_at);
    const isRevoked = Boolean(doc.is_revoked);
    const issuerName = (doc.issuer && doc.issuer.full_name) ? doc.issuer.full_name : 'Ikaai India Foundation';

    return `
      <article class="comp-res-card" data-personal-doc-id="${doc.id}">
        <div class="comp-res-card-top">
          <div class="comp-res-file-icon-wrap ${fileInfo.class}" title="${fileInfo.type}">
            ${fileInfo.svg}
          </div>
          <div class="comp-res-card-badges">
            ${isNew ? '<span class="badge-new">NEW</span>' : ''}
            ${isAckRequired ? '<span class="badge-action-required">Action Required</span>' : ''}
            ${isAcknowledged ? '<span class="badge-acknowledged">Acknowledged</span>' : ''}
            ${isRevoked ? '<span class="badge-revoked">REVOKED</span>' : ''}
            <span class="badge-doc-type">${escapeHtml(doc.category?.replace(/_/g, ' ') || 'Personal')}</span>
          </div>
        </div>

        <div class="comp-res-card-info">
          <h3 class="comp-res-card-title">${escapeHtml(doc.title || 'Untitled Document')}</h3>
          <p class="comp-res-card-desc">${escapeHtml(doc.description || 'Confidential personal record.')}</p>
          <div class="comp-res-card-meta">
            <span>Issued ${formatCompResDate(doc.issued_at)}</span>
            <span class="comp-res-card-meta-dot"></span>
            <span>By ${escapeHtml(issuerName)}</span>
            ${doc.valid_until ? `
              <span class="comp-res-card-meta-dot"></span>
              <span style="color: var(--accent-light);">Valid until ${formatCompResDate(doc.valid_until)}</span>
            ` : ''}
            <span class="comp-res-card-meta-dot"></span>
            <span>${formatCompResFileSize(doc.file_size)}</span>
          </div>
        </div>

        ${isAckRequired ? `
          <div class="comp-res-ack-card-banner">
            <div class="comp-res-ack-card-text">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <span>Please read and confirm</span>
            </div>
            <button type="button" class="comp-res-ack-action-btn" data-ack-doc-id="${doc.id}">
              I have read &amp; accept
            </button>
          </div>
        ` : ''}

        <div class="comp-res-card-actions">
          <div class="comp-res-card-btns">
            <button type="button" class="comp-res-action-btn comp-res-btn-preview" data-personal-view-id="${doc.id}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              <span>View</span>
            </button>
            <button type="button" class="comp-res-action-btn comp-res-btn-download" data-personal-download-id="${doc.id}">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>Download</span>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function renderPersonalDocTableHtml(docs) {
    let rowsHtml = '';
    docs.forEach(doc => {
      const fileInfo = getCompResFileTypeInfo(doc.file_name, doc.mime_type);
      const isNew = !doc.first_opened_at;
      const isAckRequired = doc.requires_acknowledgement && !doc.acknowledged_at;
      const isAcknowledged = Boolean(doc.acknowledged_at);
      const issuerName = (doc.issuer && doc.issuer.full_name) ? doc.issuer.full_name : 'Ikaai India';

      rowsHtml += `
        <tr data-personal-doc-id="${doc.id}">
          <td style="min-width: 240px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div class="comp-res-file-icon-wrap ${fileInfo.class}" style="width: 32px; height: 32px;">
                ${fileInfo.svg}
              </div>
              <div>
                <strong style="display: block; font-size: 13.5px; color: var(--text-primary);">${escapeHtml(doc.title)}</strong>
                <span style="font-size: 11.5px; color: var(--text-secondary);">${escapeHtml(doc.file_name || 'Document')}</span>
                ${isNew ? '<span class="badge-new" style="margin-left: 6px;">NEW</span>' : ''}
              </div>
            </div>
          </td>
          <td><span class="badge-doc-type">${escapeHtml(doc.category?.replace(/_/g, ' ') || 'other')}</span></td>
          <td style="white-space: nowrap; font-size: 12px; color: var(--text-secondary);">${formatCompResDate(doc.issued_at)}</td>
          <td style="white-space: nowrap; font-size: 12px; color: var(--text-secondary);">${escapeHtml(issuerName)}</td>
          <td>
            ${isAckRequired ? `<button type="button" class="comp-res-ack-action-btn" data-ack-doc-id="${doc.id}">Accept Required</button>` : ''}
            ${isAcknowledged ? `<span class="badge-acknowledged">Acknowledged (${formatCompResDate(doc.acknowledged_at)})</span>` : ''}
            ${!doc.requires_acknowledgement ? '<span style="color: var(--text-muted); font-size: 12px;">Standard</span>' : ''}
          </td>
          <td style="white-space: nowrap; font-size: 12px; color: var(--text-muted);">${formatCompResFileSize(doc.file_size)}</td>
          <td style="white-space: nowrap;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <button type="button" class="comp-res-action-btn comp-res-btn-preview" data-personal-view-id="${doc.id}" style="padding: 4px 8px;" title="View">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
              <button type="button" class="comp-res-action-btn comp-res-btn-download" data-personal-download-id="${doc.id}" style="padding: 4px 8px;" title="Download">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    });

    return `
      <div class="comp-res-table-wrap">
        <table class="comp-res-table">
          <thead>
            <tr>
              <th>Document</th>
              <th>Category</th>
              <th>Issue Date</th>
              <th>Issued By</th>
              <th>Status</th>
              <th>Size</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
  }

  function attachPersonalDocumentActions() {
    // 1. View / Preview
    document.querySelectorAll('[data-personal-view-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const docId = btn.getAttribute('data-personal-view-id');
        const doc = (compResState.personalDocs || []).find(d => String(d.id) === String(docId));
        if (doc) handleViewPersonalDoc(doc);
      });
    });

    // 2. Download
    document.querySelectorAll('[data-personal-download-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const docId = btn.getAttribute('data-personal-download-id');
        const doc = (compResState.personalDocs || []).find(d => String(d.id) === String(docId));
        if (doc) handleDownloadPersonalDoc(doc);
      });
    });

    // 3. Acknowledgement button
    document.querySelectorAll('[data-ack-doc-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const docId = btn.getAttribute('data-ack-doc-id');
        const doc = (compResState.personalDocs || []).find(d => String(d.id) === String(docId));
        if (doc) openAcknowledgeConfirmModal(doc);
      });
    });
  }

  async function handleViewPersonalDoc(doc) {
    // 1. Mark as opened (updates badge and audit log)
    await window.DataLayer.markPersonalDocumentOpened(doc.id);
    doc.first_opened_at = doc.first_opened_at || new Date().toISOString();
    updateSidebarCompanyResourcesBadge();

    // 2. Open preview modal using short-lived signed URL (60s)
    const modal = document.getElementById('compDocPreviewModal');
    const titleElem = document.getElementById('compDocPreviewTitle');
    const badgeElem = document.getElementById('compDocPreviewTypeBadge');
    const verElem = document.getElementById('compDocPreviewVer');
    const bodyElem = document.getElementById('compDocPreviewBody');
    const downloadBtn = document.getElementById('compDocPreviewDownloadBtn');

    if (!modal || !bodyElem) return;

    if (titleElem) titleElem.textContent = doc.title || 'Personal Document';
    if (badgeElem) badgeElem.textContent = (doc.category || 'Personal').replace(/_/g, ' ').toUpperCase();
    if (verElem) verElem.textContent = 'Confidential';

    if (downloadBtn) downloadBtn.onclick = () => handleDownloadPersonalDoc(doc);

    bodyElem.innerHTML = `
      <div style="padding: 40px; text-align: center; color: var(--text-secondary);">
        <div class="skeleton-shimmer" style="width: 120px; height: 120px; border-radius: 50%; margin: 0 auto 20px;"></div>
        <p style="font-size: 14px;">Generating secure 60-second preview...</p>
      </div>
    `;

    modal.style.display = 'flex';

    if (!doc.storage_path) {
      bodyElem.innerHTML = `
        <div class="comp-res-missing-file-alert">
          <div class="comp-res-missing-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg></div>
          <h4 class="comp-res-missing-title">File not uploaded yet</h4>
          <p class="comp-res-missing-desc">This document has been issued to you, but the physical file is not present in storage.</p>
        </div>
      `;
      return;
    }

    try {
      const signedUrl = await window.DataLayer.getPersonalDocumentSignedUrl(doc.storage_path);
      if (!signedUrl) throw new Error('Signed URL generation failed');

      let fileExists = true;
      try {
        const headRes = await fetch(signedUrl, { method: 'HEAD' });
        if (!headRes.ok || headRes.status >= 400) fileExists = false;
      } catch (errHead) {}

      if (!fileExists) {
        bodyElem.innerHTML = `
          <div class="comp-res-missing-file-alert">
            <div class="comp-res-missing-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg></div>
            <h4 class="comp-res-missing-title">File not uploaded yet</h4>
            <p class="comp-res-missing-desc">File not present in storage bucket.</p>
          </div>
        `;
        return;
      }

      const fileInfo = getCompResFileTypeInfo(doc.file_name, doc.mime_type);
      if (fileInfo.type === 'PDF') {
        bodyElem.innerHTML = `<iframe class="comp-res-preview-iframe" src="${signedUrl}#toolbar=0" title="${escapeHtml(doc.title)}"></iframe>`;
      } else if (fileInfo.type === 'Image') {
        bodyElem.innerHTML = `<img class="comp-res-preview-img" src="${signedUrl}" alt="${escapeHtml(doc.title)}" />`;
      } else {
        bodyElem.innerHTML = `
          <div class="comp-res-missing-file-alert">
            <div style="width: 56px; height: 56px; border-radius: 12px; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;" class="${fileInfo.class}">
              ${fileInfo.svg}
            </div>
            <h4 class="comp-res-missing-title">In-Browser Preview Not Supported</h4>
            <p class="comp-res-missing-desc">Office document files must be downloaded to view in your desktop app.</p>
            <button type="button" class="primary-btn" id="modalPromptPersonalDownloadBtn">
              Download File (${formatCompResFileSize(doc.file_size)})
            </button>
          </div>
        `;
        const promptBtn = document.getElementById('modalPromptPersonalDownloadBtn');
        if (promptBtn) promptBtn.onclick = () => handleDownloadPersonalDoc(doc);
      }
    } catch (e) {
      console.warn('[PersonalDocs] preview exception:', e);
      bodyElem.innerHTML = `
        <div class="comp-res-missing-file-alert">
          <div class="comp-res-missing-icon"><svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg></div>
          <h4 class="comp-res-missing-title">File not uploaded yet</h4>
          <p class="comp-res-missing-desc">${escapeHtml(e.message)}</p>
        </div>
      `;
    }
  }

  async function handleDownloadPersonalDoc(doc) {
    if (!doc.storage_path) {
      showToast('File not uploaded yet for this document.');
      handleViewPersonalDoc(doc);
      return;
    }

    try {
      showToast(`Generating secure download link...`);
      const signedUrl = await window.DataLayer.getPersonalDocumentSignedUrl(doc.storage_path);
      if (!signedUrl) throw new Error('Signed URL creation failed.');

      try {
        const headRes = await fetch(signedUrl, { method: 'HEAD' });
        if (!headRes.ok || headRes.status >= 400) {
          showToast('File not uploaded yet.');
          handleViewPersonalDoc(doc);
          return;
        }
      } catch (errHead) {}

      // Log download to audit log
      await window.DataLayer.logDocumentAccess('personal', doc.id, 'download');
      await window.DataLayer.markPersonalDocumentOpened(doc.id);
      doc.first_opened_at = doc.first_opened_at || new Date().toISOString();
      updateSidebarCompanyResourcesBadge();

      const fileName = doc.file_name || `${doc.title}.pdf`;
      const a = document.createElement('a');
      a.href = signedUrl;
      a.download = fileName;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => document.body.removeChild(a), 500);

      showToast(`Downloading: ${fileName}`);
    } catch (e) {
      console.warn('[PersonalDocs] download error:', e);
      showToast('Download error: File not uploaded yet.');
    }
  }

  function openAcknowledgeConfirmModal(doc) {
    const modal = document.getElementById('confirmAcknowledgeModal');
    const titleDisplay = document.getElementById('ackDocTitleDisplay');
    const checkbox = document.getElementById('ackCheckConfirm');
    const confirmBtn = document.getElementById('submitAckConfirmBtn');

    if (!modal) return;
    if (titleDisplay) titleDisplay.textContent = doc.title;
    if (checkbox) checkbox.checked = false;
    if (confirmBtn) confirmBtn.disabled = true;

    if (checkbox && confirmBtn) {
      checkbox.onchange = () => {
        confirmBtn.disabled = !checkbox.checked;
      };
    }

    if (confirmBtn) {
      confirmBtn.onclick = async () => {
        try {
          confirmBtn.disabled = true;
          confirmBtn.textContent = 'Recording acceptance...';

          await window.DataLayer.acknowledgePersonalDocument(doc.id);
          doc.acknowledged_at = new Date().toISOString();
          doc.first_opened_at = doc.first_opened_at || doc.acknowledged_at;

          showToast('Document formally acknowledged & accepted.');
          modal.style.display = 'none';

          renderPersonalDocumentsList();
          updateSidebarCompanyResourcesBadge();
        } catch (e) {
          console.error('[PersonalDocs] acknowledge error:', e);
          showToast('Failed to acknowledge document: ' + e.message);
        } finally {
          confirmBtn.disabled = false;
          confirmBtn.textContent = 'I have read and accept';
        }
      };
    }

    modal.style.display = 'flex';
  }

  // ==========================================
  // TAB 3: ADMIN MANAGE PERSONAL DOCUMENTS
  // ==========================================
  async function loadAndRenderManageDocs() {
    if (!isCompResAdmin()) return;

    // Load profiles for recipient filter
    if (compResState.profilesList.length === 0) {
      compResState.profilesList = await window.DataLayer.searchProfiles();
      populateManageRecipientDropdowns();
    }

    if (compResState.manageView === 'docs') {
      const wrap = document.getElementById('compResManageTableWrap');
      if (wrap) wrap.innerHTML = '<div style="padding: 30px; text-align: center;"><div class="skeleton-shimmer" style="height: 20px; width: 180px; margin: 0 auto;"></div></div>';

      const docs = await window.DataLayer.getAllPersonalDocuments({
        recipientId: compResState.manageRecipient,
        category: compResState.manageCategory,
        isAcknowledged: compResState.manageAck,
        isRevoked: compResState.manageRevoked,
        search: compResState.manageSearch
      });

      compResState.allPersonalDocs = Array.isArray(docs) ? docs : [];
      const countElem = document.getElementById('compResManageDocsCount');
      if (countElem) countElem.textContent = compResState.allPersonalDocs.length;

      renderManageDocsTable(compResState.allPersonalDocs);
    } else if (compResState.manageView === 'users') {
      renderManageUsersDossier();
    } else if (compResState.manageView === 'logs') {
      renderManageAuditLogs();
    }
  }

  function switchManageView(viewKey) {
    compResState.manageView = viewKey;

    const mDocsBtn = document.getElementById('compResManageTabDocs');
    const mUsersBtn = document.getElementById('compResManageTabUsers');
    const mLogsBtn = document.getElementById('compResManageTabLogs');

    if (mDocsBtn) mDocsBtn.classList.toggle('active', viewKey === 'docs');
    if (mUsersBtn) mUsersBtn.classList.toggle('active', viewKey === 'users');
    if (mLogsBtn) mLogsBtn.classList.toggle('active', viewKey === 'logs');

    const vDocs = document.getElementById('compResManageDocsView');
    const vUsers = document.getElementById('compResManageUsersView');
    const vLogs = document.getElementById('compResManageLogsView');
    const vFilters = document.getElementById('compResManageFiltersBar');

    if (vDocs) vDocs.style.display = viewKey === 'docs' ? 'block' : 'none';
    if (vUsers) vUsers.style.display = viewKey === 'users' ? 'block' : 'none';
    if (vLogs) vLogs.style.display = viewKey === 'logs' ? 'block' : 'none';
    if (vFilters) vFilters.style.display = viewKey === 'docs' ? 'flex' : 'none';

    loadAndRenderManageDocs();
  }

  function populateManageRecipientDropdowns() {
    const filterSelect = document.getElementById('compResManageRecipientFilter');
    const modalSelect = document.getElementById('issuePersonalRecipient');
    const dossierSelect = document.getElementById('compResDossierUserSelect');

    const profiles = compResState.profilesList || [];

    if (filterSelect) {
      filterSelect.innerHTML = '<option value="all">All Recipients</option>' +
        profiles.map(p => `<option value="${p.id}">${escapeHtml(p.full_name)} (${escapeHtml(p.email)})</option>`).join('');
    }

    if (modalSelect) {
      modalSelect.innerHTML = '<option value="">Select Recipient (Name &amp; Email)...</option>' +
        profiles.map(p => `<option value="${p.id}" data-name="${escapeHtml(p.full_name)}" data-email="${escapeHtml(p.email)}">${escapeHtml(p.full_name)} — ${escapeHtml(p.email)}</option>`).join('');
      
      modalSelect.onchange = () => {
        const opt = modalSelect.selectedOptions[0];
        const banner = document.getElementById('issuePersonalSummaryText');
        if (banner && opt && opt.value) {
          banner.textContent = `This document will be visible only to ${opt.getAttribute('data-name')} (${opt.getAttribute('data-email')}).`;
        }
      };
    }

    if (dossierSelect) {
      dossierSelect.innerHTML = profiles.map(p => `<option value="${p.id}">${escapeHtml(p.full_name)} (${escapeHtml(p.email)})</option>`).join('');
      dossierSelect.onchange = () => renderManageUsersDossier();
    }
  }

  function renderManageDocsTable(docs) {
    const wrap = document.getElementById('compResManageTableWrap');
    if (!wrap) return;

    if (!docs || docs.length === 0) {
      wrap.innerHTML = '<div style="padding: 40px; text-align: center; color: var(--text-secondary);">No personal documents found matching criteria.</div>';
      return;
    }

    let rowsHtml = '';
    docs.forEach(doc => {
      const recipientName = doc.recipient?.full_name || 'Unknown Recipient';
      const recipientEmail = doc.recipient?.email || '—';
      const isAck = Boolean(doc.acknowledged_at);
      const isOpened = Boolean(doc.first_opened_at);
      const isRev = Boolean(doc.is_revoked);

      rowsHtml += `
        <tr>
          <td>
            <strong style="display: block; font-size: 13.5px; color: var(--text-primary);">${escapeHtml(recipientName)}</strong>
            <span style="font-size: 11.5px; color: var(--text-muted);">${escapeHtml(recipientEmail)}</span>
          </td>
          <td><span class="badge-doc-type">${escapeHtml(doc.category?.replace(/_/g, ' ') || 'other')}</span></td>
          <td style="max-width: 220px;">
            <strong style="display: block; font-size: 13px; color: var(--text-primary);">${escapeHtml(doc.title)}</strong>
            <span style="font-size: 11.5px; color: var(--text-secondary);">${escapeHtml(doc.file_name || 'File')} (${formatCompResFileSize(doc.file_size)})</span>
          </td>
          <td style="white-space: nowrap; font-size: 12px; color: var(--text-secondary);">${formatCompResDate(doc.issued_at)}</td>
          <td style="white-space: nowrap; font-size: 11.5px;">
            ${isOpened ? `<span style="color: var(--accent-light);">Opened ${formatCompResDate(doc.first_opened_at)}</span>` : '<span style="color: var(--text-muted);">Unopened</span>'}
          </td>
          <td style="white-space: nowrap;">
            ${!doc.requires_acknowledgement ? '<span style="color: var(--text-muted); font-size: 12px;">Not required</span>' : 
              (isAck ? `<span class="badge-acknowledged">Yes (${formatCompResDate(doc.acknowledged_at)})</span>` : '<span class="badge-action-required">Pending</span>')}
          </td>
          <td>
            ${isRev ? '<span class="badge-revoked">REVOKED</span>' : '<span class="badge-acknowledged">ACTIVE</span>'}
          </td>
          <td style="white-space: nowrap;">
            <div style="display: flex; align-items: center; gap: 6px;">
              <button type="button" class="secondary-btn small-btn" data-admin-action="toggle-revoke" data-id="${doc.id}">
                ${isRev ? 'Unrevoke' : 'Revoke'}
              </button>
              <button type="button" class="secondary-btn small-btn" data-admin-action="replace-file" data-id="${doc.id}">
                Replace File
              </button>
              <button type="button" class="secondary-btn small-btn" style="color: #ff5c7c;" data-admin-action="delete" data-id="${doc.id}">
                Delete
              </button>
            </div>
          </td>
        </tr>
      `;
    });

    wrap.innerHTML = `
      <table class="comp-res-table">
        <thead>
          <tr>
            <th>Recipient</th>
            <th>Category</th>
            <th>Title &amp; File</th>
            <th>Issued Date</th>
            <th>Opened</th>
            <th>Acknowledged</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;

    attachManageTableActions();
  }

  function attachManageTableActions() {
    document.querySelectorAll('[data-admin-action="toggle-revoke"]').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        const doc = compResState.allPersonalDocs.find(d => String(d.id) === String(id));
        if (!doc) return;
        try {
          if (doc.is_revoked) {
            await window.DataLayer.unrevokePersonalDocument(id);
            showToast('Document unrevoked (visible to recipient).');
          } else {
            await window.DataLayer.revokePersonalDocument(id);
            showToast('Document revoked (hidden from recipient).');
          }
          loadAndRenderManageDocs();
        } catch (e) {
          showToast('Action failed: ' + e.message);
        }
      };
    });

    document.querySelectorAll('[data-admin-action="replace-file"]').forEach(btn => {
      btn.onclick = () => {
        const id = btn.getAttribute('data-id');
        const doc = compResState.allPersonalDocs.find(d => String(d.id) === String(id));
        if (doc) openReplacePersonalFileModal(doc);
      };
    });

    document.querySelectorAll('[data-admin-action="delete"]').forEach(btn => {
      btn.onclick = async () => {
        const id = btn.getAttribute('data-id');
        const doc = compResState.allPersonalDocs.find(d => String(d.id) === String(id));
        if (!doc) return;
        if (!confirm(`Are you sure you want to permanently delete "${doc.title}" for ${doc.recipient?.full_name}?`)) return;
        try {
          await window.DataLayer.deletePersonalDocument(id);
          showToast('Personal document deleted.');
          loadAndRenderManageDocs();
        } catch (e) {
          showToast('Delete failed: ' + e.message);
        }
      };
    });
  }

  async function renderManageUsersDossier() {
    const dossierWrap = document.getElementById('compResUserDossierContent');
    const dossierSelect = document.getElementById('compResDossierUserSelect');
    if (!dossierWrap || !dossierSelect) return;

    const selectedUserId = dossierSelect.value;
    if (!selectedUserId) {
      dossierWrap.innerHTML = '<p style="color: var(--text-muted);">Please select a user above.</p>';
      return;
    }

    const docs = await window.DataLayer.getAllPersonalDocuments({ recipientId: selectedUserId });
    if (!docs || docs.length === 0) {
      dossierWrap.innerHTML = '<div style="padding: 30px; text-align: center; color: var(--text-secondary); background: var(--bg-card); border-radius: var(--radius-md);">No documents issued to this individual yet.</div>';
      return;
    }

    let cardsHtml = '<div class="comp-res-grid">';
    docs.forEach(doc => {
      cardsHtml += renderPersonalDocCardHtml(doc);
    });
    cardsHtml += '</div>';

    dossierWrap.innerHTML = cardsHtml;
    attachPersonalDocumentActions();
  }

  async function renderManageAuditLogs() {
    const wrap = document.getElementById('compResManageLogsWrap');
    if (!wrap) return;

    wrap.innerHTML = '<div style="padding: 30px; text-align: center;"><div class="skeleton-shimmer" style="height: 20px; width: 180px; margin: 0 auto;"></div></div>';

    const logs = await window.DataLayer.getDocumentAccessLogs({ limit: 100 });
    if (!logs || logs.length === 0) {
      wrap.innerHTML = '<div style="padding: 30px; text-align: center; color: var(--text-secondary);">No document access logs recorded yet.</div>';
      return;
    }

    let rowsHtml = '';
    logs.forEach(l => {
      const user = l.user?.full_name || l.user_id || 'User';
      const actionBadge = l.action === 'acknowledge' ? '<span class="badge-acknowledged">Acknowledge</span>' :
        l.action === 'download' ? '<span class="badge-updated">Download</span>' : '<span class="badge-prog">View</span>';

      rowsHtml += `
        <tr>
          <td><strong>${escapeHtml(user)}</strong></td>
          <td>${actionBadge}</td>
          <td><span class="badge-doc-type">${escapeHtml(l.document_kind || 'personal')}</span></td>
          <td style="font-family: monospace; font-size: 11px; color: var(--text-muted);">${escapeHtml(l.document_id)}</td>
          <td style="font-size: 12px; color: var(--text-secondary); white-space: nowrap;">${new Date(l.created_at).toLocaleString()}</td>
        </tr>
      `;
    });

    wrap.innerHTML = `
      <table class="comp-res-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Action</th>
            <th>Kind</th>
            <th>Document ID</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    `;
  }

  // --- Modals for Personal Documents Management ---
  function openIssuePersonalDocModal() {
    const modal = document.getElementById('issuePersonalDocModal');
    const form = document.getElementById('issuePersonalDocForm');
    const dateInput = document.getElementById('issuePersonalDate');
    const errAlert = document.getElementById('issuePersonalErrorAlert');
    const label = document.getElementById('issuePersonalFileLabel');

    if (!modal) return;
    if (form) form.reset();
    if (errAlert) errAlert.style.display = 'none';
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
    if (label) label.textContent = 'Choose file or drag & drop';

    modal.style.display = 'flex';
  }

  function setupIssuePersonalDocForm() {
    const form = document.getElementById('issuePersonalDocForm');
    const fileInput = document.getElementById('issuePersonalFile');
    const label = document.getElementById('issuePersonalFileLabel');
    const errAlert = document.getElementById('issuePersonalErrorAlert');
    const progressWrap = document.getElementById('issuePersonalProgressWrap');
    const progressFill = document.getElementById('issuePersonalProgressFill');
    const submitBtn = document.getElementById('submitIssuePersonalBtn');

    if (fileInput && label) {
      fileInput.addEventListener('change', () => {
        if (fileInput.files && fileInput.files[0]) {
          label.textContent = fileInput.files[0].name + ` (${formatCompResFileSize(fileInput.files[0].size)})`;
        }
      });
    }

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const recip = document.getElementById('issuePersonalRecipient')?.value;
        const cat = document.getElementById('issuePersonalCategory')?.value;
        const title = document.getElementById('issuePersonalTitle')?.value.trim();
        const desc = document.getElementById('issuePersonalDesc')?.value.trim();
        const date = document.getElementById('issuePersonalDate')?.value || new Date().toISOString().split('T')[0];
        const validUntil = document.getElementById('issuePersonalValidUntil')?.value || null;
        const reqAck = document.getElementById('issuePersonalRequiresAck')?.checked;
        const file = fileInput?.files?.[0];

        if (!recip) { showModalError(errAlert, 'Please select a recipient.'); return; }
        if (!title) { showModalError(errAlert, 'Document title is required.'); return; }
        if (!file) { showModalError(errAlert, 'Please attach a document file.'); return; }
        if (file.size > 10 * 1024 * 1024) { showModalError(errAlert, 'File size exceeds 10 MB limit.'); return; }

        try {
          if (submitBtn) submitBtn.disabled = true;
          if (progressWrap) progressWrap.style.display = 'block';
          if (progressFill) progressFill.style.width = '60%';

          await window.DataLayer.createPersonalDocument({
            recipient_id: recip,
            category: cat,
            title: title,
            description: desc,
            issued_at: date,
            valid_until: validUntil,
            requires_acknowledgement: reqAck
          }, file);

          if (progressFill) progressFill.style.width = '100%';
          showToast('Personal document issued successfully!');
          const modal = document.getElementById('issuePersonalDocModal');
          if (modal) modal.style.display = 'none';

          loadAndRenderManageDocs();
        } catch (err) {
          showModalError(errAlert, err.message || 'Failed to issue personal document.');
        } finally {
          if (submitBtn) submitBtn.disabled = false;
        }
      });
    }
  }

  function openBulkIssueModal() {
    const modal = document.getElementById('bulkIssueModal');
    if (!modal) return;
    modal.style.display = 'flex';
  }

  let bulkParsedItems = [];
  let bulkFilesMap = {};

  function setupBulkIssueForm() {
    const csvInput = document.getElementById('bulkIssueCsvFile');
    const docsInput = document.getElementById('bulkIssueDocsFiles');
    const previewArea = document.getElementById('bulkIssuePreviewArea');
    const tbody = document.getElementById('bulkIssuePreviewTbody');
    const confirmBtn = document.getElementById('confirmBulkIssueBtn');
    const errAlert = document.getElementById('bulkIssueErrorAlert');
    const progressWrap = document.getElementById('bulkIssueProgressWrap');
    const progressFill = document.getElementById('bulkIssueProgressFill');

    function checkAndParseBulk() {
      if (!csvInput.files || !csvInput.files[0]) return;
      const csvFile = csvInput.files[0];
      bulkFilesMap = {};

      if (docsInput.files) {
        Array.from(docsInput.files).forEach(f => {
          bulkFilesMap[f.name] = f;
        });
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
        if (lines.length <= 1) {
          showModalError(errAlert, 'CSV file is empty or missing data rows.');
          return;
        }

        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        bulkParsedItems = [];
        let rowsHtml = '';
        let validCount = 0;

        for (let i = 1; i < lines.length; i++) {
          const cols = lines[i].split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));
          if (cols.length < 4) continue;

          const email = cols[0];
          const title = cols[1];
          const category = cols[2] || 'other';
          const issueDate = cols[3] || new Date().toISOString().split('T')[0];
          const fileName = cols[4];
          const reqAck = cols[5] === 'true' || cols[5] === '1';

          // Match recipient
          const matchedProfile = compResState.profilesList.find(p => p.email?.toLowerCase() === email?.toLowerCase());
          const fileFound = Boolean(bulkFilesMap[fileName]);

          const isValid = Boolean(matchedProfile && fileFound);
          if (isValid) validCount++;

          bulkParsedItems.push({
            recipient_id: matchedProfile ? matchedProfile.id : null,
            email,
            title,
            category,
            issued_at: issueDate,
            file_name: fileName,
            requires_acknowledgement: reqAck,
            isValid
          });

          rowsHtml += `
            <tr style="${isValid ? '' : 'background: rgba(239, 68, 68, 0.05);'}">
              <td>${escapeHtml(email)}</td>
              <td>${escapeHtml(title)}</td>
              <td>${escapeHtml(category)}</td>
              <td>${fileFound ? '<span style="color: var(--accent-light);">✓ Matched</span>' : '<span style="color: #ff5c7c;">✗ Missing file</span>'}</td>
              <td>${matchedProfile ? '<span style="color: var(--accent-light);">✓ Found</span>' : '<span style="color: #ff5c7c;">✗ Unknown user</span>'}</td>
              <td>${isValid ? '<span class="badge-acknowledged">Ready</span>' : '<span class="badge-revoked">Skip</span>'}</td>
            </tr>
          `;
        }

        if (tbody) tbody.innerHTML = rowsHtml;
        if (previewArea) previewArea.style.display = 'block';
        if (confirmBtn) {
          confirmBtn.disabled = validCount === 0;
          confirmBtn.textContent = `Issue ${validCount} Valid Document(s)`;
        }
      };
      reader.readAsText(csvFile);
    }

    if (csvInput) csvInput.addEventListener('change', checkAndParseBulk);
    if (docsInput) docsInput.addEventListener('change', checkAndParseBulk);

    if (confirmBtn) {
      confirmBtn.addEventListener('click', async () => {
        const validItems = bulkParsedItems.filter(i => i.isValid);
        if (validItems.length === 0) return;

        try {
          confirmBtn.disabled = true;
          if (progressWrap) progressWrap.style.display = 'block';
          if (progressFill) progressFill.style.width = '50%';

          const res = await window.DataLayer.bulkIssuePersonalDocuments(validItems, bulkFilesMap);
          if (progressFill) progressFill.style.width = '100%';

          showToast(`Successfully issued ${res.successCount} personal documents.`);
          const modal = document.getElementById('bulkIssueModal');
          if (modal) modal.style.display = 'none';

          loadAndRenderManageDocs();
        } catch (e) {
          showModalError(errAlert, 'Bulk issuance error: ' + e.message);
        } finally {
          confirmBtn.disabled = false;
        }
      });
    }
  }

  function openReplacePersonalFileModal(doc) {
    const modal = document.getElementById('replacePersonalFileModal');
    const idInput = document.getElementById('replaceDocId');
    const titleDisplay = document.getElementById('replaceDocTitleDisplay');

    if (!modal) return;
    if (idInput) idInput.value = doc.id;
    if (titleDisplay) titleDisplay.textContent = `${doc.title} (${doc.recipient?.full_name || 'Recipient'})`;

    modal.style.display = 'flex';
  }

  function setupReplacePersonalFileForm() {
    const form = document.getElementById('replacePersonalFileForm');
    const fileInput = document.getElementById('replaceFileNewInput');
    const submitBtn = document.getElementById('submitReplaceFileBtn');

    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const docId = document.getElementById('replaceDocId')?.value;
        const file = fileInput?.files?.[0];
        if (!docId || !file) return;

        try {
          if (submitBtn) submitBtn.disabled = true;
          await window.DataLayer.replacePersonalDocumentFile(docId, file);
          showToast('Document file replaced successfully.');
          const modal = document.getElementById('replacePersonalFileModal');
          if (modal) modal.style.display = 'none';
          loadAndRenderManageDocs();
        } catch (err) {
          showToast('Replace failed: ' + err.message);
        } finally {
          if (submitBtn) submitBtn.disabled = false;
        }
      });
    }
  }

  function showModalError(container, msg) {
    if (!container) return;
    container.textContent = msg;
    container.style.display = 'block';
  }
'''

# Read app.js
with open("app.js", "r", encoding="utf-8") as f:
    code = f.read()

# Marker start and end
start_marker = "  // ==========================================\n  // SECTION 2B: COMPANY RESOURCES MODULE"
end_marker = "  // ==========================================\n  // AUTHENTICATION & SESSION MANAGEMENT"

pos_start = code.find(start_marker)
pos_end = code.find(end_marker)

if pos_start != -1 and pos_end != -1:
    code = code[:pos_start] + new_module_code + "\n" + code[pos_end:]
    with open("app.js", "w", encoding="utf-8") as f:
        f.write(code)
    print("[OK] Replaced Company Resources module in app.js successfully.")
else:
    print(f"! Failed to locate markers: pos_start={pos_start}, pos_end={pos_end}")

