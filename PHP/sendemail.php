<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email</title>
</head>
<body>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $from = $_POST['from'];
    $to = $_POST['to'];
    $cc = $_POST['cc'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Headers
    $headers = "From: " . $from . "\r\n";
    if (!empty($cc)) {
        $headers .= "Cc: " . $cc . "\r\n";
    }
    $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n"; // Pour permettre l'envoi de contenu HTML

    // Envoi de l'email
    if (mail($to, $subject, $message, $headers)) {
        echo "Votre message a été envoyé avec succès.";
    } else {
        echo "L'envoi du message a échoué.";
    }
}
?>

</body>
</html>