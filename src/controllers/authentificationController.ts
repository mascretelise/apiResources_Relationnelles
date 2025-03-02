import dotenv from "dotenv";
import bcrypt from "bcrypt";
import conn from "../data/connector/connect";
import jwt from "jsonwebtoken";
import winston from "winston";

dotenv.config({ path: ".env" });

if (!process.env.JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY is not defined in environment variables.");
}
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const test = async (req:any, res:any) => {
  return res.status(200).json({ message: "coucou" });
};

const register = async (req:any, res:any) => {
//   res.set("Access-Control-Allow-Origin", "http://localhost:3001");
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
    console.log("result.warningStatus : ");
    console.log(result.warningStatus);
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
  // return res.status(200).json({message: 'User creation success'})
};

const login = async (req:any,res:any) =>{
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

        bcrypt.compare(user.mdp, mdpHash, (err, isMatch) => {
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
    
   /* const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),

    })*/

}

export { test, register, login };
