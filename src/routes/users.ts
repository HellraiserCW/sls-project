import { Router } from "express";
import { getUser } from "../controllers/get";
import { createUser } from "../controllers/create";
import { updateUser } from "../controllers/update";
import { deleteUser } from "../controllers/delete";
import { logMiddleware } from "../middlewares/log-middleware";
import { userMiddleware } from "../middlewares/user-middleware";

const router = Router();

router.get("/:id", logMiddleware, getUser);
router.get("/", logMiddleware, userMiddleware);
router.post("/", logMiddleware, createUser);
router.put("/:id", logMiddleware, updateUser);
router.delete("/:id", logMiddleware, deleteUser);

export default router;
