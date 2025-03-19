import express from "express";
const router = express.Router();

import { register, test, login,verifyToken} from "../controllers/authentificationController";
import {getStatutUser} from "../controllers/statutController";
import {getInfos} from "../controllers/settingsController"

router.route("/test")
    .get(test);

router.route("/register")
    .post(register);
router.route("/login")
    .post(login)
router.route("/protectedRoute")
    .get(verifyToken) 
router.route("/getStatut")
    .get(getStatutUser)
router.route("/getInfosByEmail")
    .get(getInfos)

export default router;
