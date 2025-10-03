const fs = require("fs");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");
const mealRouter = require("./routers/mealRouter");
const orderRouter = require("./routers/orderRouter");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const restaurantRouter = require("./routers/restaurantRouter");

const app = express();

const apiVersion = "/api/v1";
const dir = "./images";

const dbUri = process.env.DB_URI;
const host = "localhost";
const port = process.env.PORT || 8080;

app.use(
  `${apiVersion}/api-docs`,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

app.use(express.json());
app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   next();
// });
app.use(`${apiVersion}/users`, userRouter);
app.use(`${apiVersion}/restaurants`, restaurantRouter);

app.get(`/`, (req, res) => {
  res.send(`Hello World!`);
});

app.get(`${apiVersion}/`, (req, res) => {
  res.send(`API version ${apiVersion} is running`);
});

app.use(`${apiVersion}/restaurants`, restaurantRouter);
app.use(`${apiVersion}/users`, userRouter);
app.use(`${apiVersion}/auth`, authRouter);
app.use(`${apiVersion}/meals`, mealRouter);
app.use(`${apiVersion}/carts`, orderRouter);

mongoose
  .connect(dbUri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on http://${host}:${port}${apiVersion}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
