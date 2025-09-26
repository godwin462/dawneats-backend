require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const userRouter = require("./routers/userRouter");
const apiVersion = "/api/v1";

const dbUri = process.env.DB_URI;
const host = "localhost";
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use(`${apiVersion}/users`, userRouter);

app.use((err, req, res, next) => {
  if (err) return res.status(500).json({ message: err.message });
  next();
});

app.get("/api/v1/", (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const { id } = jwt.verify(token, "permiscus", async (err, decoded) => {
      if (err) return res.status(500).json({ message: err.message });
      const checkUser = await userModel.findById(id);
      res.status(200).json({
        message: `Welcome ${checkUser.name}, we are happy to have you here!`,
      });
    });
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
