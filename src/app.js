// src/app.js

// Sélection des éléments HTML (garde ça comme c'est)
const contactTable = document.getElementById('contactTable')?.getElementsByTagName('tbody')[0];
const contactForm = document.getElementById('contactForm');
const contactIdInput = document.getElementById('contactId');
const nameInput = document.getElementById('name');
const firstNameInput = document.getElementById('firstName');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');

let contacts = [];

// Fonction de validation des contacts
function validateContact(contact) {
    if (!contact || typeof contact !== 'object') return false;

    // Vérification des champs requis (nom, prenom, téléphone, email)
    if (!contact.nom || !contact.prenom || !contact.telephone || !contact.email) return false;

    // Vérification de la validité de l'email
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(contact.email);
}

// Charger les contacts depuis contacts.json
async function loadContacts() {
    try {
        const response = await fetch('contacts.json');
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! Statut: ${response.status}`);
        }
        contacts = await response.json();
    } catch (error) {
        contacts = []; // Remettre contacts à un tableau vide en cas d'échec
        console.error("Erreur lors du chargement des contacts:", error);
    }
    renderContacts();
}

// Fonction pour sauvegarder les contacts dans contacts.json
async function saveContacts() {
    try {
        const response = await fetch('contacts.json', {
            method: 'PUT', // Utilisez PUT pour remplacer le fichier entier
            headers: { 'Content-Type': 'application/json' },
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
    if (!contactTable) return;

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

// Ajouter un contact
function addContact(event) {
    event?.preventDefault();

    if (!contactForm?.checkValidity()) {
        alert("Veuillez remplir tous les champs obligatoires avec des données valides.");
        return;
    }

    const id = contactIdInput?.value ? parseInt(contactIdInput.value) : Date.now();
    const newContact = {
        id,
        nom: nameInput?.value,
        prenom: firstNameInput?.value,
        telephone: phoneInput?.value,
        email: emailInput?.value
    };

    if (!validateContact(newContact)) {  // Validation ici
        alert("Veuillez fournir des informations de contact valides.");
        return;
    }

    if (contactIdInput?.value) {
        const index = contacts.findIndex(c => c.id === newContact.id);
        if (index !== -1) {
            contacts[index] = newContact;
        }
        contactIdInput.value = '';
    } else {
        contacts.push(newContact);
    }

    saveContacts();
    renderContacts();
    contactForm?.reset();
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

// Ajouter un écouteur d'événement seulement si le formulaire existe
if (contactForm) {
    contactForm.addEventListener('submit', addContact);
}

// Charger les contacts seulement si on est dans un navigateur
if (typeof window !== 'undefined') {
    loadContacts();
}

// Exporter les fonctions pour les tests
module.exports = { validateContact };

