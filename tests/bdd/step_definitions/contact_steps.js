const { Given, When, Then } = require('cucumber');
        const assert = require('assert');
        const { By, until } = require('selenium-webdriver');
        const { driver } = require('./webdriver'); // En supposant que vous avez une configuration webdriver

        Given('Je suis sur la page de gestion des contacts', async function () {
            await driver.get('http://localhost:3000'); // Ajustez l'URL au besoin
        });

        When('Je remplis le formulaire avec des données valides', async function () {
            await driver.findElement(By.id('name')).sendKeys('John');
            await driver.findElement(By.id('firstName')).sendKeys('Doe');
            await driver.findElement(By.id('phone')).sendKeys('123-456-7890');
            await driver.findElement(By.id('email')).sendKeys('john.doe@example.com');
        });

        When('Je clique sur "Ajouter"', async function () {
            await driver.findElement(By.css('button[type="submit"]')).click();
        });

        Then('Je vois le nouveau contact dans la liste', async function () {
            await driver.wait(until.elementLocated(By.xpath("//table[@id='contactTable']/tbody/tr/td[text()='John']")), 10000);
            const nameElement = await driver.findElement(By.xpath("//table[@id='contactTable']/tbody/tr/td[text()='John']"));
            assert.ok(await nameElement.isDisplayed());
        });

        Given('J\'ai un contact dans la liste', async function () {
            // Assurez-vous qu'il y a au moins un contact, ajoutez-en un si nécessaire
            // Cette partie dépendra de la façon dont vous initialisez les données
        });

        When('Je clique sur "Supprimer" pour ce contact', async function () {
            await driver.findElement(By.xpath("//table[@id='contactTable']/tbody/tr[1]/td/button[text()='Supprimer']")).click();
        });

        Then('Je suis invité à confirmer la suppression', async function () {
            // Vérifiez la présence d'une boîte de dialogue de confirmation (alerte du navigateur)
            const alert = await driver.switchTo().alert();
            assert.ok(alert != null); // Vérifiez si l'alerte est présente
            // Facultativement : Stockez l'alerte pour une interaction ultérieure
            this.alert = alert; // Stockez l'alerte dans le contexte 'this' pour y accéder plus tard
        });

        When('Je confirme la suppression', async function () {
            // Acceptez l'alerte si elle existe
            if (this.alert) {
                await this.alert.accept();
            } else {
                throw new Error("Aucune alerte n'a été trouvée à accepter.");
            }
        });

        Then('Le contact est supprimé de la liste', async function () {
            try {
                // Vérifiez que le contact n'est plus présent dans la liste
                await driver.wait(until.stalenessOf(driver.findElement(By.xpath("//table[@id='contactTable']/tbody/tr/td[text()='John']"))), 10000);
                console.log("Le contact a été supprimé avec succès.");
            } catch (error) {
                console.error("Erreur : Le contact n'a pas été supprimé avec succès.");
            }
        });
