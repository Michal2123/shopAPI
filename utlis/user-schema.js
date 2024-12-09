const Ajv = require("ajv");

const ajv = new Ajv();

//Schema for update user data, Shipping details, email and password JSON
const patchUserSchema = {
  type: "object",
  anyOf: [
    {
      required: ["firstName", "lastName", "city", "zipCode", "address"],
      properties: {
        firstName: {
          type: "string",
        },
        lastName: {
          type: "string",
        },
        city: {
          type: "string",
        },
        zipCode: {
          type: "string",
        },
        address: {
          type: "string",
        },
        additionalProperties: false,
      },
    },
    {
      required: ["email"],
      properties: {
        email: {
          type: "string",
        },
        additionalProperties: false,
      },
    },
    {
      required: ["password"],
      properties: {
        password: {
          type: "string",
        },
        additionalProperties: false,
      },
    },
  ],
};

const patchUserJSONValidation = ajv.compile(patchUserSchema);

module.exports = patchUserJSONValidation;
