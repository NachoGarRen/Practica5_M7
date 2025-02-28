<?php
include_once '../includes/config.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['nombre'], $data['correo'], $data['rol'], $data['psswd'])) {
    $users = load_users();
    $newId = count($users) + 1;
    
    $hashedPassword = password_hash($data['psswd'], PASSWORD_BCRYPT);
    
    $newUser = [
        'id' => $newId,
        'nombre' => $data['nombre'],
        'correo' => $data['correo'],
        'rol' => $data['rol'],
        'password' => $hashedPassword 
    ];

    $users[] = $newUser;
    save_users($users);

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
