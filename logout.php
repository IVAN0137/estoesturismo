<?php
session_start(); // Inicia la sesión

// Elimina todas las variables de sesión
session_unset();

// Destruye la sesión
session_destroy();

// Redirige al usuario a la página principal o de inicio de sesión
header("Location: index.html");
exit(); // Asegúrate de detener la ejecución del script
?>
