/*import bcrypt from "bcrypt";
const conn = require("../data/connector/Connect");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function inscription(app:any) {
  app.post("/inscription", async (req:any, res:any) => {
    res.set("Access-Control-Allow-Origin", "http://localhost:3001");
    try {
      const newuser = {
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        email: req.body.email,
        hash: await bcrypt.hash(req.body.mdp, 10),
      };

      const insertQuery =
        "INSERT INTO utilisateurs (uti_nom, uti_prenom, uti_email, uti_mot_de_passe, uti_statut,uti_suspendu) VALUES (?, ?, ?, ?, 1,1)";
      const result = await conn.execute(insertQuery, [
        newuser.lastName,
        newuser.firstName,
        newuser.email,
        newuser.hash,
      ]);
      console.log("result");
      console.log(result);
      //console.log("req.body");
      //console.log(req.body);
      console.log("result.uti_nom : ");
      console.log(result.warningStatus);
      let jwtSecretKey = process.env.JWT_SECRET_KEY;
      const expireIn = 24 * 60 * 60;
      const token = jwt.sign({ userId: newuser }, jwtSecretKey, {
        expiresIn: expireIn,
      });
      res.header("Authorization", "Bearer " + token);
      res.status(201).json({
        message: "Utilisateur inscrit avec succès.",
      });
    } catch (error:any) {
      if (error.code == "ER_DUP_ENTRY") {
        res
          .status(500)
          .json({ error: "Un compte existe déjà avec cette adresse mail" });
      } else {
        res.status(500).json({ error: "Erreur API lors de l’inscription." });
      }
    }
  });
};*/
