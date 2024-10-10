import { Logger } from "@aws-lambda-powertools/logger";
import { LogLevel } from "@aws-lambda-powertools/logger/types";
import middy from "@middy/core";
import express, { Request, Response } from "express";
import serverless from "serverless-http";
import { logMiddleware } from "./middlewares/log-middleware";
import usersRouter from "./routes/users";

const app = express();

export const logger = new Logger({
  serviceName: process.env.SERVICE_NAME,
  logLevel: process.env.POWERTOOLS_LOG_LEVEL as LogLevel,
});

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello, Lambda!");
});

app.use("/users", usersRouter);

const originalHandler = serverless(app);

export const handler = middy().use(logMiddleware()).handler(originalHandler);
