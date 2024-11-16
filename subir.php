<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);


// Datos de conexión
$host = 'sql210.infinityfree.com';
$dbName = 'if0_37315282_turismo';
$dbUsername = 'if0_37315282';
$dbPassword = 'MAGI020601';

// Crear la conexión
$conn = new mysqli($host, $dbUsername, $dbPassword, $dbName);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Verificar si es una solicitud POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Sanear los datos del formulario
    $titulo = $conn->real_escape_string($_POST['titulo']);
    $descripcion = $conn->real_escape_string($_POST['descripcion']);
    $imagen = $_FILES['imagen'];

    // Verificar si el archivo fue subido correctamente
    if ($imagen['error'] === UPLOAD_ERR_OK) {
        // Crear una ruta para la imagen
        $ruta_imagen = 'imagenes/' . basename($imagen['name']);

        // Mover el archivo al directorio de imágenes
        if (move_uploaded_file($imagen['tmp_name'], $ruta_imagen)) {
            // Preparar la consulta SQL usando sentencias preparadas para evitar inyección SQL
            $sql = "INSERT INTO publicaciones (id_usuario, titulo, descripcion, ruta_imagen) 
                    VALUES (?, ?, ?, ?)";

            // Preparar la sentencia
            $stmt = $conn->prepare($sql);

            if ($stmt === false) {
                die("Error al preparar la consulta: " . $conn->error);
            }

            // Vincular los parámetros y ejecutar la sentencia
            $id_usuario = 1; // Asumimos que el id_usuario es 1, puedes cambiarlo según sea necesario
            $stmt->bind_param("isss", $id_usuario, $titulo, $descripcion, $ruta_imagen);

            // Ejecutar la consulta
            if ($stmt->execute()) {
                // Redirigir con éxito
                header('Location: index.html?exito=1');
                exit();
            } else {
                // Mostrar error si la inserción falla
                echo "Error: " . $stmt->error;
            }

            // Cerrar la sentencia
            $stmt->close();
        } else {
            echo "Error al mover el archivo de imagen.";
        }
    } else {
        echo "Error al subir la imagen: " . $imagen['error'];
    }
}

// Cerrar la conexión
$conn->close();
?>
