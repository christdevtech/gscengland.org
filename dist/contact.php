<?php


if ($_SERVER['REQUEST_METHOD'] === 'POST') {
     header("Access-Control-Allow-Origin: https://gscengland.org"); // Adjust the origin as needed
    header("Access-Control-Allow-Credentials: true");
    // Get the JSON data from the request body
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);

    // Extract form data
    $title = $data['title'];
    $fname = $data['fname'];
    $lname = $data['lname'];
    $phone = $data['phone'];
    $email = $data['email'];
    $message = $data['message'];

  $to = 'test@gscengland.org,admin@gscengland.org'; // Change to your recipient email address
  $subject = "New Contact Form Submission from $fname $lname on $title";
  
  // Create an HTML table to format the form data
  $messageBody = "
    <html>
      <head>
        <title>Contact Form Submission</title>
        <style>
        table {
  border-collapse: collapse;
  width: 100%;
  border: 1px solid black;
}

tr, td {
  padding: 5px;
  text-align: left;
  border:1px solid #cccccc
}

th {
  background-color: #f0f0f0;
}

h2, h3{
    text-align:left;
}
p{
    text-align:justify;
}
        </style>
      </head>
      <body>
        <h2>Contact Form Submission from $fname $lname on $title</h2>
        <table >
          <tr><td>First Name:</td><td>$fname</td></tr>
          <tr><td>Last Name:</td><td>$lname</td></tr>
          <tr><td>Phone:</td><td>$phone</td></tr>
          <tr><td>Email:</td><td>$email</td></tr>
        </table>
        <h3>Message:</h3>
        <p>$message</p>
      </body>
    </html>
  ";

  $headers = "From: $email\r\n";
  $headers .= "Reply-To: $email\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=utf-8\r\n";

  if (mail($to, $subject, $messageBody, $headers)) {
    http_response_code(200);
    echo 'Email sent successfully.';
  } else {
    http_response_code(500);
    echo 'Email sending failed.';
  }
} else {
  http_response_code(400);
  echo 'Bad request.';
}
?>