import { Router } from "express";
import BranchController from "../controllers/branchController.js";

const router = new Router();

router.post("/create", BranchController.create);
router.get("/all", BranchController.getAll);
router.get("/:id", BranchController.getOne);
router.patch("/update/:id", BranchController.update);
router.delete("/delete/:id", BranchController.delete);

export default router;
