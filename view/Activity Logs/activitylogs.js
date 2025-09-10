const filterButton = document.getElementById('filterButton');
const startDate = document.getElementById('startDate').value;
const endDate = document.getElementById('endDate').value;
const actionType = document.getElementById('actionType').value;

filterButton.addEventListener('click', (event) => {
  if (startDate=="" || endDate=="" || actionType=="") {
    alert("Please fill in all fields");
  }
});

// Just for sidebar toggle
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('hidden');
});
