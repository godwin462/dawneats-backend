const authRouter = require("express").Router();
const {
  register,
  login,
  verifyAuth,
} = require("../controller/authController");
const { verifyOtp } = require("../middlewares/verifyOtpMiddleware");

authRouter.post("/signup", register);
authRouter.post("/signin", login);
authRouter.put("/verify-otp/:userId", verifyOtp, verifyAuth);

module.exports = authRouter;
