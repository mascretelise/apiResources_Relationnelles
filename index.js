const express = require('express');

require('dotenv').config();
const app = express();
const port = 3000;
const mysql = require('mysql');
require('dotenv').config();

const connexionDb = mysql.createConnection({   host: process.env.HOST,   user: process.env.USER,   password: process.env.PASSWORD });
connexionDb.connect(function(err) {   if (err) throw err;   console.log("Connecté à la base de données MySQL!"); });
app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

module.exports = app;
// Lancer le serveur
app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
