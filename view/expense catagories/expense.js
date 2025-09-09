// Initial dummy data
const mockTransactions = [
  { id: 1, name: "Uber Ride" },
  { id: 2, name: "Grocery Store" },
  { id: 3, name: "Netflix Subscription" }
];

// Show only one screen
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(div => div.style.display = 'none');
  document.getElementById(id).style.display = 'block';
  if (id === 'tagger') renderTransactions();
  if (id === 'rules') updateRuleCategoryDropdown();
}

// Category Manager
function addCategory(event) {
  event.preventDefault();
  const category = document.getElementById('categoryInput').value;
  const categories = getCategories();
  categories.push(category);
  localStorage.setItem('categories', JSON.stringify(categories));
  document.getElementById('categoryInput').value = '';
  renderCategories();
}

function getCategories() {
  return JSON.parse(localStorage.getItem('categories')) || [];
}

function renderCategories() {
  const list = document.getElementById('categoryList');
  list.innerHTML = '';
  getCategories().forEach((cat, i) => {
    const li = document.createElement('li');
    li.textContent = cat;
    list.appendChild(li);
  });
}

renderCategories();

// Transaction Tagger
function renderTransactions() {
  const container = document.getElementById('transactions');
  container.innerHTML = '';
  const categories = getCategories();

  mockTransactions.forEach(tx => {
    const div = document.createElement('div');
    div.innerHTML = `
      <strong>${tx.name}</strong>
      <select onchange="tagTransaction(${tx.id}, this.value)">
        <option value="">Tag as...</option>
        ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
      </select>
    `;
    container.appendChild(div);
  });
}

function tagTransaction(id, category) {
  alert(`Transaction ${id} tagged as "${category}"`);
}

// Custom Rule Creator
function addRule(event) {
  event.preventDefault();
  const keyword = document.getElementById('ruleKeyword').value;
  const category = document.getElementById('ruleCategory').value;
  const rules = getRules();
  rules.push({ keyword, category });
  localStorage.setItem('rules', JSON.stringify(rules));
  document.getElementById('ruleKeyword').value = '';
  renderRules();
}

function getRules() {
  return JSON.parse(localStorage.getItem('rules')) || [];
}

function renderRules() {
  const list = document.getElementById('ruleList');
  list.innerHTML = '';
  getRules().forEach(rule => {
    const li = document.createElement('li');
    li.textContent = `If name contains "${rule.keyword}" → Tag as "${rule.category}"`;
    list.appendChild(li);
  });
}

function updateRuleCategoryDropdown() {
  const dropdown = document.getElementById('ruleCategory');
  dropdown.innerHTML = '';
  getCategories().forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    dropdown.appendChild(option);
  });
}

renderRules();
