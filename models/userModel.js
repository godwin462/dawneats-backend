const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "User first name required!"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "User last name required!"],
    },
    email: {
      type: String,
      trim: true,
      required: [true, "User email required!"],
      unique: [true, "User email already exists!"],
    },
    phone: {
      type: String,
      trim: true,
      // validate: {
      //   validator: (v) =>
      //     /^[+]{1}(?:[0-9\-\\(\\)\\/.]\s?){6,15}[0-9]{1}$/.test(v),
      //   message: (props) => `${props.value} is not a valid phone number!`,
      // },
      required: [true, "User phone number required"],
    },
    profileImage: {
      imageId: {
        type: String,
      },
      secureUrl: {
        type: String,
      },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
