const { Schema, model } = require("mongoose");

// Define the Location Schema
const LocationSchema = new Schema(
  {
    primaryKey: {
      type: Schema.Types.ObjectId,
      required: [true, "Location primary key required!"],
    },
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
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
