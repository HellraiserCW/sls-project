import { Request, Response } from "express";
import { dynamodb } from '../dynamodb';

export const getUserByEmail = (req: Request, res: Response) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    IndexName: 'EmailIndex',
    KeyConditionExpression: 'email = :email',
    ExpressionAttributeValues: {
      ':email': req.params.email,
    },
  };

  dynamodb.query(params, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({
        error: 'Failed to retrieve user by email from db',
      });

      return;
    }
    console.log(result);
    res.status(200).json(result.Items);
  });
};
