<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "hotel";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT * FROM hotel";
$result = $conn->query($sql);

$hotel = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $hotel[] = $row;
    }
}

echo json_encode(['hotel' => $hotel]);

$conn->close();
?>
