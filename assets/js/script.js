   // Crear Usuario
   document.getElementById('create-user-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const rol = document.getElementById('rol').value;
    const psswd = document.getElementById('psswd').value; 

    fetch('create_user.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, correo, rol, psswd }) 
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Usuario creado exitosamente');
            location.reload();  
        } else {
            alert('Error al crear el usuario');
        }
    })
    .catch(error => alert('Error: ' + error));
});


// Actualizar Usuario
document.querySelectorAll('.update-btn').forEach(button => {
    button.addEventListener('click', function() {
        const userId = this.getAttribute('data-id');
        const newNombre = prompt('Nuevo Nombre:');
        const newCorreo = prompt('Nuevo Correo:');
        const newRol = prompt('Nuevo Rol (admin/normal):');

        fetch('update_user.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, newNombre, newCorreo, newRol })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Usuario actualizado');
                location.reload();
            } else {
                alert('Error al actualizar');
            }
        })
        .catch(error => alert('Error: ' + error));
    });
});

// Eliminar Usuario
document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function() {
        const userId = this.getAttribute('data-id');
        if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
            fetch('delete_user.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Usuario eliminado');
                    document.getElementById('user-' + userId).remove();
                } else {
                    alert('Error al eliminar');
                }
            })
            .catch(error => alert('Error: ' + error));
        }
    });
});