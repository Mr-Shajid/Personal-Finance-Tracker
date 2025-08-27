let captchaAnswer;

function generateCaptcha() {
  const a = Math.floor(Math.random() * 10);
  const b = Math.floor(Math.random() * 10);
  captchaAnswer = a + b;
  document.getElementById("captchaQuestion").textContent = `${a} + ${b} = ?`;
}

function submitForm(event) {
  event.preventDefault();

  const userAnswer = parseInt(document.getElementById("captchaAnswer").value);
  if (userAnswer !== captchaAnswer) {
    alert("CAPTCHA incorrect! Try again.");
    generateCaptcha();
    return;
  }

  // Simulate sending email (not actually sent)
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  console.log("Pretend sending email to:", email);
  alert("Auto-receipt email has been sent to " + email); // fake email confirmation

  // Show confirmation screen
  document.getElementById("contactForm").style.display = "none";
  document.getElementById("confirmationScreen").style.display = "block";
}

generateCaptcha();
