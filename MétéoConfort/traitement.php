<!-- traitement.php -->
<!-- récapitulatif/confirmation de l'inscription au site + traitement des données du formulaire de renseignement -->

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenue !</title>
    <link rel="stylesheet" href="traitement.css">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Tomorrow&display=swap" rel="stylesheet">
</head>
<body>
    <header>
        <h1>Merci d'avoir rejoint MétéoConfort</h1><br>
		<a href="index.html">Retour à l'accueil</a>
    </header>
    <main>
		<!-- Traitement et affichage des données en PHP -->
        <?php
        if ($_SERVER["REQUEST_METHOD"] == "POST") { // Assure d'avoir bien reçu les informations en confirmant la méthode POST lors de l'envoi du formulaire
            // stocker chaques données dans des variables personnalisées de type chaînes de caractère
			$civilite = htmlspecialchars($_POST['civilite']); 
            $nom = htmlspecialchars($_POST['nom']);
            $prenom = htmlspecialchars($_POST['prenom']);
            $naissance = htmlspecialchars($_POST['naissance']);
            $ville = htmlspecialchars($_POST['ville']);
            $codepostal = htmlspecialchars($_POST['codepostal']);
            $email = htmlspecialchars($_POST['email']);
            $bonus = htmlspecialchars($_POST['bonus']);
			
			// Affichage des données en récapitulatif sous forme de tableau
            echo "<table>";
            echo "<tr><td>Civilité</td><td>$civilite</td></tr>";
            echo "<tr><td>Nom</td><td>$nom</td></tr>";
            echo "<tr><td>Prénom</td><td>$prenom</td></tr>";
            echo "<tr><td>Date de naissance</td><td>$naissance</td></tr>";
            echo "<tr><td>Ville</td><td>$ville</td></tr>";
            echo "<tr><td>Code Postal</td><td>$codepostal</td></tr>";
            echo "<tr><td>Email</td><td>$email</td></tr>";
            echo "</table>";
			
			// Affichage d'un texte bonus en fonction de si l'utilisateur a répondu oui ou non dans le formulaire à la question bonus
            echo "<p>$bonus</p>";
        } else {
            echo "<p>Aucune donnée reçue.</p>"; //Alerte si on accède à cette page sans être passé par la page d'inscription
        }
        ?>
		<!-- Fin du traitement et de l'affichage des données en PHP -->
    </main>
    <footer>
        &copy; <strong>2025 MétéoConfort - Ilan MANZARI, Hugo OVAL - Tous droits réservés<strong>
    </footer>
</body>
</html>