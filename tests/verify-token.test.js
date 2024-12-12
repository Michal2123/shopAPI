const veryfiToken = require("../middleware/veryfi-token");
const { createRequest } = require("node-mocks-http");

describe("Test token veryfier", () => {
  it("Check if error on wromng token", async () => {
    const mReq = createRequest({
      headers: {
        Authorization: "test",
      },
    });
    const mRes = {};
    const mNext = jest.fn();

    await veryfiToken(mReq, mRes, mNext);
    expect(mNext).toHaveBeenCalledWith(new Error("jwt malformed"));
  });

  it("Check if error on no token", async () => {
    const mReq = createRequest();
    const mRes = {};
    const mNext = jest.fn();

    await veryfiToken(mReq, mRes, mNext);
    expect(mNext).toHaveBeenCalledWith(new Error("jwt must be provided"));
  });

  it("Check if error on old token", async () => {
    const mReq = createRequest({
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTczMzIzNDAzMywiZXhwIjoxNzMzMjM3NjMzfQ.1HYKu5SbUzyDHAHnghSgC1YHLkO0LohHuadzKs2ygXA",
      },
    });
    const mRes = {};
    const mNext = jest.fn();

    await veryfiToken(mReq, mRes, mNext);
    expect(mNext).toHaveBeenCalledWith(new Error("jwt expired"));
  });
});
