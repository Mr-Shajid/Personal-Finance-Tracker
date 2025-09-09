<?php
    session_start();

    $username = trim($_REQUEST['username']);
    $password = trim($_REQUEST['password']);
    $email = trim($_REQUEST['useremail']);

    if($username == "" || $password == "" || $email == ""){
        header('location:/Personal-Finance-Tracker/view/Login/login.php?error=null');
    }else{
        if($username == "shajid" && $password == "123456" && $email == "shajid3@gmail.com"){
            $_SESSION['status'] = true;
            header('location:/Personal-Finance-Tracker/view/Bill Reminder/billreminder.php?session=true');
        }else{
            header('location:/Personal-Finance-Tracker/view/Login/login.php?error=invalid');
        }
    }
?>