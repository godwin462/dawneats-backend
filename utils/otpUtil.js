const OtpModel = require("../models/OtpModel");
const otpGenerator = require("otp-generator");
const { FIVE_MINUTES_MS } = require("./time");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const OTP_TRIALS = 3;
const otpLifeTime = process.env.OTP_EXPIRY_DATE;

exports.createOtp = async (userId) => {
  try {
    let otp = otpGenerator.generate(3, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });
    otp = jwt.sign({ otp }, "permiscus", { expiresIn: `${otpLifeTime}m` });
    const auth = await OtpModel.create({
      userId,
      otp,
    });
    return auth;
  } catch (error) {
    throw error;
  }
};

exports.updateOtp = async (userId, otp) => {
  try {
    const auth = await OtpModel.findOne({ userId });
    if (!auth) {
      return false;
    }

    auth.otp = jwt.sign({ otp }, "permiscus", { expiresIn: `${otpLifeTime}m` });

    await auth.save();
    return true;
  } catch (error) {
    throw error;
  }
};

exports.verifyOtp = async (userId, otp) => {
  let auth;
  try {
    auth = await OtpModel.findOne({ userId });
    if (!auth) {
      return { status: false, message: "Please request a new OTP" };
    }

    // console.log(auth);
    const otpIsValid = jwt.verify(auth.otp, "permiscus");
    // console.log(otpIsValid);
    if (!otpIsValid.otp) {
      return {
        status: false,
        message: "OTP expired, Please request a new OTP",
      };
    }
    // console.log(auth.createdAt, auth.updatedAt, new Date(Date.now() ));
    if (auth.trials >= OTP_TRIALS) {
      auth.trials = 0;
      otp = jwt.sign({ otp: otpIsValid.otp }, "permiscus", { expiresIn: `${otpLifeTime}m` });
      auth.otp = otp;
      console.log(`reseting for otp to 0 `);
      await auth.save();
      //  return { status: false, message: "" };
    }
    if (otp !== otpIsValid.otp) {
      auth.trials += 1;
      await auth.save();
      return {
        status: false,
        message: "Invalid OTP, check your email and try again",
      };
    }

    if (auth.trials >= OTP_TRIALS) {
      return {
        status: false,
        message: "Too many attempts, wait 5 mins and try again",
      };
    }

    await OtpModel.deleteMany({ userId });
    return { status: true, message: "OTP verified successfully" };
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // moment("20111031", "YYYYMMDD").fromNow();
      console.log("Token has expired", error.expiredAt);
      return {
        status: false,
        message: "OTP expired, please request a new OTP",
      };
    }
    throw error;
  }
};
