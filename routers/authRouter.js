const authRouter = require("express").Router();
const {
  register,
  login,
  verifyLogin,
  verifyRegistration,
} = require("../controller/authController");

authRouter.post("/signup", register);
authRouter.post("/verify-signup/:userId", verifyRegistration);
authRouter.post("/signin", login);
authRouter.post("/verify-signin/:userId", verifyLogin);

module.exports = authRouter;
