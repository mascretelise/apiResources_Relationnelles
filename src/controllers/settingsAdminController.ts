import * as settingsAdminAccessor from '../data/accessor/settingsAdminAccessor';
import { Request, Response, NextFunction } from "express";


const addCategory = async (req:Request, res:Response) => {
    
    try {
        const { category } = req.body
        const verif = await settingsAdminAccessor.getCategoriesByName(category)
        if(verif){
            res
        .status(500)
        .json({ error: "La catégorie existe déjà" });
        }
        const add = await settingsAdminAccessor.addCategories(category)

    if(!add){
         res
        .status(500)
        .json({ error: "L'ajout de la catégorie a échoué" });
    }
    res.status(200).json({message: "La catégorie a bien été ajoutée"})
    } catch (error) {
        console.log("error addCategory : ", error)
    }
}

const removeCategory = async (req:Request, res:Response) =>  {

    try {
        const category  = req.query.category as string
        console.log("category remove : ", category)
        const remove = await settingsAdminAccessor.removeCategories(category)

    if(!remove){
         res
        .status(500)
        .json({ error: "La suppression de la catégorie a échoué" });
    }
    res.status(200).json({message: "La catégorie a bien été supprimé"})
    } catch (error) {
        console.log("error remove category : ", error)
    }
}

const editCategory = async (req:Request, res:Response) =>  {
    
    try {
        const { category } = req.body
        console.log("nouvelle categorie :", category)
        const id = req.query.id 
        console.log("id reçu : ", id)
        const verif = await settingsAdminAccessor.getCategoriesByName(category)
        if(verif){
            res
        .status(500)
        .json({ error: "La catégorie existe déjà" });
        }
        const edit = await settingsAdminAccessor.editCategories(category, id)

    if(!edit){
         res
        .status(500)
        .json({ error: "La modification de la catégorie a échoué" });
    }
    res.status(200).json({message: "La catégorie a bien été modifié"})
    } catch (error) {
        console.log("error remove category : ", error)
    }
}

const getCategory = async(req:Request, res:Response) => {
    try {
        const result = await settingsAdminAccessor.getCategories();
        if(!result){
            res.status(404).json({message: "Aucune catégorie n'as été trouvée"})
        }
        //Renvoyer un tableau 
       
        res.status(200).json(result)
    } catch (error) {
        console.log("error get categorie : ", error)
    }
}

const suspendAccount =  async (req:Request, res:Response) => {
console.log("kiki")
    const uti_uuid = req.query.id as string;
    const uti_suspendu = req.body.suspendu;
    console.log("uti_uuid : ", uti_uuid)
    console.log("uti_suspendu : ", uti_suspendu)
    const result = await settingsAdminAccessor.suspendAccountByEmail(uti_suspendu, uti_uuid)
    if(!result){
        res.status(403).json({message: "L'update n'a pas eu lieu"})
    }
    res.status(200).json({message: "L'update du compte a bien eu lieu"})
}
const arraySuspendu: { [key: string]: string } = {
    0: "Actif",
    1: "Suspendu"
  };
const readAccount = async(req:Request, res:Response)=>{
    const getAccounts = await settingsAdminAccessor.getAccountsAdmin();
    
      if (!getAccounts || getAccounts.length === 0) {
         res.status(500).json({ error: "Les comptes n'ont pas été importés" });
      }
    
      const result = getAccounts.map((account: { uti_suspendu: string | number }) => ({
        ...account,
        suspendu: arraySuspendu[Number(account.uti_suspendu)] || 'inconnu', // Conversion explicite en nombre
      }));
    
       res.status(200).json(result);
}


export {addCategory, removeCategory, editCategory, getCategory, suspendAccount,readAccount}