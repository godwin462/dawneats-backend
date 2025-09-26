const { Schema, model } = require("mongoose");

const authSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    otp: {
      type: String,
      validate: {
        validator: (v) => v.length === 4,
        message: () => `OTP must be 4 characters!`,
      },
      required: [true, "OTP not provided!"],
    },
    expire: {
      trype: Date,
      required: true,
    },
    isExpired: {
      type: Boolean,
      required: true,
      default: () => new Date.now() >= this.expire,
    },
  },
  { timestamps: true }
);

const AuthModel = model("Auth", authSchema);
module.exports = AuthModel;
