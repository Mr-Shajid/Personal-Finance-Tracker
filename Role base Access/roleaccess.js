// Sidebar toggle
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('hidden');
});

// Role selector logic
const roleSelect = document.getElementById('roleSelect');
const adminPanel = document.getElementById('adminPanel');

function updateSidebar(role) {
  if (role === 'admin') {
    adminPanel.style.display = 'block';
  } else {
    adminPanel.style.display = 'none';
  }
}

roleSelect.addEventListener('change', () => {
  updateSidebar(roleSelect.value);
});

// Initialize default state
updateSidebar('user');
