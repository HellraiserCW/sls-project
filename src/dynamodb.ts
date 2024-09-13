import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

let options = {};

if (process.env.IS_OFFLINE) {
  options = {
    region: 'localhost',
    endpoint: 'http://0.0.0.0:8000',
    credentials: {
      accessKeyId: 'MockAccessKeyId',
      secretAccessKey: 'MockSecretAccessKey',
    },
  };
}

export const client = new DynamoDBClient(options);

export const dynamodb = DynamoDBDocument.from(client);
