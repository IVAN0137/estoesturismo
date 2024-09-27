<?php
// Configuración de la conexión a la base de datos
$host = "sql210.infinityfree.com";
$dbUsername = "	if0_37315282"; // Cambia esto por tu usuario de MySQL
$dbPassword = "MAGI020601"; // Cambia esto por tu contraseña de MySQL
$dbName = "login_system";

// Crear conexión
$conn = new mysqli($host, $dbUsername, $dbPassword, $dbName);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error en la conexión: " . $conn->connect_error);
}

// Procesar formulario de registro
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Verificar si el usuario ya existe
    $sql = "SELECT id FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    
    if ($stmt->num_rows > 0) {
        echo "Este nombre de usuario ya existe.";
    } else {
        // Encriptar la contraseña con password_hash()
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Insertar nuevo usuario con sentencia preparada
        $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ss", $username, $hashedPassword);
        
        if ($stmt->execute()) {
            // Redirigir al login una vez registrado
            header("Location: login.html");
            exit(); // Es importante salir después de header() para evitar que se ejecute más código
        } else {
            echo "Error al registrar el usuario.";
        }
    }
    $stmt->close();
}

$conn->close();
?>