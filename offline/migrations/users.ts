import { writeFileSync } from "fs";
import { join } from "path";
import { config } from "dotenv";

config();

interface AttributeDefinition {
  AttributeName: string;
  AttributeType: string;
}

interface KeySchema {
  AttributeName: string;
  KeyType: string;
}

interface GlobalSecondaryIndex {
  IndexName: string;
  KeySchema: KeySchema[];
  Projection: {
    ProjectionType: string;
  };
  ProvisionedThroughput: {
    ReadCapacityUnits: number;
    WriteCapacityUnits: number;
  };
}

interface Table {
  TableName: string;
  AttributeDefinitions: AttributeDefinition[];
  KeySchema: KeySchema[];
  GlobalSecondaryIndexes: GlobalSecondaryIndex[];
  ProvisionedThroughput: {
    ReadCapacityUnits: number;
    WriteCapacityUnits: number;
  };
}

const migration: { Table: Table } = {
  Table: {
    TableName: process.env.TABLE_NAME!,
    AttributeDefinitions: [
      {
        AttributeName: "id",
        AttributeType: "S",
      },
      {
        AttributeName: "email",
        AttributeType: "S",
      },
    ],
    KeySchema: [
      {
        AttributeName: "id",
        KeyType: "HASH",
      },
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: process.env.GLOBAL_SECONDARY_INDEX_NAME!,
        KeySchema: [
          {
            AttributeName: process.env.GLOBAL_SECONDARY_ATTRIBUTE_NAME!,
            KeyType: "HASH",
          },
        ],
        Projection: {
          ProjectionType: "ALL",
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1,
    },
  },
};

writeFileSync(join(__dirname, "users.json"), JSON.stringify(migration, null, 2));
