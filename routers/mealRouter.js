const mealRouter = require("express").Router();
const {
  CreateMeal,
  getRestaurantMeals,
  getAllMeals,
  getOneMeal,
  deleteMeal,
  updateMeal,
} = require("../controller/mealController");
const { checkLogin } = require("../middlewares/authenticationMiddleware");
const upload = require("../middlewares/multer");

mealRouter.post(
  "/:restaurantId",
  checkLogin,
  upload.single("image"),
  CreateMeal
);
mealRouter.get("/", getAllMeals);
mealRouter.get("/restaurant-meals/:restaurantId", getRestaurantMeals);
mealRouter.get("/:id", getOneMeal);
mealRouter.delete("/:id", checkLogin, deleteMeal);
mealRouter.put(
  "/:restaurantId/:id",
  checkLogin,
  upload.single("image"),
  updateMeal
);

module.exports = mealRouter;
