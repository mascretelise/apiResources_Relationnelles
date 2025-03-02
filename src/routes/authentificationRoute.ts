import express from "express";
const router = express.Router();

import { register, test, login } from "../controllers/authentificationController";

router.route("/test")
    .get(test);

router.route("/register")
    .post(register);
router.route("/login")
    .post(login)

export default router;
