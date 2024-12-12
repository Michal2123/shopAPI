jest.mock("../db/auth-db");
jest.mock("../db/user-db");
const { registerUserDB, loginUserDB } = require("../db/auth-db");
const { selectUserDB } = require("../db/user-db");
const { encryptData } = require("../utlis/crypto");
const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
const { accessTokenSecret } = require("../config");

const encriptedPassword = encryptData("password");
registerUserDB.mockResolvedValue("aaa-bbb-ccc");
loginUserDB.mockResolvedValue({
  id: "aaa-bbb-ccc",
  email: "email@email.com",
  password: encriptedPassword,
});
selectUserDB.mockResolvedValue({
  firstName: "firstName",
  lastName: "lastName",
  city: "city",
  zipCode: "00-000",
  address: "address",
});

describe("Auth endpoints status 200 tests", () => {
  it("check if 200 when register", async () => {
    const payload = {
      id: "aaa-bbb-ccc",
      email: "email@email.com",
      password: "password",
      firstName: "firstName",
      lastName: "lastName",
      city: "city",
      zipCode: "00-000",
      address: "address",
    };
    const response = await request(app).post("/auth/register").send(payload);
    expect(response.statusCode).toBe(200);
    const token = response.body;
    const tokenData = jwt.decode(token, accessTokenSecret);
    expect(tokenData.userId).toBe("aaa-bbb-ccc");
  });

  it("check if 200 when login", async () => {
    const payload = {
      email: "email@email.com",
      password: "password",
    };
    const response = await request(app).post("/auth/login").send(payload);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("accessToken");
    expect(response.body).toHaveProperty("user", {
      firstName: "firstName",
      lastName: "lastName",
      city: "city",
      zipCode: "00-000",
      address: "address",
      email: "email@email.com",
    });
  });
});

describe("Auth endpoints status 400 tests", () => {
  it("check if 400 when login with no payload", async () => {
    const response = await request(app).post("/auth/login");
    expect(response.statusCode).toBe(400);
  });

  it("check if 400 when register with no payload", async () => {
    const response = await request(app).post("/auth/register");
    expect(response.statusCode).toBe(400);
  });
});

describe("Auth endpoint status 401 tests", () => {
  it("check if 401 when login with wrong password", async () => {
    const payload = {
      email: "email@email.com",
      password: "nonPassword",
    };
    const response = await request(app).post("/auth/login").send(payload);
    expect(response.statusCode).toBe(401);
  });
});

describe("Auth endpoint status 403 tests", () => {
  it("check if 403 when email already exist", async () => {
    registerUserDB.mockRejectedValue(
      new Error("This email already exist. Email collumn is UNIQUE KEY.")
    );
    const payload = {
      id: "aaa-bbb-ccc",
      email: "email@email.com",
      password: "password",
      firstName: "firstName",
      lastName: "lastName",
      city: "city",
      zipCode: "00-000",
      address: "address",
    };

    const response = await request(app).post("/auth/register").send(payload);
    expect(response.statusCode).toBe(403);
  });
});
