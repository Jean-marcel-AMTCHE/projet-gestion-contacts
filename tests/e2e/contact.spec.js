const { test, expect } = require('@playwright/test');

const baseUrl = 'http://localhost:57608'; // Définir l'URL de base

// Test pour ajouter un contact
test('Ajouter un nouveau contact', async ({ page }) => {
    try {
        // Aller à l'URL
        await page.goto(baseUrl, { waitUntil: 'load' }); // Utiliser baseUrl et s'assurer que la page est complètement chargée

        // Attendre que le champ 'name' soit visible avant de le remplir
        await page.waitForSelector('#name', { state: 'visible', timeout: 10000 }); // Timeout de 10 secondes

        // Remplir les champs du formulaire
        await page.fill('#name', 'John');
        await page.fill('#firstName', 'Doe');
        await page.fill('#phone', '123-456-7890');
        await page.fill('#email', 'john.doe@example.com');

        // Cliquer sur le bouton submit
        await page.click('button[type="submit"]');

        // Attendre que le contact soit ajouté à la table
        await page.waitForSelector('table#contactTable tbody tr:has-text("John")', { timeout: 10000 });

        // Vérifier que le contact a bien été ajouté
        const contactName = await page.locator('table#contactTable tbody tr:first-child td:first-child').textContent();
        expect(contactName).toBe('John');

    } catch (error) {
        console.error('Test "Ajouter un nouveau contact" a échoué:', error);
        throw error; // Relancer l'erreur pour faire échouer le test
    }
});

// Test pour supprimer un contact
test('Supprimer un contact', async ({ page }) => {
    try {
        await page.goto(baseUrl, { waitUntil: 'load' });
        await page.waitForSelector('#name', { state: 'visible', timeout: 10000 });

        const nomASupprimer = 'À supprimer';
        await page.fill('#name', nomASupprimer);
        await page.fill('#firstName', 'Contact');
        await page.fill('#phone', '999-999-9999');
        await page.fill('#email', 'supprimer@example.com');
        await page.click('button[type="submit"]');

        await page.waitForSelector(`table#contactTable tbody tr:has-text("${nomASupprimer}")`, { timeout: 10000 });

        // Gérer la boîte de dialogue de confirmation AVANT de cliquer sur le bouton
        page.on('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`); // Log pour déboguer
            await dialog.accept();
        });

        // Logs avant la suppression
        const rowCountBefore = await page.locator('table#contactTable tbody tr').count();
        console.log(`Nombre de lignes avant la suppression: ${rowCountBefore}`);

        // Cliquer sur le bouton "Supprimer"
        await page.click('table#contactTable tbody tr:first-child td:last-child button:has-text("Supprimer")');

        // Attendre que la ligne du tableau soit supprimée
        await page.waitForSelector(`table#contactTable tbody tr:has-text("${nomASupprimer}")`, { state: 'detached', timeout: 20000 });

        // Logs après la suppression
        const rowCountAfter = await page.locator('table#contactTable tbody tr').count();
        console.log(`Nombre de lignes après la suppression: ${rowCountAfter}`);

        // Assertion
        const contactLocator = page.locator(`table#contactTable tbody tr:has-text("${nomASupprimer}")`);
        await expect(contactLocator).toHaveCount(0, { timeout: 5000 });

    } catch (error) {
        console.error('Test "Supprimer un contact" a échoué:', error);
        throw error;
    }
});

