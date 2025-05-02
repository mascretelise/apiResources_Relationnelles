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

export {addCategory, removeCategory, editCategory, getCategory}