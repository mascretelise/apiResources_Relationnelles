import {User} from "../models/user"
import conn from "../connector/connect";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { jwtDecode } from "jwt-decode";
require("dotenv").config();
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
declare module "express-serve-static-core" {
  interface Request {
      user?: User;
  }
}
export async function createUser(newuser: { lastName: string; firstName: string; email: string; hash: string; }): Promise<User> {
    const insertQuery =
      "INSERT INTO utilisateurs (uti_name, uti_firstname, uti_email, uti_password, uti_statut,uti_suspendu) VALUES (?, ?, ?, ?, 1,1)";
    const result = await conn.execute(insertQuery, [
      newuser.lastName,
      newuser.firstName,
      newuser.email,
      newuser.hash,
    ]);
  return result;
}

export async function loginUser (email: string): Promise<any>{
    const result = await getUserByEmail(email)
    return result;
}

export async function compareMdp (mdp: string, email: string): Promise<boolean>{
    let mdpHash = await getUserByEmail(email)
    console.log("mdp Hash : ", mdpHash)
    if (!mdpHash.uti_password) {
        return false;
    }
    
    const match = await bcrypt.compare(mdp, mdpHash.uti_password);
    return match;

}

export async function getUserByEmail(email: string): Promise<any>{
    const request = "SELECT  uti_email, uti_password FROM utilisateurs WHERE uti_email=?";
    
    try {
        const [rows] = await conn.execute(request, [email]);
        
        if (rows.length === 0) {
            return null;
        }
        return rows;
    } catch (error) {
        throw new Error("Erreur lors de la récupération de l'utilisateur");
    }

}

/*export function getStatutUser(email: string ) {
    const request = "SELECT  uti_email FROM utilisateurs WHERE uti_email=?";
    
    throw new Error("Function not implemented.");
}*/
export async function getStatutUser(email: string): Promise<any>{
    const request = "SELECT uti_statut FROM utilisateurs WHERE uti_email=?";
    const rows = await conn.execute(request, [email])
    if(rows === 0){
        return null
    }
    console.log(rows)
    return rows[0]
}

export async function getInfos(email: string): Promise<User>{
    const request = "SELECT uti_email, uti_name, uti_firstname, uti_pseudonyme, uti_password, uti_statut FROM utilisateurs WHERE uti_email=?";
    const result = await conn.execute(request, [email])
    if(result.length ===0){
        null
    }
    console.log("get infos result request : ", result)
    return result
}

