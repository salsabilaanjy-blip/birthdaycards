<?php

header("Content-Type: application/json; charset=utf-8");

require "config.php";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Metode tidak valid."
    ]);
    exit;
}

$name = trim($_POST["name"] ?? "");
$whatsapp = trim($_POST["whatsapp"] ?? "");
$attendance = trim($_POST["attendance"] ?? "");
$wish = trim($_POST["wish"] ?? "");

if ($name === "" || $whatsapp === "" || $attendance === "") {
    echo json_encode([
        "success" => false,
        "message" => "Lengkapi data wajib."
    ]);
    exit;
}

$stmt = $conn->prepare(
    "INSERT INTO guests (name, whatsapp, attendance, wish)
     VALUES (?, ?, ?, ?)"
);

$stmt->bind_param("ssss", $name, $whatsapp, $attendance, $wish);

if ($stmt->execute()) {
    echo json_encode([
        "success" => true,
        "message" => "Konfirmasi berhasil tersimpan ♡"
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Gagal menyimpan: " . $stmt->error
    ]);
}

$stmt->close();
$conn->close();

?>