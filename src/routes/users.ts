import { Router } from "express";
import { getUser } from "../controllers/get";
import { createUser } from "../controllers/create";
import { updateUser } from "../controllers/update";
import { deleteUser } from "../controllers/delete";
import { userMiddleware } from "../middlewares/user-middleware";

const router = Router();

router.get("/:id", getUser);
router.get("/", userMiddleware);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
