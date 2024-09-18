import { Request, Response } from "express";
import { userMiddleware } from "../../src/middlewares/user-middleware";
import { getUserByEmail } from "../../src/controllers/get-by-email";
import { listUsers } from "../../src/controllers/list";

jest.mock("../../src/controllers/get-by-email");
jest.mock("../../src/controllers/list");

describe("userMiddleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    jest.clearAllMocks();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should call listUsers if email query parameter is not present", () => {
    req = { query: {} };

    userMiddleware(req as Request, res as Response);

    expect(listUsers).toHaveBeenCalledWith(req, res);
    expect(getUserByEmail).not.toHaveBeenCalled();
  });

  it("should call getUserByEmail if email query parameter is present", () => {
    req.query = { email: "john@example.com" };

    userMiddleware(req as Request, res as Response);

    expect(getUserByEmail).toHaveBeenCalledWith(req, res);
    expect(listUsers).not.toHaveBeenCalled();
  });
});
