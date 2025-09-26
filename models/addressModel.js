const { model, Schema } = require("mongoose");

const addressSchema = new Schema(
  {
    street: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
      default: "Nigeria",
    },
    zipCode: {
      type: String,
      trim: true,
    },
    mapLink: {
      url: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["user", "restaurant", "order"],
      required: true,
    },
  },
  { timestamps: true }
);

const AddressModel = model("Address", addressSchema);
module.exports = AddressModel;
