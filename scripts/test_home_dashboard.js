// scripts/test_home_dashboard.js
// Verification script for Home Dashboard System

const fs = require('fs');
const path = require('path');

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASS: ${message}`);
}

console.log('--- Step 1: Checking Migration File ---');
const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20261114_15_home_dashboard_summary.sql');
assert(fs.existsSync(migrationPath), 'Migration 20261114_15 exists');

const sqlContent = fs.readFileSync(migrationPath, 'utf8');
assert(sqlContent.includes('create or replace function public.get_dashboard_summary()'), 'SQL defines get_dashboard_summary()');
assert(sqlContent.includes('returns jsonb'), 'RPC returns jsonb');
assert(sqlContent.includes('security definer'), 'RPC is security definer');
assert(sqlContent.includes("set search_path = public, pg_temp"), 'search_path is pinned to public, pg_temp');
assert(sqlContent.includes('if v_caller_id is null then'), 'Enforces auth.uid() requirement');
assert(sqlContent.includes("access_status is distinct from 'active'"), 'Enforces active access status requirement');
assert(sqlContent.includes("if v_role = 'intern' then"), 'Normalizes intern role to learner');
assert(sqlContent.includes('revoke all on function public.get_dashboard_summary() from public, anon;'), 'Revokes public/anon');
assert(sqlContent.includes('grant execute on function public.get_dashboard_summary() to authenticated;'), 'Grants authenticated');

console.log('\n--- Step 2: Checking DataLayer in data.js ---');
const dataJsPath = path.join(__dirname, '..', 'data.js');
const dataJs = fs.readFileSync(dataJsPath, 'utf8');
assert(dataJs.includes('async getDashboardSummary()'), 'DataLayer.getDashboardSummary is defined');
assert(dataJs.includes("client.rpc('get_dashboard_summary')"), 'Calls get_dashboard_summary RPC');
assert(!dataJs.includes('// fallback fake summary'), 'No fake demo data fallback in getDashboardSummary');

console.log('\n--- Step 3: Checking HTML in index.html ---');
const indexPath = path.join(__dirname, '..', 'index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf8');
assert(indexHtml.includes('id="navHome"'), 'index.html contains navHome button');
assert(indexHtml.includes('id="homeScreenView"'), 'index.html contains homeScreenView');
assert(indexHtml.includes('id="homeDashboardContainer"'), 'index.html contains homeDashboardContainer');

// Ensure navHome is before navJobDescriptions
const navHomeIndex = indexHtml.indexOf('id="navHome"');
const navJdIndex = indexHtml.indexOf('id="navJobDescriptions"');
assert(navHomeIndex !== -1 && navHomeIndex < navJdIndex, 'navHome is first item in sidebar nav');

console.log('\n--- Step 4: Checking App Logic in app.js ---');
const appJsPath = path.join(__dirname, '..', 'app.js');
const appJs = fs.readFileSync(appJsPath, 'utf8');
assert(appJs.includes("navHome: document.getElementById('navHome')"), 'el.navHome is registered');
assert(appJs.includes("homeScreenView: document.getElementById('homeScreenView')"), 'el.homeScreenView is registered');
assert(appJs.includes("homeDashboardContainer: document.getElementById('homeDashboardContainer')"), 'el.homeDashboardContainer is registered');
assert(appJs.includes("home: document.getElementById('homeScreenView')"), 'el.screens.home is registered');
assert(appJs.includes("let activeScreen = 'home'"), 'Default activeScreen is home');
assert(appJs.includes("screenKey === 'home'"), 'switchScreen handles home');
assert(appJs.includes("renderHomeScreen()"), 'renderHomeScreen is called');
assert(appJs.includes("Future dashboard cards can plug in here: Onboarding checklist, Assigned mentor/buddy, Formal Certificate download, Leave requests, Programme deadlines."), 'Future cards comment is present');
assert(appJs.includes("renderLearnerHome"), 'renderLearnerHome is defined');
assert(appJs.includes("renderInstructorHome"), 'renderInstructorHome is defined');
assert(appJs.includes("renderAdminHome"), 'renderAdminHome is defined');
assert(appJs.includes("syncSidebarBadgesFromSummary"), 'syncSidebarBadgesFromSummary is defined');
assert(appJs.includes("now - lastHomeSummaryFetch < 60000"), '60-second throttling is enforced');

console.log('\n--- Step 5: Checking CSS in styles.css ---');
const cssPath = path.join(__dirname, '..', 'styles.css');
const css = fs.readFileSync(cssPath, 'utf8');
assert(css.includes('.home-dashboard-container'), '.home-dashboard-container styled');
assert(css.includes('.home-hero-card'), '.home-hero-card styled');
assert(css.includes('.home-next-step-box'), '.home-next-step-box styled');
assert(css.includes('.home-stat-grid'), '.home-stat-grid styled');
assert(css.includes('.home-attention-card'), '.home-attention-card styled');
assert(css.includes('.home-modules-list'), '.home-modules-list styled');
assert(css.includes('.home-table'), '.home-table styled');
assert(css.includes('.home-skeleton-shimmer'), '.home-skeleton-shimmer styled');

console.log('\n🎉 ALL HOME DASHBOARD CHECKS PASSED PERFECTLY!');

