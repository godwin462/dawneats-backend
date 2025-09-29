const OtpModel = require("../models/OtpModel");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const OTP_TRIALS = 3;
const otpLifeTime = process.env.OTP_EXPIRY_DATE;

exports.verifyOtp = async (req, res, next) => {
  let auth;
  try {
    const { userId } = req.params;
    const { otp } = req.body;

    auth = await OtpModel.findOne({ userId });

    if (!auth) {
      return res.status(400).json({ message: "Please request a new OTP" });
    }

    const otpIsValid = jwt.verify(auth.otp, "permiscus");
    if (!otpIsValid.otp) {
      return res
        .status(400)
        .json({ message: "OTP expired, Please request a new OTP" });
    }

    if (auth.trials >= OTP_TRIALS) {
      auth.trials = 0;
      otp = jwt.sign({ otp: otpIsValid.otp }, "permiscus", {
        expiresIn: `${otpLifeTime}m`,
      });
      auth.otp = otp;
      console.log(`reseting for otp to 0 `);
      await auth.save();
    }
    if (otp !== otpIsValid.otp) {
      auth.trials += 1;
      await auth.save();
      return res.status(400).json({
        message: "Invalid OTP, check your email and try again",
      });
    }

    if (auth.trials >= OTP_TRIALS) {
      return res
        .status(400)
        .json({ message: "Too many attempts, wait 5 mins and try again" });
    }

    await OtpModel.deleteMany({ userId });
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.log("Token has expired", error.expiredAt);
      return res
        .status(400)
        .json({ message: "OTP expired, please request a new OTP" });
    }
    return res
      .status(500)
      .json({ message: `Internal server error`, error: error.message });
  }
};
