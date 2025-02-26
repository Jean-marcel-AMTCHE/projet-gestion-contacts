// playwright.config.js
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
    testDir: './tests', // Indique le répertoire où se trouvent les tests
    testMatch: '**/*.spec.js', // Indique les fichiers de test à inclure
    use: {
      baseURL: 'http://localhost:3000', // Adaptez à l'URL de votre application
    },
    projects: [
      {
        name: 'chromium',
        use: {
          browserName: 'chromium',
        },
      },
      {
        name: 'firefox',
        use: {
          browserName: 'firefox',
        },
      },
      {
        name: 'webkit',
        use: {
          browserName: 'webkit',
        },
      },
    ],
  };
  
  module.exports = config;
  
  