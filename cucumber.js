// cucumber.js
module.exports = {
    paths: [
        './features/**/*.feature'  // Recherche tous les fichiers .feature dans le dossier "features" et ses sous-dossiers
    ],
    require: [
        './features/step_definitions/**/*.js' // Recherche tous les fichiers .js contenant les définitions d'étapes
    ],
    format: [
        'summary',
        'progress'
    ]
};

