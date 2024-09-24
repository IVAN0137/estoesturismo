<?php
$servername = "sql210.infinityfree.com";
$username = "if0_37315282";
$password = "MAGI020601";
$dbname = "if0_37315282_login_db";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Comprobar conexión
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Seleccionar todos los usuarios con contraseñas en texto plano
$sql = "SELECT id, password FROM users";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $id = $row['id'];
        $plain_password = $row['password'];

        // Encriptar la contraseña
        $hashed_password = password_hash($plain_password, PASSWORD_DEFAULT);

        // Actualizar la base de datos con la contraseña encriptada
        $update_sql = "UPDATE users SET password='$hashed_password' WHERE id=$id";
        if ($conn->query($update_sql) === TRUE) {
            echo "Contraseña actualizada para el usuario con ID: $id<br>";
        } else {
            echo "Error actualizando la contraseña para el usuario con ID: $id: " . $conn->error . "<br>";
        }
    }
} else {
    echo "No se encontraron usuarios.";
}

$conn->close();
?>
