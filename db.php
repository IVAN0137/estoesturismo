<?php
$servername = "sql210.infinityfree.com";
$username = "if0_37315282";
$password = "MAGI020601";
$dbname = "if0_37315282_guia_turistica";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
