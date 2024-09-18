import { Router } from "express";
import { listUsers } from "../controllers/list";
import { getUser } from "../controllers/get";
import { getUserByEmail } from "../controllers/get-by-email";
import { createUser } from "../controllers/create";
import { updateUser } from "../controllers/update";
import { deleteUser } from "../controllers/delete";

const router = Router();

router.get("/", listUsers);
router.get("/:id", getUser);
router.get("/by-email/:email", getUserByEmail);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
