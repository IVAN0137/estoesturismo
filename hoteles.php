<?php
header('Content-Type: application/json');

$host = "localhost";
$user = "root";
$pass = "";
$db = "hotel";

// Crear conexión
$conn = new mysqli($host, $user, $pass, $db);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Error en la conexión a la base de datos"]));
}

// Verificar la acción solicitada
$action = $_GET['action'] ?? '';

switch ($action) {
    case 'get':
        getHotels($conn);
        break;
    case 'getById':
        getHotelById($conn);
        break;
    case 'add':
        addHotel($conn);
        break;
    case 'edit':
        editHotel($conn);
        break;
    case 'delete':
        deleteHotel($conn);
        break;
    default:
        echo json_encode(["success" => false, "message" => "Acción no válida"]);
}

// Cerrar conexión
$conn->close();

function getHotels($conn)
{
    $result = $conn->query("SELECT * FROM hoteles");
    $hotels = [];
    while ($row = $result->fetch_assoc()) {
        $hotels[] = $row;
    }
    echo json_encode($hotels);
}

function getHotelById($conn)
{
    $id = $_GET['id'] ?? '';
    if (!$id) {
        echo json_encode(["success" => false, "message" => "ID no proporcionado"]);
        return;
    }

    $stmt = $conn->prepare("SELECT * FROM hoteles WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $hotel = $result->fetch_assoc();
    echo json_encode($hotel);
}

function addHotel($conn)
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode(["success" => false, "message" => "Método no permitido"]);
        return;
    }

    $nombre = $_POST['nombre'] ?? '';
    $colonia = $_POST['colonia'] ?? '';
    $municipio = $_POST['municipio'] ?? '';
    $telefono = $_POST['telefono'] ?? '';
    $correo = $_POST['correo'] ?? '';
    $descripcion = $_POST['descripcion'] ?? '';

    if (isset($_FILES['foto']) && $_FILES['foto']['error'] === UPLOAD_ERR_OK) {
        $fotoTmp = $_FILES['foto']['tmp_name'];
        $fotoName = uniqid() . "_" . $_FILES['foto']['name'];
        $fotoPath = "uploads/" . $fotoName;

        if (!move_uploaded_file($fotoTmp, $fotoPath)) {
            echo json_encode(["success" => false, "message" => "Error al subir la foto"]);
            return;
        }
    } else {
        echo json_encode(["success" => false, "message" => "Foto no proporcionada"]);
        return;
    }

    $stmt = $conn->prepare("INSERT INTO hotel (nombre, colonia, municipio, telefono, correo, descripcion, foto) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssss", $nombre, $colonia, $municipio, $telefono, $correo, $descripcion, $fotoName);
    $stmt->execute();

    echo json_encode(["success" => true, "message" => "Hotel agregado con éxito"]);
}

function editHotel($conn)
{
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode(["success" => false, "message" => "Método no permitido"]);
        return;
    }

    $id = $_POST['id'] ?? '';
    $nombre = $_POST['nombre'] ?? '';
    $colonia = $_POST['colonia'] ?? '';
    $municipio = $_POST['municipio'] ?? '';
    $telefono = $_POST['telefono'] ?? '';
    $correo = $_POST['correo'] ?? '';
    $descripcion = $_POST['descripcion'] ?? '';
    $fotoName = null;

    if (isset($_FILES['foto']) && $_FILES['foto']['error'] === UPLOAD_ERR_OK) {
        $fotoTmp = $_FILES['foto']['tmp_name'];
        $fotoName = uniqid() . "_" . $_FILES['foto']['name'];
        $fotoPath = "uploads/" . $fotoName;

        if (!move_uploaded_file($fotoTmp, $fotoPath)) {
            echo json_encode(["success" => false, "message" => "Error al subir la foto"]);
            return;
        }
    }

    if ($fotoName) {
        $stmt = $conn->prepare("UPDATE hotel SET nombre = ?, colonia = ?, municipio = ?, telefono = ?, correo = ?, descripcion = ?, foto = ? WHERE id = ?");
        $stmt->bind_param("sssssssi", $nombre, $colonia, $municipio, $telefono, $correo, $descripcion, $fotoName, $id);
    } else {
        $stmt = $conn->prepare("UPDATE hotel SET nombre = ?, colonia = ?, municipio = ?, telefono = ?, correo = ?, descripcion = ? WHERE id = ?");
        $stmt->bind_param("ssssssi", $nombre, $colonia, $municipio, $telefono, $correo, $descripcion, $id);
    }

    $stmt->execute();
    echo json_encode(["success" => true, "message" => "Hotel editado con éxito"]);
}

function deleteHotel($conn)
{
    $id = $_GET['id'] ?? '';
    if (!$id) {
        echo json_encode(["success" => false, "message" => "ID no proporcionado"]);
        return;
    }

    $stmt = $conn->prepare("DELETE FROM hotel WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    echo json_encode(["success" => true, "message" => "Hotel eliminado con éxito"]);
}
?>
