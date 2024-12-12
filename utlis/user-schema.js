const Ajv = require("ajv");

const ajv = new Ajv();

//Schema for update user data, Shipping details, email and password JSON
const patchUserSchema = {
  type: "object",
  anyOf: [
    {
      required: ["firstName", "lastName", "city", "zipCode", "address"],
      propertyNames: { not: { enum: ["email", "password"] } },
    },
    {
      required: ["email"],
      propertyNames: {
        not: {
          enum: [
            "password",
            "firstName",
            "lastName",
            "city",
            "zipCode",
            "address",
          ],
        },
      },
    },
    {
      required: ["password"],
      propertyNames: {
        not: {
          enum: [
            "email",
            "firstName",
            "lastName",
            "city",
            "zipCode",
            "address",
          ],
        },
      },
    },
  ],
  properties: {
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
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
};

const patchUserJSONValidation = ajv.compile(patchUserSchema);

module.exports = patchUserJSONValidation;
