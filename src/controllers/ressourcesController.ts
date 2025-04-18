import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as ressourcesAccessor from "../data/accessor/ressourcesAccessor";

// Sérialisation personnalisée pour BigInt : sinon ça trigger une erreur au moment de l'insert
const bigIntReviver = (key: string, value: any) => {
  if (typeof value === 'bigint') {
    return value.toString(); // -> on met en string 
  }
  return value;
};

const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

export const createRessource = async (req: Request, res: Response): Promise<void> => {
  try {
    const cookieToken = req.cookies?.token;
    const headerToken = req.headers['authorization']?.split(' ')[1];

    const token = cookieToken || headerToken;

    if (!token) {
      res.status(403).json({ error: "Accès refusé, pas de token" });
      return; 
    }

    // récupération de l'email via token
    const decoded = jwt.verify(token, jwtSecretKey) as JwtPayload;
    const userEmail = decoded.email; 

    const { res_nom, com_commentaire, res_extension, cat_categorie, res_lien, res_description } = req.body;

    // champs mandatory : nom & catégorie
    if (!res_nom || !cat_categorie || !res_lien) {
      res.status(400).json({ error: "Les champs nom, catégorie et lien doivent être fournis." });
      return;
    }

    const result = await ressourcesAccessor.createRessource({ 
      res_nom,
      com_commentaire,
      res_extension,
      res_auteur: userEmail, 
      cat_categorie,
      res_lien,
      res_description
    });

    if (result.insertId) {
      console.log("Result from DB:", result);
      res.status(201).json({
        message: "Ressource créée avec succès",
        data: JSON.parse(JSON.stringify(result, bigIntReviver)), // ici le bigInt
        insertedId: result.insertId.toString()
      });
    } else {
      throw new Error("Échec de l'insertion de la ressource.");
    }
  } catch (error) {
    console.error("Erreur lors de la création de la ressource", error);
    res.status(500).json({ error: "Erreur serveur lors de la création de la ressource"});
  }
};

export const getRecentRessources = async (req: Request, res: Response): Promise<void> => {
  try {
    const ressources = await ressourcesAccessor.getRecentRessources();
    res.status(200).json(ressources);
  } catch (error) {
    console.log("Error : " + error)
    res.status(500).json({ error: "Erreur serveur" });
  }
};

export const getUserHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const cookieToken = req.cookies?.token;
    const headerToken = req.headers['authorization']?.split(' ')[1];

    const token = cookieToken || headerToken;
    const decoded = jwt.verify(token, jwtSecretKey) as JwtPayload;
    const email = decoded.email;

    const historique = await ressourcesAccessor.getUserHistory(email);
    res.status(200).json(historique);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};