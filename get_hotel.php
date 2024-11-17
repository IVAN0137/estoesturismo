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

// Validar si se recibió un ID
if (isset($_GET["id"]) && is_numeric($_GET["id"])) {
    $id = intval($_GET["id"]); // Convertir el ID a un número entero para mayor seguridad

    // Consultar el hotel con el ID proporcionado
    $sql = "SELECT * FROM hotel WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id); // Evitar inyecciones SQL
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode($result->fetch_assoc());
    } else {
        echo json_encode(["success" => false, "message" => "Hotel no encontrado"]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "ID no válido o no proporcionado"]);
}

$conn->close();
?>
