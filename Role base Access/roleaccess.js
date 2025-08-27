// Toggle sidebar visibility
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('hidden');
});

// Assign roles 
document.getElementById('assignBtn').addEventListener('click', () => {
  const user = document.getElementById('userSelect').value;
  const role = document.getElementById('roleSelect').value;
  alert(`Assigned role: ${role} to ${user}`);
});
