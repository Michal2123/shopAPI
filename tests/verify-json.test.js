const {
  loginJSONVeryfi,
  patchUserJSONVerify,
  registerJSONVerify,
} = require("../middleware/veryfi-json");
const { createRequest } = require("node-mocks-http");

describe("Test login JSON schema verifier", () => {
  it("Check if error on wrong schema", () => {
    const mReq = createRequest({
      body: { email: "email@email.com", userName: "userName" },
    });
    const mRes = {};
    const mNext = jest.fn();

    loginJSONVeryfi(mReq, mRes, mNext);
    expect(mNext).toHaveBeenCalledWith(new Error("Wrong login model schema"));
  });
});

describe("Test register JSON schema verifier", () => {
  it("Check if error on wrong schema", () => {
    const mReq = createRequest({
      body: {
        email: "email@email.com",
        password: "password",
        firstName: "firstName",
        lastName: "lastName",
        city: "city",
        zipCode: "zipCode",
        street: "address",
      },
    });
    const mRes = {};
    const mNext = jest.fn();

    registerJSONVerify(mReq, mRes, mNext);
    expect(mNext).toHaveBeenCalledWith(
      new Error("Wrong register model schema")
    );
  });
});

describe("Test user JSON schema verifier", () => {
  it("Check if error on user details wrong schema", () => {
    const mReq = createRequest({
      body: {
        email: "email@email.com",
        firstName: "firstName",
        lastName: "lastName",
        city: "city",
        zipCode: "00-000",
        address: "address",
      },
    });
    const mRes = {};
    const mNext = jest.fn();

    patchUserJSONVerify(mReq, mRes, mNext);
    expect(mNext).toHaveBeenCalledWith(new Error("Wrong user model schema"));
  });

  it("Check if error on user email wrong schema", () => {
    const mReq = createRequest({
      body: {
        email: "email@email.com",
        firstName: "firstName",
      },
    });
    const mRes = {};
    const mNext = jest.fn();

    patchUserJSONVerify(mReq, mRes, mNext);
    expect(mNext).toHaveBeenCalledWith(new Error("Wrong user model schema"));
  });

  it("Check if error on user email wrong schema", () => {
    const mReq = createRequest({
      body: {
        email: "email@email.com",
        password: "password",
      },
    });
    const mRes = {};
    const mNext = jest.fn();

    patchUserJSONVerify(mReq, mRes, mNext);
    expect(mNext).toHaveBeenCalledWith(new Error("Wrong user model schema"));
  });
});
