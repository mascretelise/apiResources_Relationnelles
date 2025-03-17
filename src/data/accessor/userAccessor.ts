import {User} from "../models/user"
import conn from "../connector/connect";
import bcrypt from "bcrypt";
require("dotenv").config();
import { SessionOptions } from "iron-session";



export async function createUser(newuser: { lastName: any; firstName: any; email: any; hash: string; }): Promise<User> {
    const insertQuery =
      "INSERT INTO utilisateurs (uti_nom, uti_prenom, uti_email, uti_mot_de_passe, uti_statut,uti_suspendu) VALUES (?, ?, ?, ?, 1,1)";
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
// comparer le mot de passe dans une autre fonction
export async function compareMdp (mdp: string, email: string): Promise<boolean>{
    let mdpHash = await getUserByEmail(email)
    if (!mdpHash.uti_mot_de_passe) {
        return false;
    }
    
    const match = await bcrypt.compare(mdp, mdpHash.uti_mot_de_passe);
console.log("email, mdp : ", match)
    return match;

}

export async function getUserByEmail(email: any): Promise<any>{
    const request = "SELECT uti_email, uti_mot_de_passe FROM utilisateurs WHERE uti_email=?";
    
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
