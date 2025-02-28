<?php
session_start();

if (isset($_SESSION['user_id'])) {
    if ($_SESSION['user_role'] === 'admin') {
        header('Location: pages/admin_menu.php');
    } else {
        header('Location: pages/dashboard.php');
    }
    exit;
} else {
    header('Location: pages/login.php');
    exit;
}
?>
