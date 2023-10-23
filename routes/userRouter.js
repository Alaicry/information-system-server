import { Router } from "express";
import UserController from "../controllers/userController.js";
import checkAuth from "../utils/checkAuth.js";

const router = new Router();

router.post("/sign-up", UserController.signUp);
router.post("/sign-in", UserController.signIn);
router.get("/check-auth", checkAuth, UserController.checkAuth);

export default router;
