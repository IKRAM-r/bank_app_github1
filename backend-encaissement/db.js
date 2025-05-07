const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // mets ton mot de passe si tu en as un
    database: 'banque_gestion'
});

db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à MySQL:', err);
        return;
    }
    console.log('Connecté à MySQL');
});

module.exports = db;
