import middy from "@middy/core";
import express, { Request, Response } from "express";
import serverless from "serverless-http";
import { logMiddleware } from "./middlewares/log-middleware";
import usersRouter from "./routes/users";

const app = express();

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello, Lambda!");
});

app.use("/users", usersRouter);

const originalHandler = serverless(app);

export const handler = middy()
  .use(logMiddleware())
  .handler(originalHandler);
