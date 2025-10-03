const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "OrderItem",
      },
    ],
    addressId: {
      type: Schema.Types.ObjectId,
      ref: "Address",
    },
    paymentId: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
    },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
    totalItems: {
      type: Number,
      required: true,
      default: () => this.orderItems.length,
    },
    totalCost: {
      type: Number,
      required: true,
      default: () => this.subTotalCost + this.deliveryFee + this.serviceFee,
    },
    subTotalCost: {
      type: Number,
      required: true,
      default: () => this.orderItems.reduce((acc, item) => acc + item.cost, 0),
    },
    deliveryFee: {
      type: Number,
      default: 0,
    },
    serviceFee: {
      type: Number,
      default: 0,
    },
    instruction: {
      type: String,
      trim: true,
    },
    note: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const OrderModel = model("Order", orderSchema);
module.exports = OrderModel;
