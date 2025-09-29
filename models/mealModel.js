const { Schema, default: mongoose } = require("mongoose");

const mealSchema = Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    image: {
      imageId: {
        type: String,
      },
      secureUrl: {
        type: String,
      },
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const mealModel = mongoose.model('meals', mealSchema)
module.exports = mealModel;