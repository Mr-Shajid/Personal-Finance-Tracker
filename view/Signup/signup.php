<?php
$error = "";
$success = "";

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    // Basic validation
    if (empty($name)) {
        $error = "Name is required";
    } elseif (empty($email)) {
        $error = "Email is required";
    } elseif (strpos($email, '@') === false) {
        $error = "Email must contain @";
    } elseif (empty($password)) {
        $error = "Password is required";
    } elseif (strlen($password) < 6) {
        $error = "Password must be at least 6 characters";
    } else {
        $success = "Account created successfully!";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign Up</title>
    <link rel="stylesheet" href="../Signup/signup.css">
</head>
<body>

<?php
$message = "";

if (!empty($error)) {
    $message = $error;
} elseif (!empty($success)) {
    $message = $success;
}

if (!empty($message)) {
    echo "<script>alert('$message');</script>";
}
?>


<div class="container">
    <form class="signup-form" method="post">
        <legend><h1>Sign Up</h1></legend>

        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" name="name" placeholder="Enter your name"
                   value="<?php echo htmlspecialchars($name ?? ''); ?>">
        </div>

        <div class="form-group">
            <label for="email">Email Address:</label>
            <input type="email" id="email" name="email" placeholder="example@email.com"
                   value="<?php echo htmlspecialchars($email ?? ''); ?>">
        </div>

        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" placeholder="Create a password">
        </div>

        <button type="submit" class="btn">Create Account</button>
    </form>
</div>
</body>
</html>
