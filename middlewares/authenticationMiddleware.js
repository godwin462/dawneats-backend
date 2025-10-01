const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

exports.checkLogin = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        message: "Not authenticated, authentication required!",
      });
    }
    token = token.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Not authenticated, authentication required!",
      });
    }
    await jwt.verify(token, "permiscus", async (error, result) => {
      if (error) {
        return res.status(401).json({
          message: "Session expired, please login again",
        });
      }
      if (!result || !result.id) {
        return res.status(401).json({
          message: "Session expired, please login again",
        });
      }
      const user = await UserModel.findById(result.id);
      if (!user) {
        return res.status(400).json({
          message: "User not found, please create an account",
        });
      }
      // console.log(user);
      req.user = user._id;

      return next();
    });
    // next();
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
