const { Schema, model } = require("mongoose");

// Define the Location Schema
const LocationSchema = new Schema(
  {
    secondaryKey: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    longitude: {
      type: Number,
      // required: true,
    },
    latitude: {
      type: Number,
      // required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Create the Mongoose Model
const LocationModel = model("Location", LocationSchema);

module.exports = LocationModel;
