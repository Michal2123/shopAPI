const Ajv = require("ajv");

const ajv = new Ajv();

const loginSchema = {
  type: "object",
  required: ["login", "password"],
  properties: {
    login: {
      type: "string",
    },
    password: {
      type: "string",
    },

    additionalProperties: false,
  },
};

const registerSchema = {
  type: "object",
  required: ["email", "password", "name", "city", "zipCode", "street"],
  properties: {
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
    name: {
      type: "string",
    },
    city: {
      type: "string",
    },
    zipCode: {
      type: "string",
    },
    street: {
      type: "string",
    },
    additionalProperties: false,
  },
};

const loginJSONValidation = ajv.compile(loginSchema);
const registerJSONValidation = ajv.compile(registerSchema);

module.exports = { loginJSONValidation, registerJSONValidation };
