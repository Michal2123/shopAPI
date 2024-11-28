const express = require("express");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const historyRoute = require("./routes/history");
const productRoute = require("./routes/products");
const userRoute = require("./routes/user");
const { port } = require("./config");

const errorHandler = require("./middleware/error-handler");

const app = express();
var jsonParser = bodyParser.json();

//Middlewere
app.use(jsonParser);

//Routes
app.use("/auth", authRoute);
app.use("/history", historyRoute);
app.use("/product", productRoute);
app.use("/user", userRoute);

//Catch all not found routes
app.use((req, res, next) => {
  next(createError(404));
});

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
