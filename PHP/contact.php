<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact</title>
</head>
<body>
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Vérification des champs requis
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $company = isset($_POST['company']) ? trim($_POST['company']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    if (!empty($name) && !empty($email) && !empty($message)) {
        // Destinataire de l'email
        $to = 'giletamel@gmail.com';  

        // Sujet de l'email
        $subject = 'Nouveau message de contact';

        // Corps de l'email
        $body = "Nom: $name\n";
        $body .= "Email: $email\n";
        $body .= "Entreprise: $company\n";
        $body .= "Message:\n$message\n";

        // Entêtes de l'email
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        // Envoi de l'email
        if (mail($to, $subject, $body, $headers)) {
            echo "<p>Merci pour votre message ! Il a été envoyé avec succès.</p>";
        } else {
            echo "<p>Une erreur est survenue. Veuillez réessayer plus tard.</p>";
        }
    } else {
        echo "<p>Tous les champs requis doivent être remplis.</p>";
    }
}
?>
</body>
</html>