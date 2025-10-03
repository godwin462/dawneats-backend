const {
  createOrder,
  getAllOrders,
  updateOrder,
  deleteOrder,
  getOneOrder,
  getAllUsersOrders,
} = require("../controller/orderController");
const { checkLogin } = require("../middlewares/authenticationMiddleware");

const orderRouter = require("express").Router();

// const uploads = require('../middleware/maulter');

orderRouter.post("/",
  // checkLogin,
   createOrder);
orderRouter.get("/",
  // checkLogin,
   getAllOrders);
orderRouter.put("/:orderId",
  // checkLogin,
   updateOrder);
orderRouter.get("/:orderId",
  // checkLogin,
   getOneOrder);
orderRouter.get("/:userId",
  // checkLogin,
   getAllUsersOrders);
orderRouter.delete("/:orderId",
  // checkLogin,
   deleteOrder);

module.exports = orderRouter;
