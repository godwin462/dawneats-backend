const {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controller/orderController");

const orderRouter = require("express").Router();

// const uploads = require('../middleware/maulter');

orderRouter.post("/", createOrder);
orderRouter.get("/", getAllOrders);
orderRouter.put("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrder);

module.exports = orderRouter;
