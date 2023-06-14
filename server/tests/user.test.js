const request = require("supertest");
const express = require("express");
const router = require("../routes/users");
const { Users } = require("../models");
const app = express();
const bcrypt = require("bcrypt");

jest.mock("../middleware/auth", () => ({
  auth: (req, res, next) => next(),
}));

jest.mock("../middleware/admin", () => ({
  admin: (req, res, next) => next(),
}));

describe("GET /", () => {
  test("should return a list of users", async () => {
    app.use("/api/users", router);
    const response = await request(app).get("/api/users");
    expect(response.status).toBe(200);
  });
});

describe("GET /:id", () => {
  test("should return the user with the specified ID", async () => {
    const mockUser = {
      id: 1,
      name: "ahmed",
      email: "ahmed@ahmed3.com",
      password: "password",
      phone: "ahmed",
      status: "ahmed",
      gender: "male",
      dateOfBirth: "ahmed",
    };

    Users.findByPk = jest.fn().mockResolvedValue(mockUser);

    app.use("/api/users", router);
    const response = await request(app).get("/api/users/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  test("should return 404 if user is not found", async () => {
    Users.findByPk = jest.fn().mockResolvedValue(null);

    app.use("/api/users", router);

    const response = await request(app).get("/api/users/1");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "User not found" });
  });
});

describe("POST /", () => {
  test("should return 500 if an error occurs during user creation", async () => {
    const requestBody = {
      email: "test@example.com",
      password: "testpassword",
    };
    const existingUser = null;
    jest.spyOn(Users, "findOne").mockResolvedValue(existingUser);
    jest.spyOn(bcrypt, "hash").mockRejectedValue(new Error("Hashing error"));
    const app = express();
    app.use("/api/users", router);
    const response = await request(app).post("/api/users").send(requestBody);
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal server error" });
  });
});
