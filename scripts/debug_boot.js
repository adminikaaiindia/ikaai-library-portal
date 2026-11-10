// scripts/debug_boot.js
const fs = require('fs');

console.log('--- Simulating DOM and running app.js boot ---');

const html = fs.readFileSync('index.html', 'utf8');

// Build map of all IDs present in index.html
const idRegex = /\sid=["']([^"']+)["']/g;
const presentIds = new Set();
let match;
while ((match = idRegex.exec(html)) !== null) {
  presentIds.add(match[1]);
}
console.log(`Found ${presentIds.size} unique IDs in index.html.`);

// Create mock elements
const elements = {};
function createMockElement(id) {
  const el = {
    id,
    style: {},
    classList: {
      add: () => {},
      remove: () => {},
      toggle: () => false,
      contains: () => false
    },
    addEventListener: () => {},
    removeEventListener: () => {},
    setAttribute: () => {},
    getAttribute: () => null,
    removeAttribute: () => {},
    focus: () => {},
    blur: () => {},
    value: '',
    textContent: '',
    innerHTML: '',
    dataset: {}
  };
  el.appendChild = () => {};
  el.removeChild = () => {};
  el.querySelector = () => createMockElement('child');
  el.querySelectorAll = () => [];
  return el;
}

presentIds.forEach(id => {
  elements[id] = createMockElement(id);
});

// Setup global mock window and document
global.window = {
  location: { search: '' },
  localStorage: {
    getItem: (key) => null,
    setItem: () => {},
    removeItem: () => {}
  },
  scrollTo: () => {},
  addEventListener: () => {},
  supabaseClient: null,
  isSupabaseConfigured: () => false,
  SUPABASE_CONFIG: {},
  DataLayer: {
    getModules: async () => [],
    getCurrentUser: async () => null,
    getProfile: async () => null,
    adminListAccessInvites: async () => [], openModule: async () => {}
  }
};

global.document = {
  readyState: 'complete',
  getElementById: (id) => elements[id] || null,
  querySelector: (sel) => createMockElement(sel),
  querySelectorAll: (sel) => [],
  createElement: (tag) => createMockElement(tag),
  addEventListener: () => {},
  documentElement: {
    setAttribute: () => {}
  }
};

global.localStorage = global.window.localStorage;

try {
  // Read and execute app.js
  const appCode = fs.readFileSync('app.js', 'utf8');
  eval(appCode);
  console.log('🎉 SUCCESS: app.js evaluated and finished full boot with ZERO errors!');
} catch (err) {
  console.error('CRITICAL BOOT ERROR IN app.js:', err);
}
