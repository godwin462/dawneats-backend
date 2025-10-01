const {  getOne, getAll, deleteRestaurant, createRestaurant, updateRestaurant } = require("../controller/restaurantController");

const restaurantRouter = require("express").Router();

restaurantRouter.post("/", createRestaurant);
restaurantRouter.get("/", getAll);
restaurantRouter.get("/:id", getOne);
restaurantRouter.put("/:id", updateRestaurant);
restaurantRouter.delete("/:id", deleteRestaurant);

module.exports = restaurantRouter;