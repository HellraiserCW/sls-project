import { Request, Response } from "express";
import { dynamodb } from "../dynamodb";
import { DeleteCommandInput } from "@aws-sdk/lib-dynamodb";
import { logger } from "..";

export const deleteUser = (req: Request, res: Response) => {
  const params: DeleteCommandInput = {
    TableName: process.env.TABLE_NAME,
    Key: {
      id: req.params.id,
    },
  };

  dynamodb.delete(params, (error: unknown) => {
    if (error) {
      logger.error("DB error:", error as Error);
      res.status(500).json({
        error: "Failed to delete user from db",
      });

      return;
    }

    res.status(200).json({});
  });
};
