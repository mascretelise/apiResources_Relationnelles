import express from "express";
import { createRessource, getRecentRessources, getUserHistory } from "../controllers/ressourcesController";

const router = express.Router();

// route création de ressource
router.route("/ressources")
    .post(createRessource);

    /**
 * @swagger
 * /ressources:
 *   post:
 *     summary: Create a new ressource
 *     description: Creates a new user account with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - res_nom
 *               - res_categorie
 *             properties:
 *               res_nom:
 *                 type: string
 *                 example: "Ressource classique"
 *               res_categorie:
 *                 type: string
 *                 example: "Catégorie"
 *              com_commentaire:
 *                  type: string
 *                  example: "Commentaire sur la ressource"
 *              res_extension:
 *                  type: string
 *                  example: ".json"
 *              res_auteur:
 *                  type: string
 *                  format: email
 *                  example: "johndoe@example.com"
 *     responses:
 *       201:
 *         description: Ressource créée avec succès
 *       400:
 *         description: Les champs nom et catégorie doivent être fournis.
 *       500:
 *         description: Erreur serveur lors de la création de la ressource
 */

// route obtenir dernières ressources globales (bdd)
router.route("/ressources/recentes")
    .get(getRecentRessources);
/**
* @swagger
* /ressources/recentes:
*    get:
*       summary: Get the recents ressources
*          description: Get the 5 last ressources added to the database
*       responses:
*           500:
*               description:Erreur serveur     
*/
  
// route historique des ressources consultées par l'utilisateur
router.route("/ressources/historique")
    .get(getUserHistory);
    /**
* @swagger
* /ressources/historique:
*    get:
*       summary: Get the last ressources visited
*          description: Get the 5 last ressources the current user visited
*       responses:
*           500:
*               description:Erreur serveur     
*/

export default router;