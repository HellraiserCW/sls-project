# Serverless offline CRUDL project with DynamoDb

## Prerequisites

- Git
- Node.js - 20 (LTS)
- Java SDK - 22
- DynamoDB local - 2.x (should be installed to .dynamodb folder)

## Downloading

```
git clone https://github.com/HellraiserCW/sls-project.git
```

```
cd ./sls-project
```

## Installing NPM modules

```
npm i
```

## Prepare for running

1. Create `.env` file in root folder. You can just rename `.env.example`. (Not implemented)

## Running application

App require running database. DynamoDB will initialize locally after startup if installed to .dynamodb folder. You need only to start the app.

```
npm run start
```

## Testing

Not implemented
