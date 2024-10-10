import middy from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import dotenv from "dotenv";
import { logger } from "..";

dotenv.config();

export const logMiddleware = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const logMiddlewareBefore: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = (request): void => {
    const { httpMethod, path } = request.event;
    logger.info(`Incoming request: ${httpMethod} ${path}`);
  };

  return {
    before: logMiddlewareBefore,
  };
};
