const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('=== COMPREHENSIVE HOME DASHBOARD VERIFICATION ===\n');

// 1. Verify CSS Rules
const css = fs.readFileSync(path.join(__dirname, '..', 'styles.css'), 'utf8');

const expectedClasses = [
  '.home-dashboard-container',
  '.home-hero-card',
  '.home-hero-top',
  '.home-hero-content-grid',
  '.home-next-step-box',
  '.home-next-step-btn',
  '.home-progress-ring-card',
  '.home-progress-ring-wrap',
  '.home-progress-ring-svg',
  '.home-progress-ring-bg',
  '.home-progress-ring-circle',
  '.home-progress-ring-inner',
  '.home-progress-ring-num',
  '.home-progress-ring-label',
  '.home-stat-grid',
  '.home-attention-card',
  '.home-attention-icon-box',
  '.home-attention-badge',
  '.home-grid-2col',
  '.home-card',
  '.home-stepper-list',
  '.home-stepper-item',
  '.home-stepper-node',
  '.home-badge-tag',
  '.home-exam-card',
  '.home-exam-grade-display',
  '.home-exam-feedback-quote',
  '.home-quote-icon',
  '.home-quote-text',
  '.home-mini-bar-wrap',
  '.home-mini-bar-track',
  '.home-mini-bar-fill',
  '.home-stacked-bar-container',
  '.home-stacked-bar-track',
  '.home-stacked-segment',
  '.home-stacked-legend',
  '.home-empty-state',
  '.home-skeleton-shimmer',
  '.home-error-card',
  '@media (prefers-reduced-motion: reduce)'
];

expectedClasses.forEach(cls => {
  assert(css.includes(cls), `styles.css must contain ${cls}`);
  console.log(`✅ PASS: CSS rule ${cls} verified`);
});

// 2. Verify app.js syntax and key function definitions
const appJs = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
new vm.Script(appJs);
console.log('\n✅ PASS: app.js compiles cleanly with 0 syntax errors');

assert(appJs.includes('attachAccessibleAction'), 'attachAccessibleAction helper present');
assert(appJs.includes('home-progress-ring-svg'), 'SVG circular progress ring present');
assert(appJs.includes('home-stepper-list'), 'Learning path stepper present');
assert(appJs.includes('home-exam-feedback-quote'), 'Exam status instructor quote present');
assert(appJs.includes('home-mini-bar-fill'), 'Horizontal mini progress bars present');
assert(appJs.includes('home-stacked-segment'), 'Admin access snapshot stacked bar present');
assert(appJs.includes('home-empty-state'), 'Empty state illustrations present');

console.log('✅ PASS: All required dashboard components verified in app.js');

// 3. Verify index.html cache query parameters
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
assert(/styles\.css\?v=20261116_\d+/.test(html), 'styles.css cache version bumped');
assert(/app\.js\?v=20261116_\d+/.test(html), 'app.js cache version bumped');
assert(/data\.js\?v=20261116_\d+/.test(html), 'data.js cache version bumped');
console.log('✅ PASS: Cache versioning verified in index.html');

console.log('\n🎉 ALL COMPREHENSIVE CHECKS PASSED WITH ZERO ERRORS!');
