<?php
$servername = "sql210.infinityfree.com";
$username = "if0_37315282";
$password = "MAGI020601"; 
$dbname = "if0_37315282_hoteles";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    
    $sql = "DELETE FROM hotel WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $conn->error]);
    }
}

$conn->close();
?>