const { getAllUsers, getUserById } = require("../controller/userControlller");
const userRouter = require("express").Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);

module.exports = userRouter;
