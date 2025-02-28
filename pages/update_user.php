<?php
include_once '../includes/config.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['userId'], $data['newNombre'], $data['newCorreo'], $data['newRol'])) {
    $users = load_users();

    foreach ($users as &$user) {
        if ($user['id'] == $data['userId']) {
            $user['nombre'] = $data['newNombre'];
            $user['correo'] = $data['newCorreo'];
            $user['rol'] = $data['newRol'];
            break;
        }
    }

    save_users($users);

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
