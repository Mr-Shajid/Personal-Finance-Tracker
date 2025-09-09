// DOM Utilities
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

// Toast Notification System
function toast(message) {
  const toastElement = document.createElement('div');
  toastElement.className = 'item';
  toastElement.textContent = message;
  $('#toast').appendChild(toastElement);
  
  setTimeout(() => {
    if (toastElement.parentNode) {
      toastElement.remove();
    }
  }, 3500);
}

// Simple Navigation
function showSection(sectionId) {
  const sections = ['landing', 'income', 'accounts', 'notifications', 'admin'];
  
  sections.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.hidden = (id !== sectionId);
    }
  });

  // Update active tab
  $$('#navTabs .tab').forEach(tab => {
    const route = tab.dataset.route;
    tab.classList.toggle('active', route === sectionId);
  });
}

// Setup Navigation
function setupNavigation() {
  // Tab navigation
  $$('#navTabs .tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      const route = tab.dataset.route;
      if (route) {
        showSection(route);
      }
    });
  });

  // CTA button navigation
  $$('.cta .btn[data-route]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const route = btn.dataset.route;
      if (route) {
        showSection(route);
      }
    });
  });
}



// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  showSection('landing'); // Show landing page by default
});
