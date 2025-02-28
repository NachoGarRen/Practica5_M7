<?php
include_once '../includes/config.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['userId'])) {
    $users = load_users();

    foreach ($users as $key => $user) {
        if ($user['id'] == $data['userId']) {
            unset($users[$key]);
            break;
        }
    }

    save_users(array_values($users));

    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false]);
}
?>
