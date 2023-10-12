import { Router } from "express";
import AuthController from "../controllers/authController.js";

const router = new Router();

router.post("/sign-up", AuthController.signUp);

export default router;
