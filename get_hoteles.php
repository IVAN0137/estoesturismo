<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hotel";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexion fallida: " . $conn->connect_error);
}

$sql = "SELECT * FROM hotel";
$result = $conn->query($sql);

$hotel = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $guides[] = $row;
    }
}

echo json_encode(["hotel" => $hotel]);

$conn->close();
?>
