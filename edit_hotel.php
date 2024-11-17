<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hotel";

// Conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Obtener los valores del formulario
    $id = intval($_POST["id"]); // Convertir a entero para mayor seguridad
    $nombre = $conn->real_escape_string($_POST["nombre"]);
    $colonia = $conn->real_escape_string($_POST["colonia"]);
    $municipio = $conn->real_escape_string($_POST["municipio"]);
    $telefono = $conn->real_escape_string($_POST["telefono"]);
    $correo = $conn->real_escape_string($_POST["correo"]);
    $descripcion = $conn->real_escape_string($_POST["descripcion"]);

    $sql = "";

    // Verificar si se subió una nueva foto
    if (isset($_FILES["foto"]["name"]) && $_FILES["foto"]["name"] !== "") {
        $foto = $_FILES["foto"]["name"];
        $target_dir = "uploads/";
        $target_file = $target_dir . basename($foto);

        // Mover la imagen subida al directorio de destino
        if (move_uploaded_file($_FILES["foto"]["tmp_name"], $target_file)) {
            $sql = "UPDATE hotel 
                    SET nombre='$nombre', colonia='$colonia', municipio='$municipio', telefono='$telefono', 
                        correo='$correo', descripcion='$descripcion', foto='$foto' 
                    WHERE id = $id";
        } else {
            echo json_encode(["success" => false, "error" => "Error al subir la imagen"]);
            $conn->close();
            exit;
        }
    } else {
        $sql = "UPDATE hotel 
                SET nombre='$nombre', colonia='$colonia', municipio='$municipio', telefono='$telefono', 
                    correo='$correo', descripcion='$descripcion' 
                WHERE id = $id";
    }

    // Ejecutar la consulta SQL
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $conn->error]);
    }
}

$conn->close();
?>
