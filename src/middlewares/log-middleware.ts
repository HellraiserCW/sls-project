import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { logger } from "..";

dotenv.config();

export const logMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);

  next();
};
