import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import * as userAccessor from "../data/accessor/userAccessor"
import jwt, { JwtPayload } from "jsonwebtoken";
import logger from '../middleware/loggerWinston'

dotenv.config({ path: ".env" });

const getInfos = async (req: Request, res:Response)=> {
    //Vérifier si l'email existe via getUserByEmail comme ça si ok on getInfos 
    const email = req.query.email as string;

    //const verifEmail = await userAccessor.getUserByEmail(email)
    /*if(!verifEmail){
        res.status(404).json({Message: "Utilisateur inconnu"})
    }*/
    const result = await userAccessor.getInfos(email)
    res.status(200).json(result)
}

const getModifInfos = async (req:Request, res:Response) : Promise<any> => {
  
    try {
          const email = req.query.email as string;
          console.log("email modif infos : ", email)
          const user = {
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            pseudo: req.body.pseudo
           } 
           
           console.log("user modif info :", user)
          const result = await userAccessor.formModif(email,user)
          console.log("result modif infos : ", result)
          
          return res.status(200).json({message: "utilisateur connecté"})
    
        } catch (error) {
          logger.debug('Erreur Serveur');
          res.status(500).json({ error: "Erreur API lors de la connexion." });
        }
    }

  


export {getModifInfos, getInfos}