// Button click actions
const payButtons = document.querySelectorAll('.pay-btn');
payButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    alert("Action: " + btn.innerText);
  });
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('hidden');
});


