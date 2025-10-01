const {Schema, model} = require("mongoose");

const orderSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderItem",
      required: true,
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
    },
    paymentId: {
      type: mongoose.Schema.Types.ObjectId,
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
      default: 1,
    },
    totalCost: {
      type: Number,
      required: true,
    },
    subTotalCost: {
      type: Number,
      required: true,
    },
    deliveryFee: {
      type: Number,
    },
    serviceFee: {
      type: Number,
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
