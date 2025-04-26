import express from "express";
const router = express.Router();

import { register, test, login,verifyToken, emailByToken} from "../controllers/authentificationController";
// import {getStatutUser} from "../controllers/statutController";
import {getModifInfos, getInfos} from "../controllers/settingsController"
import { getUrlIcone, postUrlIcone, uploadIconeProfil } from "~/controllers/uploadIconeProfilController";

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
 *     summary: login
 *     description: login user
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



/**
 * @swagger
 * /user/modifInfos:
 *   post:
 *     summary: Modify user information by email
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email of the user to modify
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lastName
 *               - firstName
 *               - pseudo
 *             properties:
 *               lastName:
 *                 type: string
 *                 example: "doe"
 *               firstName:
 *                 type: string
 *                 example: "john"
 *               pseudo:
 *                 type: string
 *                 example: "johndoedu08"
 *     responses:
 *       201:
 *         description: User successfully updated
 *       400:
 *         description: Bad request (missing or invalid fields)
 *       500:
 *         description: Internal server error
 */


export default router;
