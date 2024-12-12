jest.mock("../db/history-db");
const { insertHistoryDB, selectHistoryDB } = require("../db/history-db");
const request = require("supertest");
const app = require("../app");
const { createToken } = require("../utlis/crypto");

const userId = "aaaa-bbbb-cccc";

selectHistoryDB.mockResolvedValue([
  {
    id: 1,
    date: "1/11/2024 14:6",
    userOrder:
      '[{"productId":30,"count":2},{"productId":31,"count":2},{"productId":33,"count":2}]',
  },
]);

insertHistoryDB.mockResolvedValue({
  id: 1,
  userId: "aaaa-bbb-cccc",
  date: "1/11/2024 14:6",
  orderList: [
    { productId: 30, count: 2 },
    { productId: 32, count: 2 },
    { productId: 33, count: 1 },
  ],
});

describe("History endpoints status 200 tests", () => {
  it("chech if 200 when get user order history", async () => {
    const token = createToken(userId);
    const response = await request(app)
      .get("/history")
      .set({ Authorization: token });
    expect(response.statusCode).toBe(200);
    expect(response).toHaveProperty("body", [
      {
        id: 1,
        date: "1/11/2024 14:6",
        orderList: [
          { productId: 30, count: 2 },
          { productId: 31, count: 2 },
          { productId: 33, count: 2 },
        ],
      },
    ]);
  });

  it("chech if 200 when insert new order to user order history", async () => {
    const token = createToken(userId);
    const payload = {
      date: "1/11/2024 14:6",
      orderList: [
        { productId: 30, count: 2 },
        { productId: 31, count: 2 },
        { productId: 33, count: 2 },
      ],
    };
    const response = await request(app)
      .post("/history")
      .send(payload)
      .set({ Authorization: token });
    expect(response.statusCode).toBe(200);
    expect(response).toHaveProperty("body", {
      id: 1,
      userId: "aaaa-bbb-cccc",
      date: "1/11/2024 14:6",
      orderList: [
        { productId: 30, count: 2 },
        { productId: 32, count: 2 },
        { productId: 33, count: 1 },
      ],
    });
  });
});

describe("History endpoints status 400 tests", () => {
  it("chech if 400 when insert empty object to user order history", async () => {
    const token = createToken(userId);
    const response = await request(app)
      .post("/history")
      .set({ Authorization: token });
    expect(response.statusCode).toBe(400);
  });
});

describe("History endpoints status 401 tests", () => {
  it("chech if 401 when get user order history with no token", async () => {
    const response = await request(app).get("/history");
    expect(response.statusCode).toBe(401);
  });

  it("chech if 401 when insert new order to user order history with no token", async () => {
    const token = createToken(userId);
    const payload = {
      date: "1/11/2024 14:6",
      orderList: [
        { productId: 30, count: 2 },
        { productId: 31, count: 2 },
        { productId: 33, count: 2 },
      ],
    };
    const response = await request(app).post("/history").send(payload);
    expect(response.statusCode).toBe(401);
  });
});
