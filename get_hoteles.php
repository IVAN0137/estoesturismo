<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hotel";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

$sql = "SELECT * FROM hoteles";
$result = $conn->query($sql);

$hotel = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $hotel[] = $row;
    }
}

echo json_encode(["success" => true, "hotel" => $hotel]);
$conn->close();
?>
