const UserModel = require("../models/userModel");
const registrationTeplate = require("../templates/registrationTemplate");
const otpGenerator = require("otp-generator");
const { sendEmail } = require("../email/modemailer");
const loginOtpTemplate = require("../templates/loginOtpTemplate");
const jwt = require("jsonwebtoken");
const OtpModel = require("../models/OtpModel");

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
      return res.status(400).json({ message: "User already exists" });
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

    let otp = otpGenerator.generate(4, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });

    const text = `DawnEats Account verification`;
    const html = registrationTeplate(otp);
    await sendEmail({
      email,
      subject: "DawnEats Account Registration",
      text,
      html,
    }); //console.log(otp);

    otp = jwt.sign(otp, "permiscus", { expiresIn: `${otpLifeTime}m` });
    OtpModel.create({
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

exports.verifyRegistration = async (req, res) => {
  try {
    const { userId } = req.params;
    const { otp } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    token = jwt.sign({ id: userId }, "permiscus", { expiresIn: `${otpLifeTime}m` });

    user.isVerified = true;
    user.token = token;
    await user.save();
    res
      .status(200)
      .json({ message: "User signin successful", data: user});
  } catch (error) {
    console.log(error);
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

    let otp = otpGenerator.generate(4, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });

    const text = `DawnEats Account verification`;
    const html = loginOtpTemplate(otp);
    await sendEmail({
      email,
      subject: "DawnEats Account Login",
      text,
      html,
    });
    console.log(otp);
    otp = jwt.sign({ otp }, "permiscus", { expiresIn: `${otpLifeTime}m` });
    await OtpModel.deleteMany({ userId: user._id });
    OtpModel.create({
      userId: user._id,
      otp,
    });
    console.log(otp);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.verifyLogin = async (req, res) => {
  try {
    const { userId } = req.params;
    const { otp } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, "permiscus", { expiresIn: `${otpLifeTime}m` });

    user.token = token;
    await user.save();
    res
      .status(200)
      .json({ message: "User verified successfully", data: user });
    // next();
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
