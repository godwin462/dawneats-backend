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
    const { restaurantId } = req.params;
    const { name, description, price } = req.body;
    image = req.file;

    const restaurant = await RestaurantModel.findById(restaurantId);
    if (!restaurant) {
      if (image?.path) fs.unlinkSync(image.path);
      return res.status(404).json({
        message: "Restaurant not found, meal must belong to a restaurant",
      });
    }

    if (!name) {
      return res.status(400).json({ message: "Please provide a name for the meal" });
    }
    if (!image) {
      return res.status(400).json({ message: "Please provide an image for the meal" });
    }
    if (!description) {
      return res.status(400).json({ message: "Please provide a description for the meal" });
    }
    if (!price) {
      return res.status(400).json({ message: "Please provide a price for the meal" });
    }

    let mealImage = null;
    if (image?.path) {
      mealImage = await uploadCloudinaryImage(image.path);
      fs.unlinkSync(image.path);
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
    if (image?.path) fs.unlinkSync(image.path);
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const meals = await MealModel.find();
    res.status(200).json({
      message: "All meals below",
      total: meals.length,
      data: meals,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await MealModel.findById(id);

    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
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

exports.update = async (req, res) => {
  let image = null;
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;
    image = req.file;

    let meal = await MealModel.findById(id);
    if (!meal) {
      if (image?.path) fs.unlinkSync(image.path);
      return res.status(404).json({ message: "Meal not found" });
    }

    let mealImage = meal.image;
    if (image?.path) {
      if (meal.image?.public_id) {
        await deleteCloudinaryImage(meal.image.public_id);
      }
      mealImage = await uploadCloudinaryImage(image.path);
      fs.unlinkSync(image.path);
    }

    Object.assign(meal, {
      name: name ?? meal.name,
      description: description ?? meal.description,
      price: price ?? meal.price,
      image: mealImage,
    });

    await meal.save();
    res.status(200).json({ message: "Meal updated successfully", data: meal });
  } catch (error) {
    if (image?.path) fs.unlinkSync(image.path);
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const meal = await MealModel.findByIdAndDelete(id);

    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    if (meal.image?.public_id) {
      await deleteCloudinaryImage(meal.image.public_id);
    }

    res.status(200).json({
      message: "Meal deleted successfully",
      data: meal,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server error",
      error: error.message,
    });
  }
};

exports.getRestaurantMeals = async (req, res) => {
  try {
    const { restaurantId } = req.params;
    const restaurant = await RestaurantModel.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const meals = await MealModel.find({ restaurantId });
    const total = meals.length;

    res.status(200).json({
      message: total > 0 ? "All meals below" : "Restaurant currently has no meals",
      total,
      data: meals,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server error",
      error: error.message,
    });
  }
};
