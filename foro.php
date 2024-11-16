<?php


$host = 'sql210.infinityfree.com'; 
$user = 'if0_37315282';         
$pass = 'MAGI020601';      
$db = 'if0_37315282_foro_fotos';

$conn = new mysqli($host, $usuario, $contraseña, $base_de_datos);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Subida de foto
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nombre_fotografo = $_POST['nombre_fotografo'];
    $reseña = $_POST['reseña'];
    $lugar = $_POST['lugar'];
    $fecha = $_POST['fecha'];

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

// Obtener publicaciones
$sql = "SELECT * FROM publicaciones ORDER BY fecha DESC";
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
        <form action="index.php" method="POST" enctype="multipart/form-data">
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

    
</body>
</html>

<?php
$conn->close();
?>
