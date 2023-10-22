import { Router } from "express";
import BranchController from "../controllers/branchController.js";

const router = new Router();

router.post("/create", BranchController.create);
// router.patch("/update/:id", TypeController.update);
// router.get("/get/:id", TypeController.get);
// router.get("/get-all", TypeController.getAll);
// router.delete("/delete/:id", TypeController.delete);

export default router;
