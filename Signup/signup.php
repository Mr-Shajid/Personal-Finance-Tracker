<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    $error = "";
    $success = "";

    // Basic validation
    if (empty($name)) {
    $error = "Name is required";
} elseif (empty($email)) {
    $error = "Email is required";
} else {
    $hasAt = false;
    for ($i = 0; $i < strlen($email); $i++) {
        if ($email[$i] === '@') {
            $hasAt = true;
            break;
        }
    }
    if (!$hasAt) {
        $error = "Email must contain @";
    } elseif (empty($password)) {
        $error = "Password is required";
    } elseif (strlen($password) < 6) {
        $error = "Password must be at least 6 characters";
    }
}


    // Redirect with error or success message
    if (!empty($error)) {
        header("Location: signup.php?error=" . urlencode($error));
        exit;
    } else {
        header("Location: /Personal-Finance-Tracker/Login/login.php?success=" . urlencode("Account created successfully!"));
        exit;
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
    if (isset($_GET['error'])) {
        echo "<script>alert('" . $_GET['error'] . "');</script>";
    } elseif (isset($_GET['success'])) {
        echo "<script>alert('" . ($_GET['success']) . "');</script>";
    }
    ?>


    <div class="container">
        <form class="signup-form" method="post">
            <legend><h1>Sign Up</h1></legend>

            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Enter your name" >
            </div>

            <div class="form-group">
                <label for="email">Email Address:</label>
                <input type="email" id="email" name="email" placeholder="example@email.com">
            </div>

            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" placeholder="Create a password" >
            </div>

            <button type="submit" class="btn">Create Account</button>
        </form>
    </div>
</body>
</html>

