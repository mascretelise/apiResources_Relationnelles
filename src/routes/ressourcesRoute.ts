import express from "express";
import { createRessource } from "../controllers/ressourcesController";

const router = express.Router();

router.route("/ressources")
    .post(createRessource);

export default router;