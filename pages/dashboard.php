<?php
session_start();
include_once '../includes/functions.php';
include_once '../includes/config.php';

if (!is_authenticated()) {
    header('Location: login.php');
    exit;
} else {
    header('Location: ../Practica3/Dashboard.php');
    exit;
}
?>
