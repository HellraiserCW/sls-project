import request from "supertest";
import express from "express";
import { getUserByEmail } from "../../src/controllers/get-by-email";
import { dynamodb } from "../../src/dynamodb";
import { logger } from "../../src";

jest.mock("../../src/dynamodb");
jest.mock("../../src", () => ({
  logger: {
    error: jest.fn(),
  },
}));

const app = express();
app.use(express.json());
app.get("/users", getUserByEmail);

describe("GET /users", () => {
  it("should retrieve a user by email successfully", async () => {
    const mockUsers = [{ id: "1234-5678-91011", name: "John Doe", email: "john@example.com" }];
    (dynamodb.query as jest.Mock).mockImplementation((_params, callback) => {
      callback(null, { Items: mockUsers });
    });

    const res = await request(app).get("/users?email=john@example.com");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUsers);
  });

  it("should return 400 if email query parameter is missing", async () => {
    const res = await request(app).get("/users");

    expect(res.status).toBe(400);
    expect(res.body).toEqual({
      error: "Email is required",
    });
  });

  it("should return 500 if there is a database error", async () => {
    (dynamodb.query as jest.Mock).mockImplementation((_params, callback) => {
      callback(new Error("DB Error"), null);
    });

    const res = await request(app).get("/users?email=john@example.com");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({
      error: "Failed to retrieve user by email from db",
    });
    expect(logger.error).toHaveBeenCalledWith("DB error:", new Error("DB Error"));
  });
});
