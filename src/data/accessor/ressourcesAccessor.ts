import conn from "../connector/connect";

export const createRessource = async (ressource: { res_nom: string, com_commentaire: string, res_extension:string,  res_auteur: string, cat_categorie: string | null }) => {
  const query = "INSERT INTO ressource (res_nom, com_commentaire, res_extension, res_auteur, cat_categorie) VALUES (?, ?, ?, ?, ?)";
  console.log("Résultat brut de db.query : ", query);
  const result = await conn.execute(query, [
    ressource.res_nom, 
    ressource.com_commentaire, 
    ressource.res_extension,
    ressource.res_auteur, 
    ressource.cat_categorie
  ]);
  return result;
};