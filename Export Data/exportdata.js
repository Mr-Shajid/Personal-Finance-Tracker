document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('hidden');
});

document.querySelector('.export-btn').addEventListener('click', () => {
  alert('Your export is being prepared...');
});
