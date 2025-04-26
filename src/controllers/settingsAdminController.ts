import * as settingsAdminAccessor from '../data/accessor/settingsAdminAccessor';
import { Request, Response, NextFunction } from "express";


const addCategory = async (req:Request, res:Response) => {
    
    try {
        const { category } = req.body
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
        const { category } = req.body
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
        const {id} = req.body
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

export {addCategory, removeCategory, editCategory}