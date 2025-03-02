/*import conn from "../src/data/connector/connect";
import bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");
const bodyParser = require('body-parser');
require("dotenv").config();
const jwtSecretKey = process.env.JWT_SECRET_KEY;

module.exports = function connexion(app:any) {
   
  app.post("/connexion", async (req:any, res:any) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:3001");

    try {
      const user = {
        email: req.body.email,
        mdp: req.body.mdp,
      };
     
      
      const request =
        "SELECT uti_email, uti_mot_de_passe FROM utilisateurs WHERE uti_email=? ";

      const result = await conn.execute(request, [user.email]);

      
      if (result.length === 0) {
        return res.status(400).json({ message: "Utilisateur inconnu" });
      } else {
        const mdpHash = result[0].uti_mot_de_passe;

        bcrypt.compare(user.mdp, mdpHash, (err:any, isMatch:any) => {
          if (err) {
            console.log("Erreur lors du mdp : ", err);
            return res.status(500).json({ message: "Erreur survenue" });
          }
          if (!isMatch) {
            console.log("mdp incorrect");
            return res.status(403).json({message: 'Mot de passe incorrect'})
          }
          
          const token = jwt.sign({userId: user.email}, jwtSecretKey, {expiresIn: '24h'})
          res.header('Authorization', 'Bearer ' + token);
          
          
          return res.status(200).json({message: "token envoyé"});
         
        });
      }
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur API lors de l’inscription." });
    }
  });
  
}*/