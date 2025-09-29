const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

exports.checkLogin = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        message: "Authentication required!",
      });
    }
    token = token.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Authentication required!",
      });
    }
    await jwt.verify(token, "permiscus", async (error, result) => {
      if (error) {
        return res.status(401).json({
          message: "Session expired",
        });
      } else {
        const user = await UserModel.findById(result.id);
        if (!user) {
          return res.status(401).json({
            message: "Session expired",
          });
        }
        // console.log(user);
        req.user = user._id;
      }
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
