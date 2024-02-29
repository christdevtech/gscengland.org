<?php
// Ensure that the 'uploads' directory exists in the document root.
$uploadDirectory = $_SERVER['DOCUMENT_ROOT'] . "/uploads/";

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file']) && isset($_POST['filename'])) {
    $file = $_FILES['file'];
    $filename = $_POST['filename'];

    // Get the selected month and year from the filename (assuming it's in the format "yyyy-MM").
    $dateParts = explode('-', $filename);
    if (count($dateParts) === 2) {
        $year = $dateParts[0];
        $month = $dateParts[1];

        // Ensure that the file is a PDF.
        if ($file['type'] === 'application/pdf') {
            // Generate the new filename based on the selected month and year.
            $newFilename = "Newsletter-$year-$month.pdf";
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
            echo 'Invalid file format. Only PDF files are allowed.';
        }
    } else {
        http_response_code(400); // Bad Request
        echo 'Invalid filename format.';
    }
} else {
    http_response_code(400); // Bad Request
    echo 'Invalid request.';
}
?>