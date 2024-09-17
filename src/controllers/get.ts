import { Request, Response } from "express";
import { dynamodb } from '../dynamodb';

export const getUser = (req: Request, res: Response) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    Key: {
      id: req.params.id,
    },
  };

  dynamodb.get(params, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({
        error: 'Failed to retrieve user from db',
      });

      return;
    }

    res.status(200).json(result.Item);
  });
};
