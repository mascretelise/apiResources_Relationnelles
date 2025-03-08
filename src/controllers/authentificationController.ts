import dotenv from "dotenv";
import bcrypt from "bcrypt";
import conn from "../data/connector/connect";
import jwt from "jsonwebtoken";
import logger from '../middleware/loggerWinston'
import { Request, Response} from 'express';
import * as userAccessor from "../data/accessor/userAccessor"
import {User} from "../data/models/user"

dotenv.config({ path: ".env" });

if (!process.env.JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY is not defined in environment variables.");
}
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const test = async (req:Request, res:Response): Promise<any> => {
  return res.status(200).json({ message: "coucou" });
};

const register = async (req:Request, res:Response) => {
//   res.set("Access-Control-Allow-Origin", "http://localhost:3001");
  try {
    const newuser = {
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      email: req.body.email,
      hash: await bcrypt.hash(req.body.mdp, 10),
    };

    const createuser = await userAccessor.createUser(newuser);
    //logger.trace('trace!');
    /*console.log("result");
    console.log(result);
    //console.log("req.body");
    //console.log(req.body);
    console.log("result.warningStatus : ");
    console.log(result.warningStatus);*/
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
      logger.warn('Compte déjà connu');
      res
        .status(500)
        .json({ error: "Un compte existe déjà avec cette adresse mail" });
    } else {
      logger.debug('Erreur Serveur');
      res.status(500).json({ error: "Erreur API lors de l’inscription." });
    }
  }
  // return res.status(200).json({message: 'User creation success'})
};

const login = async (req:Request, res:Response) : Promise<any> => {
  
try {
      const { email, mdp } = req.body

      const result = await userAccessor.loginUser(email)
      console.log("🔍 Vérification du mot de passe...");
      const mdpCompare = await userAccessor.compareMdp(mdp, email);
      

      if (!mdpCompare) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect" });
      }
     console.log("salut")
          
      const token = jwt.sign({userId: email}, jwtSecretKey, {expiresIn: '24h'})
      
      res.header('Authorization', 'Bearer ' + token);
      
      return res.status(200).json({message: "token envoyé"});
        
  
    } catch (error) {
      logger.debug('Erreur Serveur');
      res.status(500).json({ error: "Erreur API lors de l’inscription." });
    }

    

}

export { test, register, login };
