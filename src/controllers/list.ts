import { Request, Response } from "express";
import { dynamodb } from "../dynamodb";
import { ScanCommandInput, ScanCommandOutput } from "@aws-sdk/lib-dynamodb";
import { logger } from "../logger";

export const listUsers = (_req: Request, res: Response) => {
  const params: ScanCommandInput = {
    TableName: process.env.TABLE_NAME,
  };

  dynamodb.scan(params, (error: unknown, result?: ScanCommandOutput) => {
    if (error) {
      logger.error("DB error:", error as Error);
      res.status(500).json({
        error: "Failed to retrieve users from db",
      });

      return;
    }

    res.status(200).json(result?.Items);
  });
};
