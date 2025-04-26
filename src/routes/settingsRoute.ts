import express from "express";
const router = express.Router();

import {addCategory, editCategory, removeCategory} from "../controllers/settingsAdminController"
import { getUrlIcone, postUrlIcone, uploadIconeProfil } from "~/controllers/uploadIconeProfilController";
import {getModifInfos, getInfos} from "../controllers/settingsController"
import { register, test, login,verifyToken, emailByToken} from "../controllers/authentificationController";


router.route("/category/addCategorie")
        .post(addCategory)

router.route("/category/removeCategorie")
        .post(removeCategory)
router.route("/category/editCategorie")
        .post(editCategory)
        router.route("/user/modifInfos")
        .post(getModifInfos)
router.route("/user/iconeProfil")
        .post(uploadIconeProfil.single('file'), (req, res) => {
            res.json({ message: 'Image uploaded successfully' });
        });
router.route("/urlIconeProfil")
        .post(postUrlIcone)
router.route("/urlIconeByEmail")
        .get(getUrlIcone)

        /**
* @swagger
* /user/statut/{email}:
*    get:
*       summary: Get a user by ID
*       parameters:
*        - in: path
*          name: email
*          schema:
*            type: string
*          required: true
*          description: récupérer l'email de l'utilisateur
*       responses:
*           201:
*               description: User successfully registered
*           400:
*               description: Bad request (missing or invalid fields)
*           500:
*               description: Internal server error     
*/
// router.route("/user/statut")
//    .get(getStatutUser)
router.route("/user/infosByEmail")
.get(getInfos)

/**
* @swagger
* /user/emailByToken:
*    get:
*       summary: get email by Token
*       responses:
*           201:
*               description: User successfully registered
*           400:
*               description: Bad request (missing or invalid fields)
*           500:
*               description: Internal server error     
*/
router.route("/user/emailByToken")
    .get(emailByToken)
export default router;
