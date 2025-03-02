import express from "express";
const router = express.Router();

import { register, test, login, token } from "../controllers/authentificationController";

router.route("/test")
    .get(test);

router.route("/register")
    .post(register);
router.route("/login")
    .post(login)
router.route("authorization")
    .get(token)

export default router;
