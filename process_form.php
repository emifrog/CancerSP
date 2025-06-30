<?php
// Configuration
$recipient_email = "contact@cancer-pompiers.info"; // Remplacez par votre adresse email réelle
$email_subject = "Nouveau message du formulaire de contact";

// Sécurité: Vérifier si le formulaire a été soumis
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Récupérer et nettoyer les données du formulaire
    $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
    $firstname = filter_input(INPUT_POST, 'firstname', FILTER_SANITIZE_STRING);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_STRING);
    $profile = filter_input(INPUT_POST, 'profile', FILTER_SANITIZE_STRING);
    $subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_STRING);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);
    $newsletter = isset($_POST['newsletter']) ? "Oui" : "Non";
    
    // Validation des champs obligatoires
    $errors = [];
    
    if (empty($name)) {
        $errors[] = "Le nom est requis";
    }
    
    if (empty($firstname)) {
        $errors[] = "Le prénom est requis";
    }
    
    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "Une adresse email valide est requise";
    }
    
    if (empty($profile)) {
        $errors[] = "Le profil est requis";
    }
    
    if (empty($subject)) {
        $errors[] = "Le sujet est requis";
    }
    
    if (empty($message)) {
        $errors[] = "Le message est requis";
    }
    
    // Si pas d'erreurs, envoyer l'email
    if (empty($errors)) {
        
        // Construire le corps de l'email
        $email_content = "Nouveau message du formulaire de contact\n\n";
        $email_content .= "Nom: $name\n";
        $email_content .= "Prénom: $firstname\n";
        $email_content .= "Email: $email\n";
        $email_content .= "Téléphone: $phone\n";
        $email_content .= "Profil: $profile\n";
        $email_content .= "Sujet: $subject\n";
        $email_content .= "Message:\n$message\n";
        $email_content .= "Inscription newsletter: $newsletter\n";
        
        // En-têtes de l'email
        $email_headers = "From: $name $firstname <$email>";
        
        // Envoyer l'email
        if (mail($recipient_email, $email_subject, $email_content, $email_headers)) {
            $response = [
                'status' => 'success',
                'message' => 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.'
            ];
        } else {
            $response = [
                'status' => 'error',
                'message' => 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer plus tard.'
            ];
        }
    } else {
        $response = [
            'status' => 'error',
            'message' => 'Veuillez corriger les erreurs suivantes:',
            'errors' => $errors
        ];
    }
    
    // Retourner la réponse en JSON
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

// Si quelqu'un accède directement à ce fichier sans soumettre le formulaire
header("Location: pages/contact.html");
exit;
?>
