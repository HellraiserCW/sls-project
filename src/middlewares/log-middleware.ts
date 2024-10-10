import middy from "@middy/core";
import { APIGatewayProxyEventV2, APIGatewayProxyResult } from "aws-lambda";
import dotenv from "dotenv";
import { logger } from "../logger";

dotenv.config();

export const logMiddleware = (): middy.MiddlewareObj<APIGatewayProxyEventV2, APIGatewayProxyResult> => {
  const logMiddlewareBefore: middy.MiddlewareFn<APIGatewayProxyEventV2, APIGatewayProxyResult> = (request): void => {
    const { method, path } = request.event.requestContext.http;
    logger.info(`Incoming request: ${method} ${path}`);
  };

  return {
    before: logMiddlewareBefore,
  };
};
