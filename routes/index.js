import { Router } from "express";
import authRouter from "./authRouter.js";
import typeRouter from "./typeRouter.js";

const router = new Router();

router.use("/auth", authRouter);
router.use("/type", typeRouter);

export default router;
