import request from "supertest";
import express from "express";
import { deleteUser } from "../../src/controllers/delete";
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
app.delete("/delete/:id", deleteUser);

describe("DELETE /delete/:id", () => {
  it("should delete a user successfully", async () => {
    (dynamodb.delete as jest.Mock).mockImplementation((_params, callback) => {
      callback(null, {});
    });

    const res = await request(app).delete("/delete/1234-5678-91011");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({});
  });

  it("should return 500 if there is a database error", async () => {
    (dynamodb.delete as jest.Mock).mockImplementation((_params, callback) => {
      callback(new Error("DB Error"), null);
    });

    const res = await request(app).delete("/delete/1234-5678-91011");

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Failed to delete user from db" });
    expect(logger.error).toHaveBeenCalledWith("DB error:", new Error("DB Error"));
  });
});
