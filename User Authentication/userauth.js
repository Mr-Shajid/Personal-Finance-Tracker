function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

// === Signup ===
function signup() {
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;

  if (!name || !email || !password) return alert("Please fill all fields");

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const existing = users.find(u => u.email === email);
  if (existing) return alert("Email already registered!");

  users.push({ name, email, password, verified: false });
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('tempUserEmail', email); // used for verification
  alert("Signup successful! Please verify your email.");
  showScreen('verifyScreen');
}

// === Simulated Email Verification ===
function verifyEmail() {
  const email = localStorage.getItem('tempUserEmail');
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email);
  if (user) user.verified = true;
  localStorage.setItem('users', JSON.stringify(users));
  alert("Email verified! You can now login.");
  showScreen('loginScreen');
}

// === Login ===
function login() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return alert("Invalid credentials.");
  if (!user.verified) return alert("Please verify your email first.");

  localStorage.setItem('loggedInUser', email);
  document.getElementById('username').textContent = user.name;
  showScreen('homeScreen');
}

// === Logout ===
function logout() {
  localStorage.removeItem('loggedInUser');
  showScreen('loginScreen');
}

// === Forgot Password ===
function simulatePasswordReset() {
  const email = document.getElementById('forgotEmail').value;
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email);

  if (!user) return alert("Email not found.");
  localStorage.setItem('resetUserEmail', email);
  alert("Fake reset link sent. Proceed to reset password.");
  showScreen('resetScreen');
}

// === Reset Password ===
function resetPassword() {
  const newPass = document.getElementById('newPassword').value;
  const email = localStorage.getItem('resetUserEmail');

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === email);
  if (!user) return alert("User not found.");

  user.password = newPass;
  localStorage.setItem('users', JSON.stringify(users));
  localStorage.removeItem('resetUserEmail');
  alert("Password reset successful!");
  showScreen('loginScreen');
}

// === Auto-login (optional) ===
window.onload = () => {
  const loggedEmail = localStorage.getItem('loggedInUser');
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.email === loggedEmail);
  if (user) {
    document.getElementById('username').textContent = user.name;
    showScreen('homeScreen');
  } else {
    showScreen('loginScreen');
  }
}
