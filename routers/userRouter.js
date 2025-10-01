const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controller/userControlller");
const { checkLogin } = require("../middlewares/authenticationMiddleware");
const userRouter = require("express").Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", checkLogin, updateUser);
userRouter.delete("/:id", checkLogin, deleteUser);

module.exports = userRouter;
