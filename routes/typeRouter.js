import { Router } from "express";
import TypeController from "../controllers/typeController.js";

const router = new Router();

router.post("/create", TypeController.create);
router.patch("/update/:id", TypeController.update);
router.get("/get/:id", TypeController.get);
router.get("/get-all", TypeController.getAll);
router.delete("/delete/:id", TypeController.delete);

export default router;
