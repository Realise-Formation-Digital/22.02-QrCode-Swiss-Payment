# Journal des modifications
- --
# [Version 1.0.2] - 19.09.2022
## Fixé
- champ "Rue" suppression des règles de typage d'écritures qui empêchaient les accents et les nombres.
- Various Bugfix
## Ajouté
- Ajout dot.env.
- Ajout page changelog.
- Ecriture des versions dans le changelog.

## Modifié
- Modifié FooTer par FooterBar.

- --
# [Version 1.0.1]
## Fixé
- Correction du délai de confirmation qui ne fonctionnait qu'une fois sur deux.
- Correction de bugs dans le code.

## Ajouté
- Animation sur le compte à rebours du délai confirmer.
- Commentaires supplémentaires du code.
- Explicatifs sur les conditions de remplissages de champs. (formulaire)
- commentaires supplémentaires.

## Modifié
- Affichage du nombre restant pour les caractères dans les champs avec impossibilté de dépassement. (formulaire)
- Amélioration des textes "information" pour une meilleure compréhension.
- --
# [Version 1.0.0]
## Ajouté
- Création du prototype de page de formulaire.
- Modal de validation avec bouton de confirmation et de retour.
- Ajout d'un délai pour la validation sur le bouton de confirmation. (modal)
- Création du prototype de page d'importation de CSV.
- Conversion automatique des fichiers CSV en JSON.
- Connections à l'API. (adresse, clé et options de l'API)
- Correction automatique du Séparateur de décimal. (CSV)
- Retrait automatique du 0 précédant le premier chiffre. (ex: "0"120)
- Création de fenêtres d'état lors d'envoi de formulaire. ("en attente de réception", "succès" et "echec")
- Création de la navbar et du footer.
- Création des boutons de navigations dans le footer et dans la fenêtre "home".
- Commentaires du code.
- télechargement personalisé du fichier pdf. (QR)

## Modifié
- Adaptation des champs du formulaire par rapport à l'API.
- Forcé le typage pour les champs "montant" et "rue".
- Amélioré le format du modal de confirmation pour une meilleure visibilté.
- champs "Pays" devenu une liste à choix.
- Modifié le format de date du télechargement pdf. (QR)