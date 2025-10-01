require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const userRouter = require("./routers/userRouter");
const restaurantRouter = require("./routers/restaurantRouter")
const apiVersion = "/api/v1";

const dbUri = process.env.DB_URI;
const host = "localhost";
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use(`${apiVersion}/users`, userRouter);
app.use(`${apiVersion}/restaurant`, restaurantRouter);

app.get(`/`, (req, res) => {
  res.send(`Hello World!`);
});
app.get(`${apiVersion}/`, (req, res) => {
  res.send(`API version ${apiVersion} is running`);
});

mongoose
  .connect(dbUri)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on http://${host}:${port}${apiVersion}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
