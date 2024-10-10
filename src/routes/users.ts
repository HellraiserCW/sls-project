import { Router } from "express";
import { createUser } from "../controllers/create";
import { deleteUser } from "../controllers/delete";
import { getUserByEmail } from "../controllers/get-by-email";
import { getUserById } from "../controllers/get-by-id";
import { listUsers } from "../controllers/list";
import { updateUser } from "../controllers/update";

const router = Router();

router.get("/:id", getUserById);
router.get("/by-email/:email", getUserByEmail);
router.get("/", listUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
