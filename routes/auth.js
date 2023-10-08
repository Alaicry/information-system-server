import { Router } from "express";
import AuthController from "../controllers/AuthController.js";

const router = new Router();

router.post("/api/auth/signUp", AuthController.signUp);


export default router;
