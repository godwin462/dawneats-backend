const MealModel = require("../models/mealModel");
const RestaurantModel = require("../models/restaurantModel");
const {
  uploadCloudinaryImage,
  deleteCloudinaryImage,
} = require("../utils/cloudinary");
const fs = require("fs");

exports.CreateMeal = async (req, res) => {
  let image = null;
  try {
    const { restaurantId = undefined } = req.params || {};
    const {
      name = undefined,
      description = undefined,
      price = undefined,
    } = req.body || {};

    image = req.file;

    // console.log(req.body, image);
    const restaurant = await RestaurantModel.findById(restaurantId);
    if (!restaurant) {
      if (image && image.path) {
        if (fs.existsSync(image.path)) fs.unlinkSync(image.path);
      }
      return res.status(404).json({
        message: "Restaurant not found, meal must belong to a restaurant",
      });
    }
    let mealImage = null;
    if (!name || !image || !description || !price) {
      if (image && image.path) {
        mealImage = await uploadCloudinaryImage(image.path);
        if (fs.existsSync(image.path)) fs.unlinkSync(image.path);
        image = null;
      }
      return res.status(400).json({
        message:
          "Please provide all the required fields (name, image, description, price)",
      });
    }

    if (image && image.path) {
      mealImage = await uploadCloudinaryImage(image.path);
      if (fs.existsSync(image.path)) fs.unlinkSync(image.path);
    }
    const meal = new MealModel({
      name,
      restaurantId,
      description,
      price,
      image: mealImage,
    });
    await meal.save();
    res.status(201).json({
      message: "Meal created successfully",
      data: meal,
    });
  } catch (error) {
    if (image && image.path) {
      if (fs.existsSync(image.path)) fs.unlinkSync(image.path);
    }
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getAllMeals = async (req, res) => {
  try {
    const meal = await MealModel.find();

    const total = meal.length;
    res.status(200).json({
      message:
        total > 0 ? "All meal below" : "Restaurants currently have no meal",
      total,
      data: meal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
exports.getOneMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await MealModel.findById(id);

    if (!meal) {
      return res.status(404).json({
        message: "Meal not found",
      });
    }
    res.status(200).json({
      message: "Meal found successfully",
      data: meal,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
exports.updateMeal = async (req, res) => {
  let image = null;
  try {
    const { id, restaurantId } = req.params;
    const {
      name = undefined,
      description = undefined,
      price = undefined,
    } = req.body || {};

    image = req.file;

    const restaurant = await RestaurantModel.findById(restaurantId);

    if (!restaurant) {
      if (image && image.path) {
        if (fs.existsSync(image.path)) fs.unlinkSync(image.path);
      }
      return res.status(404).json({
        message: "Restaurant not found, meal must belong to a restaurant",
      });
    }

    let mealImage = null;

    const meal = await MealModel.findById(id);
    if (!meal) {
      if (image && image.path) {
        if (fs.existsSync(image.path)) fs.unlinkSync(image.path);
      }
      return res.status(404).json({
        message: "meal not found",
      });
    }

    if (image && image.path) {
      mealImage = await uploadCloudinaryImage(image.path);
      if (fs.existsSync(image.path)) fs.unlinkSync(image.path);
      // image = null;
    }
    Object.assign(meal, { name, image: mealImage, description, price });
    const updatedMeal = await MealModel.findByIdAndUpdate(id, meal, {
      new: true,
    });
    res.status(200).json({
      message: "Meal updated successfully",
      data: updatedMeal,
    });
  } catch (error) {
    if (image && image.path) {
      if (fs.existsSync(image.path)) fs.unlinkSync(image.path);
    }
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
exports.deleteMeal = async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await MealModel.findByIdAndDelete(id, { new: true });
    if (!meal) {
      return res.status(404).json({
        message: "Meal not found",
      });
    }
    if (meal.image && meal.image.public_id) {
      await deleteCloudinaryImage(meal.image.public_id);
    }
    res.status(200).json({
      message: "Meal deleted successfully",
      data: meal,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server error",
      error: error.message,
    });
  }
};

exports.getRestaurantMeals = async (req, res) => {
  try {
    // console.log("I am working!");
    const { restaurantId } = req.params;
    const restaurant = await RestaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }
    const meal = await MealModel.find({ restaurantId });
    const total = meal.length;
    res.status(200).json({
      message:
        total > 0 ? "All meal below" : "Restaurant currently have no meal",
      total,
      data: meal,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server error",
      error: error.message,
    });
  }
};
