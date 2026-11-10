# encoding: utf-8
import sys

print("Preparing to insert Company Resources logic into app.js...")

with open("app.js", "r", encoding="utf-8") as f:
    code = f.read()

# 1. Update el object
target_el_nav = "    navAdmin: document.getElementById('navAdmin'),"
replacement_el_nav = """    navAdmin: document.getElementById('navAdmin'),

    // Company Resources Elements
    navCompanyResources: document.getElementById('navCompanyResources'),
    sidebarCompanyResourcesCountBadge: document.getElementById('sidebarCompanyResourcesCountBadge'),
    companyResourcesScreenView: document.getElementById('companyResourcesScreenView'),
    compResProgChip: document.getElementById('compResProgChip'),
    compResProgChipText: document.getElementById('compResProgChipText'),
    compResProgSelectWrapper: document.getElementById('compResProgSelectWrapper'),
    compResProgSelect: document.getElementById('compResProgSelect'),
    openIssueDocBtn: document.getElementById('openIssueDocBtn'),
    compResTabsBar: document.getElementById('compResTabsBar'),
    compResTabPublished: document.getElementById('compResTabPublished'),
    compResTabDrafts: document.getElementById('compResTabDrafts'),
    compResPublishedCount: document.getElementById('compResPublishedCount'),
    compResDraftsCount: document.getElementById('compResDraftsCount'),
    compResSearchInput: document.getElementById('compResSearchInput'),
    compResSearchClear: document.getElementById('compResSearchClear'),
    compResViewGridBtn: document.getElementById('compResViewGridBtn'),
    compResViewListBtn: document.getElementById('compResViewListBtn'),
    compResTypeChipsBar: document.getElementById('compResTypeChipsBar'),
    compResContent: document.getElementById('compResContent'),
    compResSkeleton: document.getElementById('compResSkeleton'),
    compResEmptyState: document.getElementById('compResEmptyState'),
    compResEmptyTitle: document.getElementById('compResEmptyTitle'),
    compResEmptyDesc: document.getElementById('compResEmptyDesc'),"""

if target_el_nav in code:
    code = code.replace(target_el_nav, replacement_el_nav, 1)
    print("[OK] Updated el references")
else:
    print("! target_el_nav not found")

# 2. Update el.screens
target_screens = """      screens: {
        module: document.getElementById('moduleScreenView'),
        jobDescriptions: document.getElementById('jdsScreenView'),"""
if target_screens not in code:
    # check single indent
    target_screens = """    screens: {
      module: document.getElementById('moduleScreenView'),
      jobDescriptions: document.getElementById('jdsScreenView'),"""

replacement_screens = """    screens: {
      module: document.getElementById('moduleScreenView'),
      jobDescriptions: document.getElementById('jdsScreenView'),
      companyResources: document.getElementById('companyResourcesScreenView'),"""

if target_screens in code:
    code = code.replace(target_screens, replacement_screens, 1)
    print("[OK] Updated el.screens")
else:
    print("! target_screens not found")

# 3. Update navButtons in switchScreen
target_nav_buttons = """    const navButtons = [
      { btn: el.navJobDescriptions, key: 'jobDescriptions' },"""

replacement_nav_buttons = """    const navButtons = [
      { btn: el.navJobDescriptions, key: 'jobDescriptions' },
      { btn: el.navCompanyResources, key: 'companyResources' },"""

if target_nav_buttons in code:
    code = code.replace(target_nav_buttons, replacement_nav_buttons, 1)
    print("[OK] Updated navButtons in switchScreen")
else:
    print("! target_nav_buttons not found")

# 4. Update screen renderer switch
target_render_screen = """    } else if (screenKey === 'jobDescriptions') {
      renderJobDescriptionsScreen();"""

replacement_render_screen = """    } else if (screenKey === 'jobDescriptions') {
      renderJobDescriptionsScreen();
    } else if (screenKey === 'companyResources') {
      renderCompanyResourcesScreen();"""

if target_render_screen in code:
    code = code.replace(target_render_screen, replacement_render_screen, 1)
    print("[OK] Updated screenKey condition in switchScreen")
else:
    print("! target_render_screen not found")

# 5. Add sidebar nav listener
target_nav_event = """  if (el.navJobDescriptions) {
    el.navJobDescriptions.addEventListener('click', () => {
      resetJdViewToGallery();
      switchScreen('jobDescriptions');
    });
  }"""

replacement_nav_event = """  if (el.navJobDescriptions) {
    el.navJobDescriptions.addEventListener('click', () => {
      resetJdViewToGallery();
      switchScreen('jobDescriptions');
    });
  }
  if (el.navCompanyResources) {
    el.navCompanyResources.addEventListener('click', () => {
      switchScreen('companyResources');
    });
  }"""

if target_nav_event in code:
    code = code.replace(target_nav_event, replacement_nav_event, 1)
    print("[OK] Added navCompanyResources click listener")
else:
    print("! target_nav_event not found")

# 6. Call updateSidebarCompanyResourcesBadge inside renderSidebar()
target_render_sidebar_end = """    prog.modules.forEach((mod, idx) => {"""
if target_render_sidebar_end in code:
    code = code.replace(
        """  function renderSidebar() {
    const prog = getCurrentProgramme();""",
        """  function renderSidebar() {
    const prog = getCurrentProgramme();
    if (typeof updateSidebarCompanyResourcesBadge === 'function') {
      updateSidebarCompanyResourcesBadge();
    }""",
        1
    )
    print("[OK] Added updateSidebarCompanyResourcesBadge call inside renderSidebar()")

with open("app.js", "w", encoding="utf-8") as f:
    f.write(code)

print("Updated app.js basic wiring.")

