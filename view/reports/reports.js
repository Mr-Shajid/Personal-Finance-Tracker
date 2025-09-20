function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
  document.getElementById(id).style.display = 'block';
  if (id === 'compare') renderBarChart();
}

// === Spending Trends ===
const trendCtx = document.getElementById('trendChart').getContext('2d');
const trendData = [
  { date: '2025-08-01', amount: 200 },
  { date: '2025-08-05', amount: 500 },
  { date: '2025-08-10', amount: 300 },
  { date: '2025-08-15', amount: 450 },
  { date: '2025-08-20', amount: 100 },
  { date: '2025-08-25', amount: 600 }
];

let trendChart;

function filterTrends() {
  const from = document.getElementById('startDate').value;
  const to = document.getElementById('endDate').value;
  const filtered = trendData.filter(t => (!from || t.date >= from) && (!to || t.date <= to));

  const labels = filtered.map(t => t.date);
  const amounts = filtered.map(t => t.amount);

  if (trendChart) trendChart.destroy();

  trendChart = new Chart(trendCtx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Expenses',
        data: amounts,
        fill: false,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true
    }
  });
}

// === Income vs Expense Bar Chart ===
const barCtx = document.getElementById('barChart').getContext('2d');

function renderBarChart() {
  const months = ['May', 'June', 'July', 'August'];
  const income = [1000, 1200, 1100, 1300];
  const expense = [800, 950, 900, 1000];

  new Chart(barCtx, {
    type: 'bar',
    data: {
      labels: months,
      datasets: [
        {
          label: 'Income',
          data: income,
          backgroundColor: 'green'
        },
        {
          label: 'Expense',
          data: expense,
          backgroundColor: 'red'
        }
      ]
    },
    options: {
      responsive: true
    }
  });
}

// === Net Worth ===
function calculateNetWorth() {
  const assets = parseFloat(document.getElementById('assets').value) || 0;
  const liabilities = parseFloat(document.getElementById('liabilities').value) || 0;
  const net = assets - liabilities;
  document.getElementById('netResult').textContent = `Your Net Worth is: ${net} BDT`;
}

// === Export Charts ===
function downloadChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  const image = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.href = image;
  a.download = `${canvasId}.png`;
  a.click();
}
