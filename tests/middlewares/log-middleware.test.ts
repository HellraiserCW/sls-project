import { APIGatewayProxyEventV2, Context } from "aws-lambda";
import middy from "@middy/core";
import { logMiddleware } from "../../src/middlewares/log-middleware";
import { logger } from "../../src/logger";

jest.mock("../../src/logger", () => ({
  logger: {
    info: jest.fn(),
  },
}));

describe("logMiddleware", () => {
  let handler: middy.MiddyfiedHandler<APIGatewayProxyEventV2, any, Error>;
  let event: Partial<APIGatewayProxyEventV2>;
  let context: Context;

  beforeEach(() => {
    jest.clearAllMocks();
    handler = middy(async () => ({ statusCode: 200 })).use(logMiddleware());
    event = {
      requestContext: {
        accountId: "string",
        apiId: "string",
        domainName: "string",
        domainPrefix: "string",
        http: {
          method: "GET",
          path: "/test",
          protocol: "string",
          sourceIp: "string",
          userAgent: "string",
        },
        requestId: "string",
        routeKey: "string",
        stage: "string",
        time: "string",
        timeEpoch: 0,
      },
    };
    context = {} as Context;
  });

  it("should call logger info on each API call", async () => {
    await handler(event as APIGatewayProxyEventV2, context);

    expect(logger.info).toHaveBeenCalledWith("Incoming request: GET /test");
  });

  it("should handle different HTTP methods", async () => {
    event.requestContext!.http.method = "POST";
    event.requestContext!.http.path = "/submit";

    await handler(event as APIGatewayProxyEventV2, context);

    expect(logger.info).toHaveBeenCalledWith("Incoming request: POST /submit");
  });
});
