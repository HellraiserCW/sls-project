import express from "express";
import request from "supertest";
import { v4 as uuidv4 } from "uuid";
import { createUser } from "../../src/controllers/create";
import { dynamodb } from "../../src/dynamodb";
import { logger } from "../../src/logger";

jest.mock("../../src/dynamodb");
jest.mock("uuid", () => ({
  v4: jest.fn(),
}));
jest.mock("../../src/logger", () => ({
  logger: {
    error: jest.fn(),
  },
}));

const app = express();
app.use(express.json());
app.post("/create", createUser);

describe("Create User Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if email is missing", async () => {
    const res = await request(app).post("/create").send({ name: "John" });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: "You should provide name and email to create a record",
    });
    expect(logger.error).toHaveBeenCalledWith("Invalid input");
  });

  it("should return 400 if name is missing", async () => {
    const res = await request(app).post("/create").send({ email: "john@example.com" });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: "You should provide name and email to create a record",
    });
    expect(logger.error).toHaveBeenCalledWith("Invalid input");
  });

  it("should create a user successfully", async () => {
    const mockUuid = "1234-5678-91011";
    (uuidv4 as jest.Mock).mockReturnValue(mockUuid);
    (dynamodb.put as jest.Mock).mockImplementation((_params, callback) => {
      callback(null, {});
    });

    const res = await request(app).post("/create").send({ name: "John", email: "john@example.com" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: mockUuid,
      name: "John",
      email: "john@example.com",
    });
  });

  it("should return 500 if there is a database error", async () => {
    (dynamodb.put as jest.Mock).mockImplementation((_params, callback) => {
      callback(new Error("DB Error"), null);
    });

    const res = await request(app).post("/create").send({ name: "John", email: "john@example.com" });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Failed to create user in db" });
    expect(logger.error).toHaveBeenCalledWith("DB error:", new Error("DB Error"));
  });
});
