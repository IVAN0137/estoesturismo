<?php
// mostrar_reseñas.php

$host = 'localhost';
$db = 'turismo';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT * FROM publicaciones ORDER BY fecha_creacion DESC";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo '<div class="reseña">';
        echo '<h3>' . $row['titulo'] . '</h3>';
        echo '<p>' . $row['descripcion'] . '</p>';
        if ($row['ruta_imagen']) {
            echo '<img src="' . $row['ruta_imagen'] . '" alt="Imagen de la reseña">';
        }
        echo '<small>Publicado el ' . $row['fecha_creacion'] . '</small>';
        echo '</div>';
    }
} else {
    echo "No hay reseñas aún.";
}

$conn->close();
?>
