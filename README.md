# Serverless offline CRUDL project with DynamoDb

## Prerequisites

- Git
- Node.js - 20 (LTS)
- Yarn
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
yarn install 
```

## Prepare for running

1. Create `.env` file in root folder. You can just rename `.env.example`. (Not implemented)

## Running application

App require running database. DynamoDB will initialize locally after startup if installed to .dynamodb folder. You need only to start the app. It should run on port 3000.

```
yarn start
```

Use Postman or curl to make api calls f.e.:

```
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.com"
  }'
```

## Testing

Not implemented
