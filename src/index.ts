import { Logger } from "@aws-lambda-powertools/logger";
import { LogLevel } from "@aws-lambda-powertools/logger/types";
import serverless from "serverless-http";
import express, { Request, Response } from "express";
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

export const handler = serverless(app);
