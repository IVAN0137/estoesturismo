<?php
// subir.php

$host = 'sql210.infinityfree.com';
$db = 'if0_37315282_turismo';
$user = 'if0_37315282';
$pass = 'MAGI020601';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $titulo = $conn->real_escape_string($_POST['titulo']);
    $descripcion = $conn->real_escape_string($_POST['descripcion']);
    $imagen = $_FILES['imagen'];

    $ruta_imagen = 'imagenes/' . basename($imagen['name']);
    move_uploaded_file($imagen['tmp_name'], $ruta_imagen);

    $sql = "INSERT INTO publicaciones (id_usuario, titulo, descripcion, ruta_imagen) VALUES (1, '$titulo', '$descripcion', '$ruta_imagen')";
    
    if ($conn->query($sql) === TRUE) {
        header('Location: index.html?exito=1');
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();
}
?>
