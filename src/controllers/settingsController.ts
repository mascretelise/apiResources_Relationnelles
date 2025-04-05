import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import * as userAccessor from "../data/accessor/userAccessor"
import jwt, { JwtPayload } from "jsonwebtoken";

dotenv.config({ path: ".env" });

const getInfos = async (req: Request, res:Response)=> {
    // const email = req.query
    //Vérifier si l'email existe via getUserByEmail comme ça si ok on getInfos 
    const email = req.query.email as string;

    console.log("email : ", email)
    
    const result = await userAccessor.getInfos(email)
    if(!result){
        res.status(404).json({Message: "Utilisateur inconnu"})
    }
    console.log("result : ",result )
    res.status(200).json(result)
}

  async function getEmailByToken(req:Request, res:Response) {
    const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
         const token = req.cookies.token as string;
          console.log(req.cookies.token); 
            if (!token) {
                 res.status(403).json({ error: "Accès refusé, pas de token" });
            }
        
            const decoded = jwt.verify(token, jwtSecretKey)as JwtPayload;
            req.body.user = decoded;
        const param = decoded.email
        return param
}


export {getInfos}