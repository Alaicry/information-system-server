import { Router } from "express";
import authRouter from "./authRouter.js";
import typeRouter from "./typeRouter.js";
import branchRouter from "./branchRouter.js";

const router = new Router();

router.use("/auth", authRouter);
router.use("/type", typeRouter);
router.use("/branch", branchRouter);

export default router;
