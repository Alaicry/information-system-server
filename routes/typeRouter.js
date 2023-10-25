import { Router } from "express";
import TypeController from "../controllers/typeController.js";

const router = new Router();

router.post("/create", TypeController.create);
router.get("/all", TypeController.getAll);
router.get("/:id", TypeController.getOne);
router.patch("/update/:id", TypeController.update);
router.delete("/delete/:id", TypeController.delete);

export default router;
