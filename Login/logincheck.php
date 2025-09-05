<?php
    session_start();

    $username = trim($_REQUEST['login_name']);
    $password = trim($_REQUEST['login_password']);
    $email = trim($_REQUEST['login_email']);

    if($username == "" || $password == "" || $email == ""){
        header('location: login.php?error=null');
    }else{
        if($username == "shajid" && $password == "123456" && $email == "shajid3@gmail.com"){
            $_SESSION['username'] = $username;
            setcookie('status', true, time()+3000, '/');
            header('location: /Personal-Finance-Tracker/Bill Reminder/billreminder.html');
        }else{
            header('location: login.php?error=invalid');
        }
    }
?>