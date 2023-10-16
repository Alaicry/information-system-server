import { Router } from "express";
import AuthController from "../controllers/authController.js";
import checkAuth from "../utils/checkAuth.js";

const router = new Router();

router.post("/sign-up", AuthController.signUp);
router.post("/sign-in", AuthController.signIn);
router.get("/check-auth", checkAuth, AuthController.checkAuth);

export default router;
