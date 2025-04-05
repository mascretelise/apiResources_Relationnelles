import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import * as userAccessor from "../data/accessor/userAccessor"

dotenv.config({ path: ".env" });

const getInfos = async (req: Request, res:Response)=> {
    const email = req.query.param;

    console.log("email : ", email)
    
    const result = await userAccessor.getInfos(email)
    if(!result){
        res.status(404).json({Message: "Utilisateur inconnu"})
    }
    console.log("result : ",result )
    res.status(200).json(result)
}

export {getInfos}