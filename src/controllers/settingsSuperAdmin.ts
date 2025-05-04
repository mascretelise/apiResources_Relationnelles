import * as settingsSuperAdminAccessor from "../data/accessor/settingsSuperAdminAccessor"
import { Request, Response, NextFunction } from "express";

const getAllAccounts = async (req:Request, res:Response) => {
    const getAccounts = await settingsSuperAdminAccessor.getAccountsSuperAdmin()
    if(!getAccounts){
        res
        .status(500)
        .json({ error: "Les comptes n'ont pas été importés" });
    }
    res.status(200).json(getAccounts)
}

const editStatutAccounts = async (req:Request, res:Response) => {
    const uti_uuid = req.query.id
    const statut = req.body.statut
    const editaccounts = await settingsSuperAdminAccessor.editStatut(uti_uuid,statut)
    if(!editaccounts){
        res
        .status(500)
        .json({ error: "La modification n'a pas été effectuée" });
    }
    res.status(200).json({message: "La modification a été effectuée"})
}

export {getAllAccounts, editStatutAccounts}