const { Schema, model } = require("mongoose");

const orderItemSchema = new Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mealId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Meal",
      required: true,
    },
    totalItem: {
      type: Number,
      required: true,
      default: 1,
    },
    cost: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const OrderItemModel = model("OrderItem", orderItemSchema);
module.exports = OrderItemModel;
