import { Request, Response } from "express";
import { dynamodb } from "../dynamodb";
import { QueryCommandInput, QueryCommandOutput } from "@aws-sdk/lib-dynamodb";

export const getUserByEmail = (req: Request, res: Response) => {
  const email = req.query.email as string;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const params: QueryCommandInput = {
    TableName: process.env.TABLE_NAME,
    IndexName: "EmailIndex",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": email,
    },
  };

  dynamodb.query(params, (error: unknown, result?: QueryCommandOutput) => {
    if (error) {
      console.error(error);
      res.status(500).json({
        error: "Failed to retrieve user by email from db",
      });

      return;
    }

    res.status(200).json(result?.Items);
  });
};
