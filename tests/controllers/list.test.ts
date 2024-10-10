import request from "supertest";
import express from "express";
import { listUsers } from "../../src/controllers/list";
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
app.get("/users", listUsers);

describe("GET /users", () => {
  it("should retrieve users successfully", async () => {
    const mockUsers = [
      { id: "1234-5678-91011", name: "John Doe" },
      { id: "1213-1415-1617", name: "Jane Doe" },
    ];
    (dynamodb.scan as jest.Mock).mockImplementation((_params, callback) => {
      callback(null, { Items: mockUsers });
    });

    const res = await request(app).get("/users");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockUsers);
  });

  it("should return 500 if there is a database error", async () => {
    (dynamodb.scan as jest.Mock).mockImplementation((_params, callback) => {
      callback(new Error("DB Error"), null);
    });

    const res = await request(app).get("/users");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Failed to retrieve users from db" });
    expect(logger.error).toHaveBeenCalledWith("DB error:", new Error("DB Error"));
  });
});
