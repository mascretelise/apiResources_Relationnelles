import * as settingsSuperAdminAccessor from "../data/accessor/settingsSuperAdminAccessor";
import { Request, Response } from "express";


const arrayStatut: { [key: string]: string } = {
  1: "Citoyen",
  2: "Admin",
  3: "Super Administrateur",
  4: "Modérateur",
};


const getAllAccounts = async (req: Request, res: Response) => {
  const getAccounts = await settingsSuperAdminAccessor.getAccountsSuperAdmin();

  if (!getAccounts || getAccounts.length === 0) {
     res.status(500).json({ error: "Les comptes n'ont pas été importés" });
  }


  const result = getAccounts.map((account: { uti_statut: string | number }) => ({
    ...account,
    statut: arrayStatut[Number(account.uti_statut)] || 'inconnu', 
  }));

   res.status(200).json(result);
};


const editStatutAccounts = async (req: Request, res: Response) => {
  const uti_uuid = req.query.id as string;
  const statut = req.body.statut;

  const editaccounts = await settingsSuperAdminAccessor.editStatut(uti_uuid, statut);

  if (!editaccounts) {
     res.status(500).json({ error: "La modification n'a pas été effectuée" });
  }


   res.status(200).json({ message: "La modification a été effectuée"});
};

export { getAllAccounts, editStatutAccounts };
