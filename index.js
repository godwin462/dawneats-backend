const fs = require("fs");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");
const mealRouter = require("./routers/mealRouter");
const { transporter } = require("./email/nodemailer");

const app = express();
const apiVersion = "/api/v1";
const dir = "./images";

const dbUri = process.env.DB_URI;
const host = "localhost";
const port = process.env.PORT || 8080;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

app.use(express.json());
app.use(cors());

app.use((err, req, res, next) => {
  if (err)
    return res
      .status(500)
      .json({ message: "Global Server Error", error: err.message });
  next();
});
app.get("/api/v1/", (req, res) => {
  try {
    // const token = req.headers.authorization.split(" ")[1];

    // const { id } = jwt.verify(token, "permiscus", async (err, decoded) => {
    //   if (err) return res.status(500).json({ message: err.message });
    //   const checkUser = await userModel.findById(id);
    //   res.status(200).json({
    //     message: `Welcome ${checkUser.name}, we are happy to have you here!`,
    //   });
    // });

    res.status(200).json({ message: "Welcome to DawnEats API version 1" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get(`/`, (req, res) => {
  res.send(`Hello World!`);
});

app.get(`${apiVersion}/`, (req, res) => {
  res.send(`API version ${apiVersion} is running`);
});

app.use(`${apiVersion}/users`, userRouter);
app.use(`${apiVersion}/auth`, authRouter);
app.use(`${apiVersion}/meals`, mealRouter);

mongoose
  .connect(dbUri)
  .then(() => {
    console.log("Connected to MongoDB");
    transporter
      .verify()
      .then(() => {
        console.log("Email server is ready to take our messages");
        app.listen(port, () => {
          console.log(
            `Server is running on http://${host}:${port}${apiVersion}`
          );
        });
      })
      .catch((error) => {
        console.log("Error connecting to email server:", error.message);
      });
    // app.listen(port, () => {
    //   console.log(`Server is running on http://${host}:${port}${apiVersion}`);
    // });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
