<?php
session_start();

// Initialize session data
if (!isset($_SESSION['categories'])) $_SESSION['categories'] = [];
if (!isset($_SESSION['rules'])) $_SESSION['rules'] = [];
if (!isset($_SESSION['transactions'])) {
    // Dummy data for transaction tagger
    $_SESSION['transactions'] = [
        ['description' => 'Uber ride to airport'],
        ['description' => 'Starbucks coffee'],
        ['description' => 'Grocery Store purchase'],
        ['description' => 'Netflix subscription']
    ];
}

$page = $_GET['page'] ?? 'category';

// Handle form submissions
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['add_category'])) {
        $cat = trim($_POST['category']);
        if ($cat !== '') {
            $_SESSION['categories'][] = $cat;
        }
        header("Location: ?page=category");
        exit;
    }

    if (isset($_POST['add_rule'])) {
        $keyword = trim($_POST['keyword']);
        $category = $_POST['category'];
        if ($keyword !== '' && $category !== '') {
            $_SESSION['rules'][] = ['keyword' => $keyword, 'category' => $category];
        }
        header("Location: ?page=rules");
        exit;
    }
}

function navButtons() {
    return <<<HTML
        <div class="tabs">
            <a href="?page=category"><button>Category Manager</button></a>
            <a href="?page=tagger"><button>Transaction Tagger</button></a>
            <a href="?page=rules"><button>Custom Rule Creator</button></a>
        </div>
    HTML;
}

// Page content
function showCategoryManager() {
    $categories = $_SESSION['categories'];
    $catItems = "";
    foreach ($categories as $cat) {
        $catItems .= "<li>" . htmlspecialchars($cat) . "</li>";
    }

    return <<<HTML
        <h2>Category Manager</h2>
        <form method="post">
            <input type="text" name="category" placeholder="New Category" required />
            <button type="submit" name="add_category">Add</button>
        </form>
        <ul>$catItems</ul>
    HTML;
}

function showTransactionTagger() {
    $transactions = $_SESSION['transactions'];
    $rules = $_SESSION['rules'];
    $tagged = "";

    foreach ($transactions as $txn) {
        $desc = $txn['description'];
        $matchedCategory = "Uncategorized";
        foreach ($rules as $rule) {
            if (stripos($desc, $rule['keyword']) !== false) {
                $matchedCategory = $rule['category'];
                break;
            }
        }
        $tagged .= "<p><strong>" . htmlspecialchars($desc) . "</strong> → " . htmlspecialchars($matchedCategory) . "</p>";
    }

    return <<<HTML
        <h2>Transaction Tagger</h2>
        <div>$tagged</div>
    HTML;
}

function showRuleCreator() {
    $rules = $_SESSION['rules'];
    $categories = $_SESSION['categories'];

    $ruleItems = "";
    foreach ($rules as $rule) {
        $ruleItems .= "<li>If description contains '<strong>" . htmlspecialchars($rule['keyword']) . "</strong>', tag as '<em>" . htmlspecialchars($rule['category']) . "</em>'</li>";
    }

    $catOptions = "";
    foreach ($categories as $cat) {
        $catOptions .= "<option value=\"" . htmlspecialchars($cat) . "\">" . htmlspecialchars($cat) . "</option>";
    }

    return <<<HTML
        <h2>Custom Rule Creator</h2>
        <form method="post">
            <input type="text" name="keyword" placeholder="Keyword (e.g. Uber)" required />
            <select name="category" required>$catOptions</select>
            <button type="submit" name="add_rule">Create Rule</button>
        </form>
        <ul>$ruleItems</ul>
    HTML;
}

// Output page
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Expense Manager (PHP Session)</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    body { font-family: sans-serif; padding: 20px; }
    .tabs button { margin: 0 5px 15px 0; padding: 8px 12px; }
    input, select { margin: 8px 0; padding: 6px; width: 200px; }
    button { padding: 6px 12px; }
  </style>
</head>
<body>
  <h1>Expense Manager</h1>
  <?= navButtons() ?>
  <div class="screen">
    <?php
      if ($page === 'category') echo showCategoryManager();
      elseif ($page === 'tagger') echo showTransactionTagger();
      elseif ($page === 'rules') echo showRuleCreator();
      else echo "<p>Invalid page.</p>";
    ?>
  </div>
</body>
</html>
