# encoding: utf-8
import re

print("Generating Company Resources module for app.js...")

company_resources_module = r'''
  // ==========================================
  // SECTION 2B: COMPANY RESOURCES MODULE
  // ==========================================
  const compResState = {
    activeTab: 'published', // 'published' | 'drafts'
    selectedProgramme: 'all', // 'all' or UUID
    selectedType: 'all', // 'all' or document_type
    searchQuery: '',
    viewMode: 'grid', // 'grid' | 'list'
    documents: [],
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
    if (!el.sidebarCompanyResourcesCountBadge) return;
    try {
      if (window.DataLayer && typeof window.DataLayer.getCompanyDocuments === 'function') {
        const role = getCompResUserRole();
        const progId = currentProgrammeId;
        const docs = await window.DataLayer.getCompanyDocuments({
          programmeId: (role === 'admin' && compResState.selectedProgramme !== 'all') ? compResState.selectedProgramme : (role === 'admin' ? undefined : progId),
          isPublished: true,
          isArchived: false
        });
        el.sidebarCompanyResourcesCountBadge.textContent = Array.isArray(docs) ? docs.length : 0;
      }
    } catch (e) {
      console.warn('[CompanyResources] updateSidebarCount error:', e);
    }
  }

  function initCompanyResourcesEvents() {
    if (compResState.initialized) return;
    compResState.initialized = true;

    // Search input
    if (el.compResSearchInput) {
      let searchTimeout = null;
      el.compResSearchInput.addEventListener('input', (e) => {
        compResState.searchQuery = e.target.value;
        if (el.compResSearchClear) {
          el.compResSearchClear.style.display = compResState.searchQuery ? 'block' : 'none';
        }
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
          renderCompanyResourcesList();
        }, 200);
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

    // View mode toggle
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

    // Document type chips
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

    // Tabs: Published vs Drafts
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

    // Admin programme dropdown
    if (el.compResProgSelect) {
      el.compResProgSelect.addEventListener('change', (e) => {
        compResState.selectedProgramme = e.target.value;
        loadCompanyResourcesDocuments();
      });
    }

    // Open Issue Document modal
    if (el.openIssueDocBtn) {
      el.openIssueDocBtn.addEventListener('click', openIssueDocModal);
    }

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

    // Close modals on overlay click or escape key
    setupCompResModalDismiss('issueDocModal', 'closeIssueDocModalBtn', 'cancelIssueDocBtn');
    setupCompResModalDismiss('editDocModal', 'closeEditDocModalBtn', 'cancelEditDocBtn');
    setupCompResModalDismiss('newVersionModal', 'closeNewVersionModalBtn', 'cancelNewVersionBtn');
    setupCompResModalDismiss('deleteDocConfirmModal', 'closeDeleteDocModalBtn', 'cancelDeleteDocBtn');

    // Forms submission listeners
    setupIssueDocForm();
    setupEditDocForm();
    setupNewVersionForm();
    setupDeleteDocAction();

    // Close open dropdown menus on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.comp-res-admin-actions')) {
        document.querySelectorAll('.comp-res-dropdown-menu.active').forEach(m => m.classList.remove('active'));
        compResState.activeMenuDocId = null;
      }
    });
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

    await loadCompanyResourcesDocuments();
  }

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

      if (el.compResPublishedCount) {
        el.compResPublishedCount.textContent = Array.isArray(publishedDocs) ? publishedDocs.length : 0;
      }
      if (el.sidebarCompanyResourcesCountBadge) {
        el.sidebarCompanyResourcesCountBadge.textContent = Array.isArray(publishedDocs) ? publishedDocs.length : 0;
      }

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

    // Attach event listeners for preview, download, and dropdown actions
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
    // 1. Preview buttons
    document.querySelectorAll('.comp-res-btn-preview').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const docId = btn.getAttribute('data-doc-id');
        const doc = (compResState.documents || []).find(d => String(d.id) === String(docId));
        if (doc) handlePreviewCompanyDoc(doc);
      });
    });

    // 2. Download buttons
    document.querySelectorAll('.comp-res-btn-download').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const docId = btn.getAttribute('data-doc-id');
        const doc = (compResState.documents || []).find(d => String(d.id) === String(docId));
        if (doc) handleDownloadCompanyDoc(doc);
      });
    });

    // 3. Dropdown toggle buttons
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

    // 4. Dropdown action items
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

    // Check if storage_path exists
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
      if (!signedUrl) {
        throw new Error('Unable to generate signed URL');
      }

      // Check if file exists via HEAD request
      let fileExists = true;
      try {
        const headRes = await fetch(signedUrl, { method: 'HEAD' });
        if (!headRes.ok || headRes.status >= 400) {
          fileExists = false;
        }
      } catch (errHead) {
        // Fallback for CORS: proceed to render
      }

      if (!fileExists) {
        bodyElem.innerHTML = `
          <div class="comp-res-missing-file-alert">
            <div class="comp-res-missing-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <h4 class="comp-res-missing-title">File not uploaded yet</h4>
            <p class="comp-res-missing-desc">
              The file path is assigned but no physical file exists in the storage bucket. Contact your instructor or administrator to upload this file.
            </p>
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
        // Office documents or other files prompt download
        bodyElem.innerHTML = `
          <div class="comp-res-missing-file-alert">
            <div style="width: 56px; height: 56px; border-radius: 12px; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;" class="${fileInfo.class}">
              ${fileInfo.svg}
            </div>
            <h4 class="comp-res-missing-title">In-Browser Preview Not Supported</h4>
            <p class="comp-res-missing-desc">
              ${escapeHtml(fileInfo.type)} documents (.${doc.file_name ? doc.file_name.split('.').pop() : 'file'}) cannot be previewed directly inside the web browser. Please download the file to view it in your desktop application.
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
          <div class="comp-res-missing-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <h4 class="comp-res-missing-title">File not uploaded yet</h4>
          <p class="comp-res-missing-desc">
            Unable to fetch document from storage repository (${escapeHtml(e.message)}).
          </p>
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

      // Check HEAD
      try {
        const headRes = await fetch(signedUrl, { method: 'HEAD' });
        if (!headRes.ok || headRes.status >= 400) {
          showToast('File not uploaded yet.');
          handlePreviewCompanyDoc(doc);
          return;
        }
      } catch (errHead) {}

      // Trigger download
      const fileName = doc.file_name || doc.storage_path.split('/').pop() || `${doc.title}.pdf`;
      const a = document.createElement('a');
      a.href = signedUrl;
      a.download = fileName;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => document.body.removeChild(a), 500);

      // Log download to database
      await window.DataLayer.logCompanyDocumentDownload(doc.id);
      doc.download_count = (doc.download_count || 0) + 1;
      showToast(`Download started: ${fileName}`);
    } catch (e) {
      console.warn('[CompanyResources] download error:', e);
      showToast('Download error: File not uploaded yet.');
    }
  }

  // --- Modals for Issue, Edit, New Version, and Delete ---
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

    if (dateInput) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }

    // Role restrictions for programme dropdown
    if (progSelect) {
      const role = getCompResUserRole();
      if (role === 'instructor') {
        progSelect.value = currentProgrammeId;
        Array.from(progSelect.options).forEach(opt => {
          opt.disabled = (opt.value !== currentProgrammeId);
        });
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
    const dropzone = document.getElementById('issueDocDropzone');
    const errAlert = document.getElementById('issueDocErrorAlert');
    const progressWrap = document.getElementById('issueDocProgressWrap');
    const progressFill = document.getElementById('issueDocProgressFill');
    const submitBtn = document.getElementById('submitIssueDocBtn');

    if (fileInput && label) {
      fileInput.addEventListener('change', () => {
        if (fileInput.files && fileInput.files[0]) {
          label.textContent = fileInput.files[0].name + ` (${formatCompResFileSize(fileInput.files[0].size)})`;
        } else {
          label.textContent = 'Choose file or drag & drop here';
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

        if (!title) {
          showModalError(errAlert, 'Document title is required.');
          return;
        }

        if (file && file.size > 20 * 1024 * 1024) {
          showModalError(errAlert, 'File size exceeds maximum limit of 20 MB.');
          return;
        }

        try {
          if (submitBtn) submitBtn.disabled = true;
          if (progressWrap) progressWrap.style.display = 'block';
          if (progressFill) progressFill.style.width = '60%';

          await window.DataLayer.createCompanyDocument({
            title: title,
            description: desc,
            document_type: type,
            programme_id: prog,
            version: ver,
            issued_at: date,
            is_published: isPub
          }, file);

          if (progressFill) progressFill.style.width = '100%';
          showToast('Official document issued successfully!');

          const modal = document.getElementById('issueDocModal');
          if (modal) modal.style.display = 'none';

          await loadCompanyResourcesDocuments();
        } catch (err) {
          console.error('[CompanyResources] issue error:', err);
          showModalError(errAlert, err.message || 'Failed to issue document. Please try again.');
        } finally {
          if (submitBtn) submitBtn.disabled = false;
        }
      });
    }
  }

  function openEditDocModal(doc) {
    const modal = document.getElementById('editDocModal');
    const form = document.getElementById('editDocForm');
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
        Array.from(progSelect.options).forEach(opt => {
          opt.disabled = (opt.value !== currentProgrammeId);
        });
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

        if (!title) {
          showModalError(errAlert, 'Document title is required.');
          return;
        }

        try {
          if (saveBtn) saveBtn.disabled = true;
          await window.DataLayer.updateCompanyDocument(docId, {
            title: title,
            description: desc,
            document_type: type,
            programme_id: prog,
            version: ver,
            issued_at: date,
            is_published: isPub,
            is_archived: isArch
          });

          showToast('Document details updated.');
          const modal = document.getElementById('editDocModal');
          if (modal) modal.style.display = 'none';

          await loadCompanyResourcesDocuments();
        } catch (err) {
          console.error('[CompanyResources] edit error:', err);
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
    const changelogInput = document.getElementById('newVersionChangelog');
    const label = document.getElementById('newVersionFileLabel');
    const fileInput = document.getElementById('newVersionFile');
    const historyBox = document.getElementById('newVersionHistoryBox');
    const historyList = document.getElementById('newVersionHistoryList');
    const errAlert = document.getElementById('newVersionErrorAlert');
    const progressWrap = document.getElementById('newVersionProgressWrap');

    if (!modal) return;
    if (form) form.reset();
    if (errAlert) errAlert.style.display = 'none';
    if (progressWrap) progressWrap.style.display = 'none';
    if (label) label.textContent = 'Choose file or drag & drop';

    if (idInput) idInput.value = doc.id;
    if (titleDisplay) titleDisplay.textContent = `Document: ${doc.title} (Current: v${doc.version || '1.0'})`;

    // Guess next version
    const currentNum = parseFloat((doc.version || '1.0').replace(/[^\d.]/g, ''));
    if (!isNaN(currentNum)) {
      verInput.value = (currentNum + 0.1).toFixed(1);
    } else {
      verInput.value = '2.0';
    }

    // Load past versions
    if (historyBox && historyList && window.DataLayer.getDocumentVersions) {
      try {
        const versions = await window.DataLayer.getDocumentVersions(doc.id);
        if (versions && versions.length > 0) {
          historyBox.style.display = 'block';
          historyList.innerHTML = versions.map(v => `
            <div class="comp-res-history-item">
              <div>
                <strong>v${escapeHtml(v.version)}</strong> &bull; <span style="color: var(--text-muted);">${formatCompResDate(v.uploaded_at)}</span>
                ${v.changelog ? `<div style="color: var(--text-secondary); font-size: 11.5px;">${escapeHtml(v.changelog)}</div>` : ''}
              </div>
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
    const progressWrap = document.getElementById('newVersionProgressWrap');
    const progressFill = document.getElementById('newVersionProgressFill');
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

        if (!ver) {
          showModalError(errAlert, 'Version number is required.');
          return;
        }
        if (!file) {
          showModalError(errAlert, 'Please attach the new version file.');
          return;
        }
        if (file.size > 20 * 1024 * 1024) {
          showModalError(errAlert, 'File size exceeds maximum limit of 20 MB.');
          return;
        }

        try {
          if (submitBtn) submitBtn.disabled = true;
          if (progressWrap) progressWrap.style.display = 'block';
          if (progressFill) progressFill.style.width = '60%';

          await window.DataLayer.uploadDocumentNewVersion(docId, {
            version: ver,
            changelog: changelog,
            file: file
          });

          if (progressFill) progressFill.style.width = '100%';
          showToast(`Version ${ver} uploaded successfully!`);

          const modal = document.getElementById('newVersionModal');
          if (modal) modal.style.display = 'none';

          await loadCompanyResourcesDocuments();
        } catch (err) {
          console.error('[CompanyResources] new version error:', err);
          showModalError(errAlert, err.message || 'Failed to upload new version.');
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
          console.error('[CompanyResources] delete error:', err);
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

  function showModalError(container, msg) {
    if (!container) return;
    container.textContent = msg;
    container.style.display = 'block';
  }
'''

# Read app.js
with open("app.js", "r", encoding="utf-8") as f:
    app_js = f.read()

# Target insertion point: before "// AUTHENTICATION & SESSION MANAGEMENT"
target_marker = "  // ==========================================\n  // AUTHENTICATION & SESSION MANAGEMENT"
if target_marker not in app_js:
    target_marker = "// AUTHENTICATION & SESSION MANAGEMENT"

if target_marker in app_js:
    app_js = app_js.replace(target_marker, company_resources_module + "\n  // ==========================================\n  // AUTHENTICATION & SESSION MANAGEMENT", 1)
    print("[OK] Inserted Company Resources module into app.js")
else:
    print("! Could not find insertion marker in app.js")

with open("app.js", "w", encoding="utf-8") as f:
    f.write(app_js)

print("Finished updating app.js successfully.")

