import { Request, Response } from "express";
import { dynamodb } from '../dynamodb';
import { ScanCommandInput, ScanCommandOutput } from "@aws-sdk/lib-dynamodb";

export const listUsers = (_req: Request, res: Response) => {
  const params: ScanCommandInput = {
    TableName: process.env.TABLE_NAME,
  };

  dynamodb.scan(params, (error: unknown, result?: ScanCommandOutput) => {
    if (error) {
      console.error(error);
      res.status(500).json({
        error: 'Failed to retrieve users from db',
      });

      return;
    }

    res.status(200).json(result?.Items);
  });
};
