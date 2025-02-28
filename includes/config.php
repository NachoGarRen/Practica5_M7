<?php
define('USERS_FILE', '../data/usuarios.json');

function load_users() {
    if (!file_exists(USERS_FILE)) {
        return [];
    }
    return json_decode(file_get_contents(USERS_FILE), true);
}

function save_users($users) {
    file_put_contents(USERS_FILE, json_encode($users, JSON_PRETTY_PRINT));
}
?>
