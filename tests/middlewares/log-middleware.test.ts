import { NextFunction, Request, Response } from "express";
import { logger } from "../../src";
import { logMiddleware } from "../../src/middlewares/log-middleware";

jest.mock("../../src", () => ({
  logger: {
    info: jest.fn(),
  },
}));

describe("userMiddleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("should call logger info on each api call", () => {
    req = { method: "GET", url: "/test" };

    logMiddleware(req as Request, res as Response, next);

    expect(logger.info).toHaveBeenCalledWith("Incoming request: GET /test");
    expect(next).toHaveBeenCalled();
  });
});
