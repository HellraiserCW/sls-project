import { Request, Response } from "express";
import { dynamodb } from '../dynamodb';

export const deleteUser = (req: Request, res: Response) => {
  const params = {
    TableName: process.env.tableName!,
    Key: {
      id: req.params.id,
    },
  };

  dynamodb.delete(params, (error) => {
    if (error) {
      console.error(error);
      res.status(500).json({
        error: 'Failed to delete user from db',
      });

      return;
    }

    res.status(200).json({});
  });
};
