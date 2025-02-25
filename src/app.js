const contactTable = document.getElementById('contactTable').getElementsByTagName('tbody')[0];
    const contactForm = document.getElementById('contactForm');
    const contactIdInput = document.getElementById('contactId');
    const nameInput = document.getElementById('name');
    const firstNameInput = document.getElementById('firstName');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');

    let contacts = [];

    // Charger les contacts depuis contacts.json
    async function loadContacts() {
        try {
            const response = await fetch('contacts.json');
            contacts = await response.json();
        } catch (error) {
            contacts = []; // Commencer avec un tableau vide si le fichier n'existe pas ou est invalide
            console.error("Erreur lors du chargement des contacts:", error);
        }
        renderContacts();
    }

    // Fonction pour sauvegarder les contacts dans contacts.json
    async function saveContacts() {
        try {
            const response = await fetch('contacts.json', {
                method: 'PUT', // Ou PATCH selon votre configuration de serveur
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contacts)
            });

            if (!response.ok) {
                throw new Error(`Erreur HTTP ! Statut: ${response.status}`);
            }
        } catch (error) {
            console.error("Erreur lors de la sauvegarde des contacts:", error);
        }
    }

    // Afficher les contacts dans le tableau
    function renderContacts() {
        contactTable.innerHTML = '';
        contacts.forEach(contact => {
            let row = contactTable.insertRow();
            row.insertCell().textContent = contact.nom;
            row.insertCell().textContent = contact.prenom;
            row.insertCell().textContent = contact.telephone;
            row.insertCell().textContent = contact.email;

            let actionsCell = row.insertCell();
            actionsCell.innerHTML = `
                <button onclick="editContact(${contact.id})">Modifier</button>
                <button onclick="deleteContact(${contact.id})">Supprimer</button>
            `;
        });
    }

    // Ajouter un nouveau contact
    function addContact(event) {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            alert("Veuillez remplir tous les champs obligatoires avec des données valides.");
            return;
        }

        const id = contactIdInput.value ? parseInt(contactIdInput.value) : Date.now(); // Génération simple d'ID
        const newContact = {
            id: id,
            nom: nameInput.value,
            prenom: firstNameInput.value,
            telephone: phoneInput.value,
            email: emailInput.value
        };

        if (contactIdInput.value) {
            // Mettre à jour un contact existant
            const index = contacts.findIndex(c => c.id === newContact.id);
            if (index !== -1) {
                contacts[index] = newContact;
            }
            contactIdInput.value = ''; // Effacer l'input hidden
        } else {
            // Ajouter un nouveau contact
            contacts.push(newContact);
        }

        saveContacts();
        renderContacts();
        contactForm.reset();
    }

    // Modifier un contact
    function editContact(id) {
        const contact = contacts.find(c => c.id === id);
        if (contact) {
            contactIdInput.value = contact.id;
            nameInput.value = contact.nom;
            firstNameInput.value = contact.prenom;
            phoneInput.value = contact.telephone;
            emailInput.value = contact.email;
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    // Supprimer un contact
    function deleteContact(id) {
        if (confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
            contacts = contacts.filter(c => c.id !== id);
            saveContacts();
            renderContacts();
        }
    }

    // Écouteurs d'événements
    contactForm.addEventListener('submit', addContact);

    // Chargement initial
    loadContacts();
