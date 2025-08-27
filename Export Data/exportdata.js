// Tab switching
const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// Dummy proceed button
const proceedExport = document.getElementById('proceedExport');
proceedExport.addEventListener('click', () => {
  alert('Data selected for export! Now choose format.');
  document.querySelector('[data-tab="format"]').click();
});

// Download button (dummy file)
const downloadBtn = document.getElementById('downloadBtn');
const formatSelect = document.getElementById('formatSelect');
downloadBtn.addEventListener('click', () => {
  const format = formatSelect.value;
  const blob = new Blob([`Dummy ${format.toUpperCase()} export data`], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `export.${format}`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});
