<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "hotel";

try {
    // Conexión a la base de datos
    $conn = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Consulta a la base de datos
    $sql = "SELECT * FROM hotel";
    $stmt = $conn->prepare($sql);
    $stmt->execute();

    // Obtención de resultados como un array asociativo
    $hotel = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Enviar respuesta en formato JSON
    header('Content-Type: application/json');
    echo json_encode(['hotel' => $hotel]);

} catch (PDOException $e) {
    // Manejo de errores
    header('Content-Type: application/json');
    echo json_encode(['status' => 'error', 'message' => 'Error de conexión: ' . $e->getMessage()]);
    exit();
}
?>
