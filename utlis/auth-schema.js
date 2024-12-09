const Ajv = require("ajv");

const ajv = new Ajv();

//Schema for user login JSON
const loginSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },

    additionalProperties: false,
  },
};

//Schema for user registration JSON
const registerSchema = {
  type: "object",
  required: [
    "email",
    "password",
    "firstName",
    "lastName",
    "city",
    "zipCode",
    "address",
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

const loginJSONValidation = ajv.compile(loginSchema);
const registerJSONValidation = ajv.compile(registerSchema);

module.exports = { loginJSONValidation, registerJSONValidation };
