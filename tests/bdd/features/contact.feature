Fonctionnalité: Gestion des Contacts

            Scénario: Ajouter un nouveau contact
                Étant donné que je suis sur la page de gestion des contacts
                Quand je remplis le formulaire avec des données valides
                Et que je clique sur "Ajouter"
                Alors je vois le nouveau contact dans la liste

            Scénario: Supprimer un contact existant
                Étant donné que j'ai un contact dans la liste
                Quand je clique sur "Supprimer" pour ce contact
                Alors je suis invité à confirmer la suppression
                Et je confirme la suppression
                Alors le contact est supprimé de la liste
