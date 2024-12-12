jest.mock("../db/user-db");
const { selectUserDB } = require("../db/user-db");
const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
const { createToken } = require("../utlis/crypto");

const userId = "aaaa-bbbb-cccc";

selectUserDB.mockResolvedValue({
  firstName: "firstName",
  lastName: "lastName",
  city: "city",
  zipCode: "00-000",
  address: "address",
});

describe("User endpoints status 200 tests", () => {
  it("check if 200 when get user details", async () => {
    const token = createToken(userId);
    const response = await request(app)
      .get("/user")
      .set({ Authorization: token });
    expect(response.statusCode).toBe(200);
    expect(response).toHaveProperty("body", {
      firstName: "firstName",
      lastName: "lastName",
      city: "city",
      zipCode: "00-000",
      address: "address",
    });
  });

  it("check if 200 when update user details", async () => {
    const token = createToken(userId);
    const payload = {
      firstName: "firstName",
      lastName: "lastName",
      city: "city",
      zipCode: "00-000",
      address: "address",
    };
    const response = await request(app)
      .patch("/user")
      .set({ Authorization: token })
      .send(payload);
    expect(response.statusCode).toBe(200);
  });

  it("check if 200 when update user email", async () => {
    const token = createToken(userId);
    const payload = {
      email: "email@email.com",
    };
    const response = await request(app)
      .patch("/user")
      .set({ Authorization: token })
      .send(payload);
    expect(response.statusCode).toBe(200);
  });

  it("check if 200 when update user password", async () => {
    const token = createToken(userId);
    const payload = {
      password: "password",
    };
    const response = await request(app)
      .patch("/user")
      .set({ Authorization: token })
      .send(payload);
    expect(response.statusCode).toBe(200);
  });
});

describe("User endpoints status 400 tests", () => {
  it("check if 400 when update user with no payload", async () => {
    const token = createToken(userId);
    const response = await request(app)
      .patch("/user")
      .set({ Authorization: token });
    expect(response.statusCode).toBe(400);
  });
});

describe("User endpoints status 401 tests", () => {
  it("check if 401 when update user details with no token", async () => {
    const payload = {
      firstName: "firstName",
      lastName: "lastName",
      city: "city",
      zipCode: "00-000",
      address: "address",
    };
    const response = await request(app).patch("/user").send(payload);
    expect(response.statusCode).toBe(401);
  });

  it("check if 401 when update user email with no token", async () => {
    const payload = {
      email: "email@email.com",
    };
    const response = await request(app).patch("/user").send(payload);
    expect(response.statusCode).toBe(401);
  });

  it("check if 401 when update user password with no token", async () => {
    const payload = {
      password: "password",
    };
    const response = await request(app).patch("/user").send(payload);
    expect(response.statusCode).toBe(401);
  });
});
