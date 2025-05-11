import express from "express";
const router = express.Router();

import { addCategory, editCategory, getCategory, readAccount, removeCategory, suspendAccount } from "../controllers/settingsAdminController";
import { getUrlIcone, postUrlIcone, uploadIconeProfil } from "~/controllers/uploadIconeProfilController";
import { getModifInfos, getInfos } from "../controllers/settingsController";
import { emailByToken } from "../controllers/authentificationController";
import { editStatutAccounts, getAllAccounts } from "~/controllers/settingsSuperAdmin";

/**
 * @swagger
 * /user/editAccounts:
 *   post:
 *     summary: edit statut account
 *     description: edit statut account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - uti_uuid
 *               - statut
 *             properties:
 *               uti_uuid:
 *                 type: string
 *                 format: text
 *                 example: "12"
 *               statut:
 *                 type: string
 *                 format: text
 *                 example: "Admin"
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Bad request (missing or invalid fields)
 *       500:
 *         description: Internal server error
 */
router.route("/user/editAccounts")
    .post(editStatutAccounts);

/**
 * @swagger
 * /category/readCategory:
 *   get:
 *     summary: "Get all accounts"
 *     description: "Retrieve all accounts"
 *     responses:
 *       200:
 *         description: "Accounts retrieved successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 uti_uuid:
 *                   type: string
 *                   example: "12345"
 *                 uti_name:
 *                   type: string
 *                   example: "Doe"
 *                 uti_firstname:
 *                   type: string
 *                   example: "Jane"
 *                 uti_email:
 *                   type: string
 *                   example: "janedoe@dudu.fr"
 *                 uti_statut:
 *                   type: string
 *                   example: "Admin"
 *       404:
 *         description: "Category not found"
 *       500:
 *         description: "Internal server error"
 */
router.route("/user/allAccounts")
    .get(getAllAccounts);

/**
 * @swagger
 * /category/readCategory:
 *   get:
 *     summary: "Get all categories"
 *     description: "Retrieve all categories"
 *     responses:
 *       200:
 *         description: "Categories retrieved successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345"
 *                 name:
 *                   type: string
 *                   example: "Histoire"
 *       404:
 *         description: "Category not found"
 *       500:
 *         description: "Internal server error"
 */
router.route("/category/readCategory")
    .get(getCategory);

/**
 * @swagger
 * /category/addCategory:
 *   post:
 *     summary: add category
 *     description: add ressource category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category
 *             properties:
 *               category:
 *                 type: string
 *                 format: name
 *                 example: "histoire"
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Bad request (missing or invalid fields)
 *       500:
 *         description: Internal server error
 */
router.route("/category/addCategory")
    .post(addCategory);

/**
 * @swagger
 * /category/removeCategory:
 *   post:
 *     summary: "Remove category"
 *     description: "Remove category"
 *     parameters:
 *       - in: path
 *         name: category
 *         schema:
 *           type: string
 *         required: true
 *         description: "Get the category to delete"
 *     responses:
 *       201:
 *         description: "Category successfully removed"
 *       400:
 *         description: "Bad request (missing or invalid fields)"
 *       500:
 *         description: "Internal server error"
 */
router.route("/category/removeCategory")
    .delete(removeCategory);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: "Login"
 *     description: "Login user"
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: "ID category"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category
 *             properties:
 *               category:
 *                 type: string
 *                 format: name
 *                 example: "histoire"
 *     responses:
 *       201:
 *         description: "User successfully registered"
 *       400:
 *         description: "Bad request (missing or invalid fields)"
 *       500:
 *         description: "Internal server error"
 */
router.route("/category/editCategory")
    .post(editCategory);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: edit informations user
 *     description: edit information
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: "user email"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - LastName
 *               - FirstName
 *               - Pseudo
 *             properties:
 *               lastName:
 *                 type: string
 *                 format: name
 *                 example: "Doe"
 *               firstName:
 *                 type: string
 *                 format: name
 *                 example: "John"
 *               pseudo:
 *                 type: string
 *                 format: name
 *                 example: "johnDoe51"
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Bad request (missing or invalid fields)"
 *       500:
 *         description: Internal server error
 */
router.route("/user/modifInfos")
    .post(getModifInfos);

router.route("/user/iconeProfil")
    .post(uploadIconeProfil.single('file'), (req, res) => {
        res.json({ message: 'Image uploaded successfully' });
    });

/**
 * @swagger
 * /urlIconeProfil:
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
 *               - url
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               mdp:
 *                 type: string
 *                 format: text
 *                 example: "http://localhost:3000/api-docs"
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Bad request (missing or invalid fields)
 *       500:
 *         description: Internal server error
 */
router.route("/urlIconeProfil")
    .post(postUrlIcone);

/**
 * @swagger
 * /category/readCategory:
 *   get:
 *     summary: "Get all categories"
 *     description: "Retrieve all categories"
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: "user email"
 *     responses:
 *       200:
 *         description: "Categories retrieved successfully"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 url:
 *                   type: string
 *                   example: "http://localhost:3000/api-docs"
 *       404:
 *         description: "Category not found"
 *       500:
 *         description: "Internal server error"
 */
router.route("/urlIconeByEmail")
    .get(getUrlIcone);

/**
 * @swagger
 * /user/statut/{email}:
 *   get:
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: récupérer l'email de l'utilisateur
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Bad request (missing or invalid fields)
 *       500:
 *         description: Internal server error
 */
// router.route("/user/statut")
//    .get(getStatutUser)

router.route("/user/infosByEmail")
    .get(getInfos);

/**
 * @swagger
 * /user/emailByToken:
 *   get:
 *     summary: get email by Token
 *     responses:
 *       201:
 *         description: User successfully registered
 *       400:
 *         description: Bad request (missing or invalid fields)
 *       500:
 *         description: Internal server error
 */
router.route("/user/emailByToken")
    .get(emailByToken);

router.route("/user/suspendAccount")
    .post(suspendAccount)

router.route("/user/allAccountsAdmin")
    .get(readAccount)
export default router;
