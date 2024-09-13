import { Request, Response } from "express";
import { dynamodb } from '../dynamodb';

export const listUsers = (_req: Request, res: Response) => {
  const params = {
    TableName: process.env.tableName!,
  };

  dynamodb.scan(params, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({
        error: 'Failed to retrieve users from db',
      });

      return;
    }

    res.status(200).json(result.Items);
  });
};
