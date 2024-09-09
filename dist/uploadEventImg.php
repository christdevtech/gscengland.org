<?php
header("Access-Control-Allow-Origin: *"); // Allow requests from any origin (replace * with specific origins if needed)
header("Access-Control-Allow-Methods: POST"); // Allow POST requests (you can adjust this based on your requirements)
header("Access-Control-Allow-Headers: Content-Type"); // Allow the Content-Type header

$today = isset($_POST['today']) ? $_POST['today'] : ''; // Check if today is provided in the POST data

if ($today === '') {
    http_response_code(400); // Bad Request
    echo json_encode(['success' => false, 'message' => 'the Day is required'.$today]);
    exit;
}

$uploadDirectory = 'event-images/' . $today . '/'; // Directory to store uploaded images with the string value

if (!file_exists($uploadDirectory)) {
    mkdir($uploadDirectory, 0777, true); // Create the directory if it doesn't exist
}

$uploadedUrls = [];

foreach ($_FILES as $file) {
    $fileName = str_replace(' ', '-', basename($file['name'])); //remove spaces in the name

    $targetPath = $uploadDirectory . $fileName;

    if (move_uploaded_file($file['tmp_name'], $targetPath)) {
        // Construct the URL to the uploaded image
        $imageUrl = 'https://gscengland.org/' . $targetPath;
        $uploadedUrls[] = $imageUrl;
    } else {
        http_response_code(500); // Internal Server Error
        echo json_encode(['success' => false, 'message' => 'Failed to move uploaded file']);
        exit;
    }
}

echo json_encode(['success' => true, 'urls' => $uploadedUrls]);
?>