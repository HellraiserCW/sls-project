import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { dynamodb } from "../dynamodb";
import { PutCommandInput } from "@aws-sdk/lib-dynamodb";
import { logger } from "../logger";

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;

  if (!name || !email) {
    logger.error("Invalid input");
    res.status(400).json({ error: "You should provide name and email to create a record" });

    return;
  }

  const params: PutCommandInput = {
    TableName: process.env.TABLE_NAME,
    Item: {
      id: uuidv4(),
      name,
      email,
    },
  };

  dynamodb.put(params, (error: unknown) => {
    if (error) {
      logger.error("DB error:", error as Error);
      res.status(500).json({ error: "Failed to create user in db" });

      return;
    }

    res.status(200).json(params.Item);
  });
};
