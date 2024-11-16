<?php

// Datos de conexión a la base de datos proporcionados por InfinityFree
$host = 'sql210.infinityfree.com'; // Servidor MySQL
$user = 'if0_37315282';           // Usuario de la base de datos
$pass = 'MAGI020601';             // Contraseña de la base de datos
$db = 'if0_37315282_foro_fotos';  // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($host, $user, $pass, $db);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Establecer el conjunto de caracteres de la conexión para manejar caracteres especiales
$conn->set_charset("utf8mb4");

// Subida de foto
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nombre_fotografo = $conn->real_escape_string($_POST['nombre_fotografo']);
    $reseña = $conn->real_escape_string($_POST['reseña']);
    $lugar = $conn->real_escape_string($_POST['lugar']);
    $fecha = $conn->real_escape_string($_POST['fecha']);

    // Subir archivo
    $target_dir = "uploads/";
    $target_file = $target_dir . basename($_FILES["foto"]["name"]);
    
    if (move_uploaded_file($_FILES["foto"]["tmp_name"], $target_file)) {
        // Insertar en la base de datos
        $sql = "INSERT INTO publicaciones (nombre_fotografo, foto, reseña, lugar, fecha) 
                VALUES ('$nombre_fotografo', '$target_file', '$reseña', '$lugar', '$fecha')";

        if ($conn->query($sql) === TRUE) {
            echo "<p>La publicación se ha subido correctamente.</p>";
        } else {
            echo "<p>Error: " . $sql . "<br>" . $conn->error . "</p>";
        }
    } else {
        echo "<p>Error al subir la foto.</p>";
    }
}

$sql = "SELECT * FROM publicaciones ORDER BY fecha DESC"; // Aquí es donde cambia el orden
$result = $conn->query($sql);


?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Foro de Fotos</title>
    <link rel="stylesheet" href="css/foro.css">
</head>
<body>
    <h1>Publicaciones de Fotos</h1>

    <!-- Formulario para subir foto -->
    <section>
        <h2>Sube tu Foto y Reseña</h2>
        <form action="foro.php" method="POST" enctype="multipart/form-data">
            <label for="nombre_fotografo">Nombre del fotógrafo:</label>
            <input type="text" id="nombre_fotografo" name="nombre_fotografo" required>

            <label for="foto">Selecciona la foto:</label>
            <input type="file" id="foto" name="foto" accept="image/*" required>

            <label for="reseña">Reseña:</label>
            <textarea id="reseña" name="reseña" rows="4" required></textarea>

            <label for="lugar">Lugar:</label>
            <input type="text" id="lugar" name="lugar" required>

            <label for="fecha">Fecha:</label>
            <input type="date" id="fecha" name="fecha" required>

            <button type="submit">Subir</button>
        </form>
    </section>

    <hr>

    <!-- Mostrar publicaciones -->
    <section>
        <h2>Publicaciones</h2>

        <?php
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                echo "<div class='post'>";
                echo "<h3>" . $row["nombre_fotografo"] . "</h3>";
                echo "<img src='" . $row["foto"] . "' alt='Foto' style='max-width: 100%;'>";
                echo "<p>" . $row["reseña"] . "</p>";
                echo "<p><strong>Lugar:</strong> " . $row["lugar"] . "</p>";
                echo "<p><strong>Fecha:</strong> " . $row["fecha"] . "</p>";
                echo "</div>";
            }
        } else {
            echo "<p>No hay publicaciones aún.</p>";
        }
        ?>
    </section>

    <script>
        // Función para llenar la fecha del sistema en el campo correspondiente
        function llenarFecha() {
            var fechaHoy = new Date().toISOString().split('T')[0]; // Fecha en formato YYYY-MM-DD
            document.getElementById('fecha').value = fechaHoy;
        }

        // Ejecutar la función cuando la página se cargue
        window.onload = function() {
            llenarFecha(); // Llenar la fecha automáticamente
        };
    </script>

</body>
</html>

<?php
$conn->close();
?>
