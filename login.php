<?php
session_start();
$servername = "sql210.infinityfree.com";
$username = "if0_37315282";
$password = "MAGI020601";
$dbname = "if0_37315282_login_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT id FROM users WHERE username='$username' AND password='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $_SESSION['username'] = $username;
        header("Location: contactanos.html");
    } else {
        echo "Invalid username or password";
    }
}

$conn->close();
?>
