<?php
$servername = "sql210.infinityfree.com";
$username = "if0_37315282";
$password = "MAGI020601"; 
$dbname = "if0_37315282_hoteles";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$id = $_GET['id'];
$sql = "SELECT * FROM hotel WHERE id = $id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode(['success' => false]);
}

$conn->close();
?>
