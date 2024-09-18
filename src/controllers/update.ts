import { Request, Response } from "express";
import { dynamodb } from "../dynamodb";
import { UpdateCommandInput, UpdateCommandOutput } from "@aws-sdk/lib-dynamodb";

export const updateUser = (req: Request, res: Response) => {
  const { name, email } = req.body;

  if (!name || !email) {
    console.error("Invalid input");
    res.status(400).json({ error: "Invalid input format" });

    return;
  }

  const params: UpdateCommandInput = {
    TableName: process.env.TABLE_NAME,
    Key: {
      id: req.params.id,
    },
    ExpressionAttributeNames: {
      "#name": "name",
      "#email": "email",
    },
    ExpressionAttributeValues: {
      ":name": name,
      ":email": email,
    },
    UpdateExpression: "set #name = :name, #email = :email",
    ReturnValues: "UPDATED_NEW",
  };

  dynamodb.update(params, (error: unknown, result?: UpdateCommandOutput) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update user in db" });

      return;
    }

    res.status(200).json(result?.Attributes);
  });
};
