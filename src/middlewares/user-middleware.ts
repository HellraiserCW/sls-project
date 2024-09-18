import { Request, Response } from "express";
import { getUserByEmail } from "../controllers/get-by-email";
import { listUsers } from "../controllers/list";

export const userMiddleware = (req: Request, res: Response) => {
  const email = req.query.email;

  return email ? getUserByEmail(req, res) : listUsers(req, res);
};
