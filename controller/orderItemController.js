exports.createOrderItem = async (req, res) => {
  try {
    const { orderId, userId, mealId, totalItem, cost } = req.body || {};

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const orderItem = await orderItemModel.findById(orderItemId);
    if (!orderItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Create an order object with the provided data
    const order = await orderModel.create({
      userId,
      orderItemId,
      addressId,
      paymentId,
      status,
      totalItems,
      totalCost,
      subTotalCost,
      deliveryFee,
      serviceFee,
      instruction,
      note,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    // Fetch all orders from the orderModel
    const orders = await orderModel.find();
    // Send the orders as a response
    res.status(200).json({
      message: "Order fetched successfully",
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id; // Get the order ID from the request parameters
    const updatedData = req.body; // The data to update the order with

    // Assuming you have a database function to update the order, it might look like this:
    const updatedOrder = await database.updateOrder(orderId, updatedData);

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//const Order = require('./models/Order'); // make sure to adjust the path to your Order model

exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id; // Get the order ID from the request parameters
    const result = await Order.findByIdAndDelete(orderId); // Delete the order from the database

    if (!result) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
