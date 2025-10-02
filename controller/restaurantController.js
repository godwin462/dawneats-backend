const LocationModel = require("../models/locationModel");
const RestaurantModel = require("../models/restaurantModel");
const {
  uploadCloudinaryImage,
  deleteCloudinaryImage,
} = require("../utils/cloudinary");
const fs = require("fs");

exports.createRestaurant = async (req, res) => {
  let image = null;
  let restaurantImage = null;
  try {
    const { name = undefined, address = undefined } = req.body || {};

    image = req.file;

    switch (true) {
      case !name:
        res.status(400).json({
          message: "Please provide a name for the restaurant",
        });
      case !image:
        res.status(400).json({
          message: "Please provide an image for the restaurant",
        });
      case !address:
        res.status(400).json({
          message: "Please provide a address for the restaurant",
        });
      default:
        if (image && image?.path) {
          restaurantImage = await uploadCloudinaryImage(image?.path);
          if (fs.existsSync(image?.path)) fs.unlinkSync(image?.path);
          image = null;
        }
    }

    if (image && image?.path) {
      restaurantImage = await uploadCloudinaryImage(image?.path);
      if (fs.existsSync(image?.path)) fs.unlinkSync(image?.path);
      image = null;
    }
    const location = new LocationModel({ address });

    const restaurant = new RestaurantModel({
      name,
      address: location._id,
      image: restaurantImage,
    });
    location.secondaryKey = restaurant._id;
    await location.save();
    await restaurant.save();
    res.status(201).json({
      message: "Restaurant created successfully",
      data: restaurant,
    });
  } catch (error) {
    if (image && image?.path) {
      if (fs.existsSync(image?.path)) fs.unlinkSync(image?.path);
    }
    if (restaurantImage && restaurantImage.public_id) {
      await deleteCloudinaryImage(restaurantImage.public_id);
    }
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

exports.getAllRestaurant = async (req, res) => {
  try {
    const restaurant = await RestaurantModel.find();

    const total = restaurant.length;
    res.status(200).json({
      message: total > 0 ? "All restaurant below" : "No restaurant found",
      total,
      data: restaurant,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
exports.getOneRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await RestaurantModel.findById(id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }
    res.status(200).json({
      message: "Restaurant found successfully",
      data: restaurant,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
exports.updateRestaurant = async (req, res) => {
  let image = null;
  try {
    const { id } = req.params;
    const {
      name = undefined,
      address = undefined,
      restaurantRating = undefined,
      userId = undefined,
      review = undefined,
      rating = undefined,
    } = req.body || {};

    image = req.file;

    const restaurant = await RestaurantModel.findById(id);

    if (!restaurant) {
      if (image && image?.path) {
        if (fs.existsSync(image?.path)) fs.unlinkSync(image?.path);
      }
      return res.status(404).json({
        message: "Restaurant not found, restaurant must belong to a restaurant",
      });
    }

    let restaurantImage;

    if (!restaurant) {
      if (image && image?.path) {
        if (fs.existsSync(image?.path)) fs.unlinkSync(image?.path);
      }
      return res.status(404).json({
        message: "restaurant not found",
      });
    }

    if (image && image?.path) {
      restaurantImage = await uploadCloudinaryImage(image?.path);
      if (fs.existsSync(image?.path)) fs.unlinkSync(image?.path);
      image = null;
    }
    Object.assign(restaurant, {
      name,
      restaurantRating,
      userId,
      review,
      rating,
      image: restaurantImage,
    });
    console.log(
      "cloudinary image uploading",
      restaurantImage,
      image,
      restaurant
    );
    await RestaurantModel.findByIdAndUpdate(id, restaurant, { new: true });

    res.status(200).json({
      message: "Restaurant updated successfully",
      data: restaurant,
    });
  } catch (error) {
    if (image && image?.path) {
      if (fs.existsSync(image?.path)) fs.unlinkSync(image?.path);
    }
    // console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
exports.deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await RestaurantModel.findByIdAndDelete(id, {
      new: true,
    });
    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }
    if (restaurant.image && restaurant.image.public_id) {
      await deleteCloudinaryImage(restaurant.image.public_id);
    }
    res.status(200).json({
      message: "Restaurant deleted successfully",
      data: restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server error",
      error: error.message,
    });
  }
};
