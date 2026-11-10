# encoding: utf-8
with open('index.html', encoding='utf-8') as f:
    html = f.read()

required_ids = [
    # Navigation & Header
    'navCompanyResources',
    'sidebarCompanyResourcesCountBadge',
    'companyResourcesScreenView',
    'compResMainTabsBar',
    'compResNavTabProgramme',
    'compResNavTabPersonal',
    'compResNavTabManage',
    'compResNavProgrammeCount',
    'compResNavPersonalCount',

    # Tab 1: Programme
    'compResPaneProgramme',
    'compResProgChip',
    'compResProgChipText',
    'compResProgSelectWrapper',
    'compResProgSelect',
    'openIssueDocBtn',
    'compResTabsBar',
    'compResTabPublished',
    'compResTabDrafts',
    'compResPublishedCount',
    'compResDraftsCount',
    'compResSearchInput',
    'compResSearchClear',
    'compResViewGridBtn',
    'compResViewListBtn',
    'compResTypeChipsBar',
    'compResContent',
    'compResEmptyState',

    # Tab 2: Personal Documents
    'compResPanePersonal',
    'compResPersonalSearchInput',
    'compResPersonalSearchClear',
    'compResPersonalViewGridBtn',
    'compResPersonalViewListBtn',
    'compResPersonalCategoryChips',
    'compResPersonalContent',
    'compResPersonalEmptyState',

    # Tab 3: Admin Manage
    'compResPaneManage',
    'openBulkIssueModalBtn',
    'openIssuePersonalDocBtn',
    'compResManageSubTabs',
    'compResManageTabDocs',
    'compResManageTabUsers',
    'compResManageTabLogs',
    'compResManageDocsCount',
    'compResManageFiltersBar',
    'compResManageRecipientFilter',
    'compResManageCategoryFilter',
    'compResManageAckFilter',
    'compResManageRevokedFilter',
    'compResManageSearchInput',
    'compResManageDocsView',
    'compResManageTableWrap',
    'compResManageUsersView',
    'compResDossierUserSelect',
    'compResUserDossierContent',
    'compResManageLogsView',
    'compResManageLogsWrap',

    # Modals
    'issueDocModal',
    'issueDocForm',
    'editDocModal',
    'newVersionModal',
    'deleteDocConfirmModal',
    'compDocPreviewModal',
    'issuePersonalDocModal',
    'issuePersonalDocForm',
    'bulkIssueModal',
    'replacePersonalFileModal',
    'confirmAcknowledgeModal'
]

missing = [i for i in required_ids if f'id="{i}"' not in html]
print(f'Checked {len(required_ids)} element IDs.')
if missing:
    print('MISSING IDs:', missing)
else:
    print('ALL IDs present in index.html!')
