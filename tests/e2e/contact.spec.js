const { test, expect } = require('@playwright/test');

        test('Ajouter un nouveau contact', async ({ page }) => {
            await page.goto('http://localhost:3000'); // Remplacez par l'URL de votre application
            await page.fill('#name', 'John');
            await page.fill('#firstName', 'Doe');
            await page.fill('#phone', '123-456-7890');
            await page.fill('#email', 'john.doe@example.com');
            await page.click('button[type="submit"]');
            await page.waitForSelector('table#contactTable tbody tr:first-child td:has-text("John")');
            expect(await page.locator('table#contactTable tbody tr:first-child td:first-child').textContent()).toBe('John');
        });

        test('Supprimer un contact', async ({ page }) => {
            await page.goto('http://localhost:3000');

            // Tout d'abord, assurez-vous qu'il y a un contact à supprimer (vous devrez peut-être en ajouter un)
            await page.fill('#name', 'À supprimer');
            await page.fill('#firstName', 'Contact');
            await page.fill('#phone', '999-999-9999');
            await page.fill('#email', 'supprimer@example.com');
            await page.click('button[type="submit"]');
            await page.waitForSelector('table#contactTable tbody tr:first-child td:has-text("À supprimer")');

            // Cliquez sur le bouton de suppression
            await page.click('table#contactTable tbody tr:first-child td:last-child button:has-text("Supprimer")');

            // Gérez la boîte de dialogue de confirmation
            page.on('dialog', async dialog => {
                await dialog.accept(); // Confirmer la suppression
            });

            // Attendez que le contact soit supprimé du tableau
            await page.waitForSelector('table#contactTable tbody tr:has-text("À supprimer")', { state: 'detached' });

            // Assurez-vous que le contact n'est plus présent dans le tableau
            const contactLocator = page.locator('table#contactTable tbody tr:has-text("À supprimer")');
            expect(await contactLocator.count()).toBe(0);
        });
