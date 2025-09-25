const UserModel = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    const total = users.length;
    res.status(200).json({
      message: total > 0 ? "Success" : "No user found",
      total,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User found successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
