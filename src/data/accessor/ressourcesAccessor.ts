import conn from "../connector/connect";

export const createRessource = async (ressource: { res_nom: string, com_commentaire: string, res_extension:string,  res_auteur: string, cat_categorie: string, res_lien: string, res_description: string| null }) => {
  const query = "INSERT INTO ressource (res_nom, com_commentaire, res_extension, res_auteur, cat_categorie, res_lien, res_description) VALUES (?, ?, ?, ?, ?, ?, ?)";
  console.log("Résultat brut de db.query : ", query);
  const result = await conn.execute(query, [
    ressource.res_nom, 
    ressource.com_commentaire, 
    ressource.res_extension,
    ressource.res_auteur, 
    ressource.cat_categorie,
    ressource.res_lien,
    ressource.res_description
  ]);
  return result;
};

export const getRecentRessources = async () => {
  const query = `SELECT * FROM ressource ORDER BY res_urid DESC LIMIT 5`;
  const result = await conn.query(query);
  return result;
};

export const getUserHistory = async (userEmail: string) => {
  const query = `SELECT * FROM ressource WHERE res_auteur = ? ORDER BY res_urid DESC LIMIT 5`;
  const result = await conn.query(query, [userEmail]);
  return result;
};