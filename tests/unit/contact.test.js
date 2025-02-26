// tests/unit/contact.test.js

// Simuler `fetch` pour éviter l'erreur "fetch is not defined"
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true, // Ajoutez cette ligne pour simuler une réponse réussie
        json: () => Promise.resolve([]),
    })
);

// Simuler un DOM avant d'importer `app.js`
document.body.innerHTML = `
    <table id="contactTable"><tbody></tbody></table>
    <form id="contactForm"></form>
    <input id="contactId">
    <input id="name">
    <input id="firstName">
    <input id="phone">
    <input id="email">
`;

// Importer la fonction à tester après avoir simulé le DOM
const { validateContact } = require('../../src/app.js');

// Simuler un environnement DOM si nécessaire
require('@testing-library/jest-dom');

// Début des tests
describe('Validation du Contact', () => {

    it('devrait valider un email valide', () => {
        const contact = {
            nom: 'Test',
            prenom: 'Utilisateur',
            telephone: '123-456-7890',
            email: 'test@example.com'
        };
        expect(validateContact(contact)).toBe(true);
    });

    it('devrait invalider un email invalide', () => {
         const contact = {
            nom: 'Test',
            prenom: 'Utilisateur',
            telephone: '123-456-7890',
            email: 'email-invalide'
        };
        expect(validateContact(contact)).toBe(false);
    });

    it('devrait valider un contact avec tous les champs requis', () => {
        const contact = {
            nom: 'Test',
            prenom: 'Utilisateur',
            telephone: '123-456-7890',
            email: 'test@example.com'
        };
        expect(validateContact(contact)).toBe(true);
    });

    it('devrait invalider un contact manquant un champ requis', () => {
        const contact = {
            nom: 'Test',
            prenom: 'Utilisateur',
            telephone: '123-456-7890' // Manque l'email
        };
        expect(validateContact(contact)).toBe(false);
    });

    it('devrait invalider un contact vide', () => {
        expect(validateContact({})).toBe(false);
    });

    it('ne devrait pas planter avec une entrée invalide (null ou undefined)', () => {
        expect(validateContact(null)).toBe(false);
        expect(validateContact(undefined)).toBe(false);
    });
});

