import request from "supertest";
import express from "express";
import { updateUser } from "../../src/controllers/update";
import { dynamodb } from "../../src/dynamodb";

jest.mock("../../src/dynamodb");

const app = express();
app.use(express.json());
app.put("/user/:id", updateUser);

describe("PUT /user/:id", () => {
  it("should update a user successfully", async () => {
    const mockResult = {
      Attributes: {
        id: "1234-5678-91011",
        name: "John Doe",
        email: "john@example.com",
      },
    };
    (dynamodb.update as jest.Mock).mockImplementation((_params, callback) => {
      callback(null, mockResult);
    });

    const res = await request(app)
      .put("/user/1234-5678-91011")
      .send({ name: "John Doe", email: "john@example.com" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockResult.Attributes);
  });

  it("should return 500 if there is a database error", async () => {
    (dynamodb.update as jest.Mock).mockImplementation((_params, callback) => {
      callback(new Error("DB Error"), null);
    });

    const res = await request(app)
      .put("/user/1234-5678-91011")
      .send({ name: "John Doe", email: "john@example.com" });

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: "Failed to update user in db" });
  });

  it("should return 400 for invalid input", async () => {
    const res = await request(app)
      .put("/user/1234-5678-91011")
      .send({ name: "", email: "" });

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "Invalid input format" });
  });
});
