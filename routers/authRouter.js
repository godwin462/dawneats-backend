const authRouter = require("express").Router();
const {
  register,
  login,
  verifyLogin,
  verifyRegistration,
} = require("../controller/authController");
const {verifyOtp} = require("../middlewares/verifyOtpMiddleware");

authRouter.post("/signup", register);
authRouter.put("/verify-signup/:userId", verifyOtp, verifyRegistration);
authRouter.post("/signin", login);
authRouter.put("/verify-signin/:userId", verifyOtp, verifyLogin);

module.exports = authRouter;
