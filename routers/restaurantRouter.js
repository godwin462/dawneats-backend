const {
  createRestaurant,
  getAllRestaurant,
  getOneRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../controller/restaurantController");
const { checkLogin } = require("../middlewares/authenticationMiddleware");
const upload = require("../middlewares/multer");

const restaurantRouter = require("express").Router();

restaurantRouter.post(
  "/",
  checkLogin,
  upload.single("image"),
  createRestaurant
);
restaurantRouter.get("/", getAllRestaurant);
restaurantRouter.get("/:id", getOneRestaurant);
restaurantRouter.put(
  "/:id",
  checkLogin,
  upload.single("image"),
  updateRestaurant
);
restaurantRouter.delete("/:id", checkLogin, deleteRestaurant);

module.exports = restaurantRouter;
