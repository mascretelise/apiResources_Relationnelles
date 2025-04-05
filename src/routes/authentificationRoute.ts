import express from "express";
const router = express.Router();

import { register, test, login,verifyToken} from "../controllers/authentificationController";
import {getStatutUser} from "../controllers/statutController";
import {getInfos} from "../controllers/settingsController"

router.route("/test")
    .get(test);
/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - firstName
 *               - lastName
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               firstName:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "azerY123!"
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Bad request (missing or invalid fields)
 *       500:
 *         description: Internal server error
 */

  
router.route("/register")
    .post(register);
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with the provided information.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "azerY123!"
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Bad request (missing or invalid fields)
 *       500:
 *         description: Internal server error
 */
router.route("/login")
    .post(login)
router.route("/protectedRoute")
    .get(verifyToken) 
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
router.route("/user/statut")
   .get(getStatutUser)
router.route("/user/infosByEmail")
    .get(getInfos)

export default router;
