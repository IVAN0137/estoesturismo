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

// Verificar si el parámetro ID está presente y es válido
if (isset($_GET["id"]) && is_numeric($_GET["id"])) {
    $id = intval($_GET["id"]); // Convertir el ID a entero para evitar inyecciones SQL

    // Preparar la consulta para eliminar el hotel
    $sql = "DELETE FROM hotel WHERE id = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("i", $id); // Asociar el parámetro ID
        if ($stmt->execute()) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false, "error" => "Error al ejecutar la consulta"]);
        }
        $stmt->close();
    } else {
        echo json_encode(["success" => false, "error" => "Error al preparar la consulta"]);
    }
} else {
    echo json_encode(["success" => false, "error" => "ID no válido o no proporcionado"]);
}

$conn->close();
?>
