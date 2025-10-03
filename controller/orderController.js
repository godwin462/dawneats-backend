const MealModel = require("../models/mealModel");
const OrderItemModel = require("../models/orderItemModel");
const OrderModel = require("../models/orderModel");
const UserModel = require("../models/userModel");

exports.createOrder = async (req, res) => {
  try {
    let create = false;
    const {
      userId = undefined,
      mealId = undefined,
      orderItemId = undefined,
      addressId = undefined,
      paymentId = undefined,
      status = undefined,
      totalItem = undefined,
      deliveryFee = undefined,
      serviceFee = undefined,
      instruction = undefined,
      note = undefined,
    } = req.body || {};

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let order = await OrderModel.findById(orderItemId);

    if (!order) {
      let orderItem = new OrderItemModel({
        userId,
        mealId,
      });
      order = new OrderModel({
        userId,
        orderItems: [orderItem],
        addressId,
        paymentId,
        status,
        deliveryFee,
        serviceFee,
        instruction,
        note,
      });
      orderItem.orderId = order._id;
      create = true;
    }
    const meal = await MealModel.findById(mealId);
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    // const cost = meal.price * totalItems;
    let orderItem = await OrderItemModel.findById(orderItemId);
    if (!orderItem) {
      orderItem = new OrderItemModel({
        orderId: order._id,
        userId,
        mealId,
      });
      create = true;
    } else {
      Object.assign(orderItem, {
        orderId: order._id,
        userId,
        mealId,
        totalItem,
        cost,
      });
      order = await OrderModel.findOneAndUpdate(
        { _id: orderItemId, orderId: order._id },
        { orderItems: order.orderItems.push(orderItem) },
        { new: true }
      );
      create = false;
    }

    // Create an order object with the provided data
    res.status(200).json({
      message: create
        ? "Order created successfully"
        : "Order updated successfully",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    // Fetch all orders from the orderModel
    const orders = await OrderModel.find();
    // Send the orders as a response
    res.status(200).json({
      message: "Order fetched successfully",
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getOneOrder = async (req, res) => {
  try {
    const { orderId = undefined } = req.params || {};
    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    // Send the order as a response
    res.status(200).json({
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getAllUsersOrders = async (req, res) => {
  try {
    const { userId } = req.body || {};
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const orders = await OrderModel.find({ userId });
    if (!orders) {
      return res
        .status(404)
        .json({ message: "User has not placed any orders" });
    }
    // Send the orders as a response
    res.status(200).json({
      message: "Order fetched successfully",
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//const Order = require('./models/Order'); // make sure to adjust the path to your Order model

exports.deleteOrder = async (req, res) => {
  try {
    const { orderId = undefined } = req.params || {};
    const order = await OrderModel.findByIdAndDelete(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order deleted successfully",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
