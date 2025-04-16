import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import logger from '../middleware/loggerWinston'
import { Request, Response, NextFunction } from "express";
import * as userAccessor from "../data/accessor/userAccessor"
import { User } from "~/data/models/user";



dotenv.config({ path: ".env" });
declare module "express-serve-static-core" {
  interface Request {
      user?: User;
  }
}
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
      hash: await bcrypt.hash(req.body.password, 10),
    };

    const createuser = await userAccessor.createUser(newuser);
    if(createuser){
      const email = newuser.email
      const user = {email}
        const token = jwt.sign(user, jwtSecretKey, { expiresIn: "1h" });
  
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", 
        });
      res.status(201).json({
      message: "Utilisateur inscrit avec succès.",
    });
    }
    //logger.trace('trace!');
    /*console.log("result");
    console.log(result);
    //console.log("req.body");
    //console.log(req.body);
    console.log("result.warningStatus : ");
    console.log(result.warningStatus);*/
   

    
  } catch (error:any) {
    console.error("Erreur complète :", error)
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
      console.log("REQ BODY", req.body)
      const { email, mdp } = req.body

      const result = await userAccessor.loginUser(email)
      const mdpCompare = await userAccessor.compareMdp(mdp, email);
      console.log("result : ", result)
      console.log("mdp compare : ", mdpCompare)
      
      if (!mdpCompare || !result) {
        return res.status(401).json({ message: "Email ou mot de passe incorrect" });
      }
      //passer l'id 
      const payload = {"email" : email}
      console.log("user : ", payload)
      const token = jwt.sign(payload, jwtSecretKey);
      
      res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", 
          maxAge: 24 * 60 * 60 * 1000
      });
      return res.status(200).json({message: "utilisateur connecté"})

    } catch (error) {
      logger.debug('Erreur Serveur');
      res.status(500).json({ error: "Erreur API lors de la connexion." });
    }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  console.log(req.cookies.token); // Récupérer le token depuis les cookies
    if (!token) {
         res.status(403).json({ error: "Accès refusé, pas de token" });
    }

    const decoded = jwt.verify(token, jwtSecretKey);
    req.body.user = decoded;
    
    next(); 
    res.status(200).json({message: "Accès autorisé"})
};

/*const infosUser = () => {
  
  const infos = userAccessor.getUserByEmail(email)
}
*/
async function emailByToken(req:Request, res:Response) {
  const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
       const token = req.cookies.token as string;
        console.log("cookie token " , req.cookies.token); 
          if (!token) {
               res.status(403).json({ error: "Accès refusé, pas de token" });
          }
      
          const decoded = jwt.verify(token, jwtSecretKey)as JwtPayload;
          req.body.user = decoded;
      const param = decoded.email
      res.json({email : param})
}
export { test, register, login, verifyToken, emailByToken};
