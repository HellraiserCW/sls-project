import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import dotenv from 'dotenv';

dotenv.config();

const options = {
  endpoint: process.env.AWS_ENDPOINT_URL_DYNAMODB!,
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
};

export const client = new DynamoDBClient(options);

export const dynamodb = DynamoDBDocument.from(client);
