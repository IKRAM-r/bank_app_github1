const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Obtenir l'état actuel de l'encaissement
app.get('/encaissement', (req, res) => {
    db.query('SELECT * FROM encaissement WHERE id = 1', (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération:', err);
            return res.status(500).send('Erreur serveur');
        }
        res.json(results[0]);
    });
});

// Mise à jour vente Allocation
app.post('/encaissement/venteAllocation', (req, res) => {
    const montant = req.body.montant; // montant total à retirer du solde
    db.query('UPDATE encaissement SET venteAllocation = venteAllocation + 1, nouveauSolde = nouveauSolde - ? WHERE id = 1', [montant], (err) => {
        if (err) {
            console.error('Erreur mise à jour venteAllocation:', err);
            return res.status(500).send('Erreur serveur');
        }
        res.send('Vente Allocation mise à jour');
    });
});

// Mise à jour vente Soins
app.post('/encaissement/venteSoins', (req, res) => {
    const montant = req.body.montant;
    db.query('UPDATE encaissement SET venteSoins = venteSoins + 1, nouveauSolde = nouveauSolde - ? WHERE id = 1', [montant], (err) => {
        if (err) {
            console.error('Erreur mise à jour venteSoins:', err);
            return res.status(500).send('Erreur serveur');
        }
        res.send('Vente Soins mise à jour');
    });
});

// Mise à jour vente Missions
app.post('/encaissement/venteMissions', (req, res) => {
    const montant = req.body.montant;
    db.query('UPDATE encaissement SET venteMissions = venteMissions + 1, nouveauSolde = nouveauSolde - ? WHERE id = 1', [montant], (err) => {
        if (err) {
            console.error('Erreur mise à jour venteMissions:', err);
            return res.status(500).send('Erreur serveur');
        }
        res.send('Vente Missions mise à jour');
    });
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur backend encaissement actif sur http://localhost:${PORT}`);
});
