<?php
    session_start();
    if(!isset($_SESSION['status'])){
        header('location:/Personal-Finance-Tracker/view/Login/login.php?error=badrequest');
    }
?>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bill Reminders - Personal Finance Tracker</title>
  <link rel="stylesheet" href="billreminderstyle.css">
</head>
<body>
    <!-- Hamburger Menu -->
     <div class="hamburger" id="hamburger">&#9776;</div>
  <!-- Sidebar -->
  <div class="sidebar" id="sidebar">
    <h2>Personal Finance Tracker</h2>
    <div class="nav-item"><a href="../Bill Reminder/billreminder.php">Bill Reminders</a></div>
    <div class="nav-item"><a href="../Savings Goals/savings.html">Goals</a></div>
    <div class="nav-item"><a href="../Export Data/exportdata.html">Export Data</a></div>
    <div class="nav-item"><a href="../Role base Access/roleaccess.html">Role Based Access</a></div>
    <div class="nav-item"><a href="../Activity Logs/activitylogs.html">Activity Log</a></div>
  </div>

  <!-- Main Content -->
  <div class="main">
    <h1>Bill Reminders</h1>
    <div class="content">
      <!-- Calendar -->
      <div class="calendar">
        <h3>Calendar</h3>
        <input type="date" class="date" name="date">
        <input type="submit" class="submit" >
      </div>

      <!-- Upcoming Bills -->
      <div>
        <div class="bills">
          <h3>Upcoming Bills</h3>
          <div class="bill">
            <div class="info">Electricity - Aug 15 - $80</div>
            <button class="pay-btn">Pay Now</button>
          </div>
          <div class="bill">
            <div class="info">Internet - Aug 20 - $40</div>
            <button class="pay-btn">Pay Now</button>
          </div>
          <div class="bill">
            <div class="info">Rent - Sep 1 - $500</div>
            <button class="pay-btn">Pay Now</button>
          </div>
        </div>

        <!-- Notification Settings -->
        <div class="notifications">
          <h3>Reminders</h3>
          <label><input type="checkbox" id="emailNotify" checked> Email Notifications</label>
          <label><input type="checkbox" id="appNotify" checked> In-App Notifications</label>
          <label><input type="checkbox" id="smsNotify"> SMS Notifications</label>
        </div>
      </div>
    </div>
  </div>

  <script src="billreminderscript.js"></script>
</body>
</html>
