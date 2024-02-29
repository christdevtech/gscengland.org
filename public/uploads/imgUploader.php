<?php


if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file']) && isset($_POST['filename'])) {
    $file = $_FILES['file'];
    $filename = $_POST['filename'];
    
    // Ensure that the 'uploads' directory exists in the document root.
    $uploadDirectory = $_SERVER['DOCUMENT_ROOT'] . "/uploads/";
    // Ensure that the file is an image (JPEG, JPG, PNG, GIF).
    $allowedExtensions = ['jpeg', 'jpg', 'png', 'gif'];
    $fileExtension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    
    if (in_array($fileExtension, $allowedExtensions)) {
        // Generate the new filename based on the selected month and year.
        $newFilename = "Image-$filename.$fileExtension";
        $targetPath = $uploadDirectory . $newFilename;

        // Move the uploaded file to the target location.
        if (move_uploaded_file($file['tmp_name'], $targetPath)) {
            echo "https://gscengland.org/uploads/".$newFilename;
        } else {
            http_response_code(500); // Internal Server Error
            echo 'Failed to move the uploaded file.';
        }
    } else {
        http_response_code(400); // Bad Request
        echo 'Invalid file format. Only JPEG, JPG, PNG, and GIF images are allowed.';
    }
} else {
    http_response_code(400); // Bad Request
    echo 'Invalid request.';
}
?>