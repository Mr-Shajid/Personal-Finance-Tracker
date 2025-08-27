<?php
session_start();

// Simulated "database" for demo purposes
$users = &$_SESSION['users']; // This simulates user storage
if (!isset($users)) {
    $users = [];
}

// Routing logic
$page = $_GET['page'] ?? 'login';
$message = '';

function showForm($content) {
    echo <<<HTML
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Auth System</title>
        <style>
            body { font-family: Arial; margin: 50px; }
            .form-box { max-width: 400px; margin: auto; padding: 20px; border: 1px solid #ccc; }
            input { display: block; width: 100%; margin: 10px 0; padding: 8px; }
            button { padding: 8px 16px; }
            .msg { color: red; }
        </style>
    </head>
    <body>
        <div class="form-box">
            $content
        </div>
    </body>
    </html>
    HTML;
}

if (isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'signup':
            $name = $_POST['name'];
            $email = $_POST['email'];
            $pass = $_POST['password'];
            if (isset($users[$email])) {
                $message = "User already exists!";
            } else {
                $users[$email] = [
                    'name' => $name,
                    'password' => $pass,
                    'verified' => false,
                ];
                $_SESSION['pending_email'] = $email;
                header("Location: ?page=verify");
                exit;
            }
            break;

        case 'verify':
            $email = $_SESSION['pending_email'];
            if ($email && isset($users[$email])) {
                $users[$email]['verified'] = true;
                $message = "Email verified. You can now login.";
                unset($_SESSION['pending_email']);
                header("Location: ?page=login");
                exit;
            }
            break;

        case 'login':
            $email = $_POST['email'];
            $pass = $_POST['password'];
            if (!isset($users[$email])) {
                $message = "User not found.";
            } elseif ($users[$email]['password'] !== $pass) {
                $message = "Wrong password.";
            } elseif (!$users[$email]['verified']) {
                $message = "Email not verified.";
            } else {
                $_SESSION['user'] = $email;
                header("Location: ?page=home");
                exit;
            }
            break;

        case 'logout':
            session_destroy();
            header("Location: ?page=login");
            exit;

        case 'forgot':
            $email = $_POST['email'];
            if (isset($users[$email])) {
                $_SESSION['reset_email'] = $email;
                header("Location: ?page=reset");
                exit;
            } else {
                $message = "Email not found.";
            }
            break;

        case 'reset':
            $newPass = $_POST['new_password'];
            $email = $_SESSION['reset_email'];
            if ($email && isset($users[$email])) {
                $users[$email]['password'] = $newPass;
                unset($_SESSION['reset_email']);
                $message = "Password reset successfully. You can now login.";
                header("Location: ?page=login");
                exit;
            }
            break;
    }
}

// Page Views
switch ($page) {
    case 'signup':
        showForm(<<<HTML
            <h2>Signup</h2>
            <form method="post">
                <input type="text" name="name" placeholder="Name" required>
                <input type="email" name="email" placeholder="Email" required>
                <input type="password" name="password" placeholder="Password" required>
                <input type="hidden" name="action" value="signup">
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <a href="?page=login">Login</a></p>
            <div class="msg">$message</div>
        HTML);
        break;

    case 'verify':
        showForm(<<<HTML
            <h2>Email Verification</h2>
            <p>Click to verify your email</p>
            <form method="post">
                <input type="hidden" name="action" value="verify">
                <button type="submit">Verify Email</button>
            </form>
        HTML);
        break;

    case 'login':
        showForm(<<<HTML
            <h2>Login</h2>
            <form method="post">
                <input type="email" name="email" placeholder="Email" required>
                <input type="password" name="password" placeholder="Password" required>
                <input type="hidden" name="action" value="login">
                <button type="submit">Login</button>
            </form>
            <p><a href="?page=forgot">Forgot Password?</a></p>
            <p>New user? <a href="?page=signup">Signup</a></p>
            <div class="msg">$message</div>
        HTML);
        break;

    case 'forgot':
        showForm(<<<HTML
            <h2>Forgot Password</h2>
            <form method="post">
                <input type="email" name="email" placeholder="Your registered email" required>
                <input type="hidden" name="action" value="forgot">
                <button type="submit">Send Reset Link</button>
            </form>
            <p><a href="?page=login">Back to Login</a></p>
            <div class="msg">$message</div>
        HTML);
        break;

    case 'reset':
        showForm(<<<HTML
            <h2>Reset Password</h2>
            <form method="post">
                <input type="password" name="new_password" placeholder="New Password" required>
                <input type="hidden" name="action" value="reset">
                <button type="submit">Reset</button>
            </form>
        HTML);
        break;

    case 'home':
        if (!isset($_SESSION['user'])) {
            header("Location: ?page=login");
            exit;
        }
        $userEmail = $_SESSION['user'];
        $name = $users[$userEmail]['name'];
        showForm(<<<HTML
            <h2>Welcome, $name</h2>
            <form method="post">
                <input type="hidden" name="action" value="logout">
                <button type="submit">Logout</button>
            </form>
        HTML);
        break;

    default:
        header("Location: ?page=login");
        exit;
}
?>
