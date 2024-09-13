import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import { dynamodb } from '../dynamodb';

export const createUser = (req: Request, res: Response) => {
  const { name, email } = req.body;

  if (!name || !email) {
    console.error("Invalid input");
    res.status(400).json({ error: "You should provide name and email to create a record" });
    
    return;
  }

  const params = {
    TableName: process.env.tableName!,
    Item: {
      id: uuidv4(),
      name,
      email,
    },
  };

  dynamodb.put(params, (error, _result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create user in db' });

      return;
    }

    res.status(200).json(params.Item);
  });
};
