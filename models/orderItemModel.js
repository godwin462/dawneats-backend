const { Schema, model } = require("mongoose");

const orderItemSchema = new Schema(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mealId: {
      type: Schema.Types.ObjectId,
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
      default: () => this.mealId.price * this.totalItem,
    },
  },
  { timestamps: true }
);

const OrderItemModel = model("OrderItem", orderItemSchema);
module.exports = OrderItemModel;
