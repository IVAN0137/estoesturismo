<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hotel";

$conn = new mysqli($servername, $username,$password,$dbname);

if ($conn->connect_error) {
    die("Conexion fallida: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $id = $_POST["id"];
    $nombre = $_POST["nombre"];
    $colonia = $_POST["colonia"];
    $municipio = $_POST["municipio"];
    $telefono = $_POST["telefono"];
    $correo = $_POST["correo"];
    $descripcion =$_POST["descripcion"];

    // Si se subió una nueva foto
    if ($_FILES["foto"]["name"]) {
        $foto = $_FILES["foto"]["name"];
        $target_dir = "uploads/";
        $starget_file = $starget_dir . basename($foto);
        move_uploaded_file($_FILES["foto"]["tmp_name"], $starget_file);

        $sql = "UPDATE hotel SET nombre='$nombre', colonia='$colonia', municipio='$municipio', telefono='$telefono', correo='$correo', descripcion='$descripcion', foto='$foto' WHERE id =$id";
    } else {
        $sql = "UPDATE hotel SET nombre='$nombre', colonia='$colonia', municipio='$municipio', telefono='$telefono', correo='$correo', descripcion='$descripcion' WHERE id =$id";
    }

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $conn -> error]);
    }
}

$conn->close();
?>