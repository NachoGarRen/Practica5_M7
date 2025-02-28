<?php
session_start();
include_once '../includes/functions.php';
include_once '../includes/config.php';

if (!is_authenticated() || !is_admin()) {
    header('Location: dashboard.php');
    exit;
}

$users = load_users();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1,shrink-to-fit=no">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="../assets/css/style.css">
    <title>Panel de Administración</title>
</head>
<body>
    <div class="container my-5">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h1 class="text-primary">Panel de Administración</h1>
            <a href="logout.php" class="btn btn-outline-secondary">Cerrar sesión</a>
        </div>

        <section>
            <h2 class="text-secondary">Gestión de Usuarios</h2>
            <div class="card my-4">
                <div class="card-header bg-primary text-white">
                    Crear Usuario
                </div>
                <div class="card-body">
                    <form id="create-user-form" class="row g-3">
                        <div class="col-md-6">
                            <input type="text" id="nombre" class="form-control" placeholder="Nombre" required>
                        </div>
                        <div class="col-md-6">
                            <input type="email" id="correo" class="form-control" placeholder="Correo" required>
                        </div>
                        <div class="col-md-6">
                            <select id="rol" class="form-select">
                                <option value="admin">Administrador</option>
                                <option value="normal">Usuario Normal</option>
                            </select>
                        </div>
                        <div class="col-md-6">
                            <input type="password" id="psswd" class="form-control" placeholder="Contraseña" required>
                        </div>
                        <div class="col-12 text-end">
                            <button type="submit" class="btn btn-primary">Crear Usuario</button>
                        </div>
                    </form>
                </div>
            </div>

            <h3 class="text-secondary">Lista de Usuarios</h3>
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead class="table-primary">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="user-table-body">
                        <?php foreach ($users as $user) { ?>
                        <tr id="user-<?php echo $user['id']; ?>">
                            <td><?php echo $user['id']; ?></td>
                            <td><?php echo $user['nombre']; ?></td>
                            <td><?php echo $user['correo']; ?></td>
                            <td><?php echo $user['rol']; ?></td>
                            <td>
                                <button class="btn btn-sm action-button update-btn" data-id="<?php echo $user['id']; ?>">Actualizar</button>
                                <button class="btn btn-sm action-button delete-btn" data-id="<?php echo $user['id']; ?>">Eliminar</button>
                            </td>
                        </tr>
                        <?php } ?>
                    </tbody>
                </table>
            </div>
        </section>
    </div>
    
    <script src="../assets/js/script.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
</body>
</html>
