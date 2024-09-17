import { Request, Response } from "express";
import { dynamodb } from '../dynamodb';
import { QueryCommandInput, QueryCommandOutput } from "@aws-sdk/lib-dynamodb";

export const getUserByEmail = (req: Request, res: Response) => {
  const params: QueryCommandInput = {
    TableName: process.env.TABLE_NAME,
    IndexName: 'EmailIndex',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': req.params.email,
    },
  };

  dynamodb.query(params, (error: unknown, result?: QueryCommandOutput) => {
    if (error) {
      console.error(error);
      res.status(500).json({
        error: 'Failed to retrieve user by email from db',
      });

      return;
    }

    res.status(200).json(result?.Items);
  });
};
