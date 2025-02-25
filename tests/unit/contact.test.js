const { validateContact } = require('../../src/app.js'); // Ajustez le chemin si nécessaire

    describe('Validation du Contact', () => {
        it('devrait valider un email valide', () => {
            expect(validateContact({ email: 'test@example.com' })).toBe(true);
        });

        it('devrait invalider un email invalide', () => {
            expect(validateContact({ email: 'email-invalide' })).toBe(false);
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
                telephone: '123-456-7890'
            };
            expect(validateContact(contact)).toBe(false);
        });
    });
