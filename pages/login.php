<?php
session_start();
include_once '../includes/config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $users = load_users();
    $email = $_POST['email'];
    $password = $_POST['password'];

    foreach ($users as $user) {
        if ($user['correo'] === $email && password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_role'] = $user['rol'];

            if ($user['rol'] === 'admin') {
                header('Location: admin_menu.php');
            } else {
                header('Location: dashboard.php');
            }
            exit;
        }
    }
    $error = "Usuario o contraseña incorrectos.";
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="../assets/css/style.css">
</head>
<body class="login-body">
    <form method="POST" class="login-form">
        <h2 class="login-title">Iniciar sesión</h2>
        <label for="email" class="login-label">Correo Electrónico</label><br>
        <input type="email" name="email" class="login-input" placeholder="Correo" required><br><br>
        
        <label for="password" class="login-label">Contraseña:</label><br>
        <input type="password" name="password" class="login-input" placeholder="Contraseña" required><br><br>
        
        <?php if (isset($error)) echo "<p class='login-error'>$error</p>"; ?>
        
        <button type="submit" class="login-button">Iniciar sesión</button>
    </form>
</body>
</html>
