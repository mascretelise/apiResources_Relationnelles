/*const express = require("express");
const bcrypt = require("bcrypt");
const connexionDb = require("../data/connector/Connect");

require("dotenv").config();
const app = express();

app.use(express.json());*/

/*app.post('/inscription', async (req, res) => {
    try {
        
        const { lastName, firstName, email, mdp } = req.body;
        if (!lastName || !firstName || !email || !mdp) {
            return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
        }

        const hash = await bcrypt.hash(mdp, 10);

        const sqlQuery = 'INSERT INTO utilisateurs (uti_nom, uti_prenom, uti_email, uti_mot_de_passe, uti_salt) VALUES (?, ?, ?, ?, ?)';
        const conn = await connexionDb.getConnection(); 
        const result = await conn.query(sqlQuery, [lastName, firstName, email, hash]);

        res.status(200).json({ userId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur lors de l’inscription.' });
    }
});*/

//module.exports = app;
