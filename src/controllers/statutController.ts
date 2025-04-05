import dotenv from "dotenv";

import { Request, Response, NextFunction, request } from "express";
import * as userAccessor from "../data/accessor/userAccessor"



dotenv.config({ path: ".env" });

// const getStatutUser = async (req: Request, res:Response)=> {
//     const email = req.query.param;
//    const result = await userAccessor.getStatutUser(email)
//     if(!result){
//          res.status(401).json({Message: "Pas de statut"})
//     }
//     res.status(200).json(result)
// } 

// export {getStatutUser}