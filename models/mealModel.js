const { model, Schema } = require("mongoose");

const mealSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
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

const MealModel = model("meals", mealSchema);
module.exports = MealModel;
