<?php
session_start();
if (isset($_REQUEST['error'])) {
    if ($_REQUEST['error'] == "null") {
        echo "<script>alert('Please fill all the fields');</script>";
    } elseif ($_REQUEST['error'] == "invalid") {
        echo "<script>alert('Invalid credentials');</script>";
    }
}

?>



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="../Login/login.css">
</head>
<body>
<div class="container">
    <form class="login-form" method="post" action="logincheck.php">
        <h1>Login</h1>

        <div class="form-group">
            <label for="login_name">Name:</label>
            <input type="text" id="login_name" name="login_name" placeholder="Enter your name">
        </div>

        <div class="form-group">
            <label for="login_email">Email:</label>
            <input type="text" id="login_email" name="login_email" placeholder="Enter your email">
        </div>

        <div class="form-group">
            <label for="login_password">Password:</label>
            <input type="password" id="login_password" name="login_password" placeholder="Enter your password">
        </div>

        <button type="submit" class="btn">Login</button>
    </form>
</div>
</body>
</html>
