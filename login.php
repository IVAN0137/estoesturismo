<?php
// Configuración de la conexión a la base de datos
$host = "sql210.infinityfree.com";
$dbUsername = "if0_37315282"; // Cambia esto por tu usuario de MySQL
$dbPassword = "MAGI020601"; // Cambia esto por tu contraseña de MySQL
$dbName = "login_system";

// Crear conexión
$conn = new mysqli($host, $dbUsername, $dbPassword, $dbName);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error en la conexión: " . $conn->connect_error);
}

// Procesar formulario de inicio de sesión
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Consultar usuario en la base de datos
    $sql = "SELECT id, password FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    
    // Verificar si el usuario existe
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $hashedPassword);
        $stmt->fetch();
        
        // Verificar la contraseña con password_verify()
        if (password_verify($password, $hashedPassword)) {
            echo "Inicio de sesión exitoso. ¡Bienvenido, $username!";
            // Aquí podrías iniciar una sesión o redirigir a otra página
            session_start();
            $_SESSION['username'] = $username;
            header("Location: contactanos.html"); // Cambia 'dashboard.php' a la página deseada
            exit();
        } else {
            echo "Contraseña incorrecta.";
        }
    } else {
        echo "Usuario no encontrado.";
    }
    $stmt->close();
}

$conn->close();
?>
