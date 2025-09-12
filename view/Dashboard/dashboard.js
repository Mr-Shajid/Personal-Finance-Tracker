// Toggle detail section
function toggleDetail(id) {
  const el = document.getElementById(id);
  el.style.display = el.style.display === 'none' ? 'block' : 'none';
}

// Chart.js Pie Chart Overview
const ctx = document.getElementById('overviewChart').getContext('2d');

new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Food', 'Transport', 'Utilities', 'Others'],
    datasets: [{
      label: 'Expense Breakdown',
      data: [4000, 2000, 1300, 3000],
      backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'],
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }
});
