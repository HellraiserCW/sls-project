"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var migration = {
    Table: {
        TableName: process.env.TABLE_NAME,
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
                IndexName: process.env.GLOBAL_SECONDARY_INDEX_NAME,
                KeySchema: [
                    {
                        AttributeName: process.env.GLOBAL_SECONDARY_ATTRIBUTE_NAME,
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
(0, fs_1.writeFileSync)((0, path_1.join)(__dirname, "users.json"), JSON.stringify(migration, null, 2));
