const UserModel = require("../models/userModel");
const registrationTeplate = require("../templates/registrationTemplate");
const { nodemailerOtpHelper } = require("../email/nodemailer");

const loginOtpTemplate = require("../templates/loginOtpTemplate");
const jwt = require("jsonwebtoken");
const OtpModel = require("../models/OtpModel");
const {sendEmail} = require("../email/mailtrap");

const validateEmail = (email) => {
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(String(email).toLowerCase());
};
const otpLifeTime = process.env.OTP_EXPIRY_DATE;

exports.register = async (req, res) => {
  //   let file;
  try {
    const { firstName, lastName, email, phone } = req.body;

    const existingEmail = await UserModel.findOne({ email });
    const existingPhone = await UserModel.findOne({ phone });

    if (existingEmail || existingPhone) {
      return res
        .status(400)
        .json({ message: "User with the credentials already exists" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Please provide a vlide email!" });
    }

    const user = new UserModel({
      firstName,
      lastName,
      email,
      phone,
    });

    let otp = nodemailerOtpHelper.generateOtp(4);

    const text = `DawnEats Account verification`;
    const html = registrationTeplate(otp);
    await sendEmail({
      email,
      subject: "DawnEats Account Registration",
      text,
      html,
    }); //console.log(otp);

    otp = jwt.sign({ otp }, "permiscus", { expiresIn: `${otpLifeTime}m` });

    await OtpModel.deleteMany({ userId: user._id }); // Delete previous OTPs
    await OtpModel.create({
      userId: user._id,
      otp,
    });

    await user.save();
    res.status(201).json({ message: "OTP sent successfully", data: user });
  } catch (error) {
    console.log(error);
    // if (file && file.path) fs.unlinkSync(file.path);
    res
      .status(400)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Please provide a vlide email!" });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user is blocked from requesting a new OTP
    let otp = nodemailerOtpHelper.generateOtp(4);

    const text = `DawnEats Account verification`;
    const html = loginOtpTemplate(otp);
    await sendEmail({
      email,
      subject: "DawnEats Account Login",
      text,
      html,
    });

    otp = jwt.sign({ otp }, "permiscus", { expiresIn: `${otpLifeTime}m` });

    await OtpModel.deleteMany({ userId: user._id }); // Delete previous OTPs
    await OtpModel.create({
      userId: user._id,
      otp,
    });

    // console.log(otp);
    res.status(200).json({ message: "OTP sent successfully", data: user });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.verifyAuth = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found, please register" });
    }

    token = jwt.sign({ id: userId }, "permiscus", {
      expiresIn: `1d`,
    });

    if (!user.isVerified) user.isVerified = true;
    user.token = token;
    await user.save();

    res.status(200).json({ message: "User verified successful", data: user });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
