import { Router } from "express";
import userRouter from "./userRouter.js";
import typeRouter from "./typeRouter.js";
import branchRouter from "./branchRouter.js";

const router = new Router();

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/branch", branchRouter);

export default router;
