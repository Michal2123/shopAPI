jest.mock("../db/products-db");
const selectProductsDB = require("../db/products-db");
const request = require("supertest");
const app = require("../app");

selectProductsDB.mockResolvedValue({
  statusCode: 200,
  data: [
    {
      id: 1,
      name: "product",
      describe: "describer of product",
      image: "link to image",
      price: 1,
      category: "product category",
    },
  ],
});

describe("Get /product", () => {
  it("fetch all products", async () => {
    const response = await request(app).get("/product");
    expect(response.statusCode).toBe(200);
    expect(response).toHaveProperty("body", {
      statusCode: 200,
      data: [
        {
          id: 1,
          name: "product",
          describe: "describer of product",
          image: "link to image",
          price: 1,
          category: "product category",
        },
      ],
    });
  });
});
