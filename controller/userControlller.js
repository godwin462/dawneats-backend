const { validateEmail } = require("../middlewares/validateEmail");
const UserModel = require("../models/userModel");
const {
  uploadCloudinaryImage,
  deleteCloudinaryImage,
} = require("../utils/cloudinary");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    const total = users.length;
    res.status(200).json({
      message: total > 0 ? "Users found" : "No user found",
      total,
      data: users,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found, please create an account" });
    }
    res.status(200).json({ message: "User found successfully", data: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  let image = null;
  try {
    const { id } = req.params;
    const {
      firstName = undefined,
      lastName = undefined,
      phone = undefined,
    } = req.body || {};

    if (!firstName && !lastName && !phone) {
      return res
        .status(400)
        .json({ message: "Please provide at least one field to update" });
    }

    const user = await UserModel.findById(id);
    image = req.file;

    if (!user) {
      return res.status(404).json({ message: "User not found, please create an account" });
    }
    let profileImage = null;
    if (image && image.path) {
      profileImage = await uploadCloudinaryImage(image.path);
      fs.unlinkSync(image.path);
    }
    Object.assign(user, { firstName, lastName, phone, profileImage });
    await user.save();
    res.status(200).json({ message: "User updated successfully", data: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found, please create an account" });
    }
    if (user?.profileImage && user?.profileImage?.public_id) {
      await deleteCloudinaryImage(user.profileImage.public_id);
    }

    res.status(200).json({ message: "User deleted successfully", data: user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};
