import request from "supertest";
import express from "express";
import { getUserById } from "../../src/controllers/get-by-id";
import { dynamodb } from "../../src/dynamodb";
import { logger } from "../../src/logger";

jest.mock("../../src/dynamodb");
jest.mock("../../src/logger", () => ({
  logger: {
    error: jest.fn(),
  },
}));

const app = express();
app.use(express.json());
app.get("/user/:id", getUserById);

describe("GET /user/:id", () => {
  it("should retrieve a user successfully", async () => {
    const mockUser = { id: "1234-5678-91011", name: "John Doe" };
    (dynamodb.get as jest.Mock).mockImplementation((_params, callback) => {
      callback(null, { Item: mockUser });
    });

    const res = await request(app).get("/user/1234-5678-91011");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUser);
  });

  it("should return 500 if there is a database error", async () => {
    (dynamodb.get as jest.Mock).mockImplementation((_params, callback) => {
      callback(new Error("DB Error"), null);
    });

    const res = await request(app).get("/user/1234-5678-91011");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Failed to retrieve user from db" });
    expect(logger.error).toHaveBeenCalledWith("DB error:", new Error("DB Error"));
  });
});
