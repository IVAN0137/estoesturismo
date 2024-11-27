<?php
$servername = "sql210.infinityfree.com";
$username = "if0_37315282";
$password = "MAGI020601"; 
$dbname = "if0_37315282_hoteles";

$conn = new mysqli($servername, $username, $password, $dbname);

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
