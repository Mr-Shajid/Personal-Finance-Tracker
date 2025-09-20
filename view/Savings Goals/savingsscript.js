// Toggle sidebar visibility
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('hidden');
});

// Add new savings goal
const addGoalBtn = document.getElementById('addGoal');
const goalsContainer = document.getElementById('goalsContainer');

addGoalBtn.addEventListener('click', () => {
  const name = document.getElementById('goalName').value.trim();
  const target = parseFloat(document.getElementById('goalTarget').value);
  const saved = parseFloat(document.getElementById('goalSaved').value);

  if (!name || isNaN(target) || isNaN(saved) || target <= 0) {
    alert("Please fill all fields with valid numbers.");
    return;
  }

  const percent = Math.min((saved / target) * 100, 100).toFixed(1);

  const goalEl = document.createElement('div');
  goalEl.classList.add('goal');
  goalEl.innerHTML = `
    <div class="goal-name">${name} – $${saved} / $${target} (${percent}%)</div>
    <div class="progress-bar">
      <div class="progress" style="width: ${percent}%;"></div>
    </div>
  `;

  goalsContainer.appendChild(goalEl);

  // Reset form
  document.getElementById('goalName').value = '';
  document.getElementById('goalTarget').value = '';
  document.getElementById('goalSaved').value = '';

  // Celebrate when 100%
  if (percent >= 100) {
    alert(`Congratulations! You've achieved your goal: ${name}`);
  }
});
