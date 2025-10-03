const mongoose = require("mongoose");
const RestaurantModel = require("../models/restaurantModel");

const data = [
  {
    image: {
      public_id: "Frame_44_odtz2v",
      secure_url:
        "https://res.cloudinary.com/ddv0ffqnj/image/upload/v1759421374/Frame_44_odtz2v.png",
    },
    name: "Wilmer",
    address: "The Dines",
    restaurantRating: 4.2,
    restaurantReviews: [],
  },
  {
    image: {
      public_id: "Frame_44_1_buml67",
      secure_url:
        "https://res.cloudinary.com/ddv0ffqnj/image/upload/v1759421374/Frame_44_1_buml67.png",
    },
    name: "Trinity",
    address: "The Place",
    restaurantRating: 4.2,
    restaurantReviews: [],
  },
];

mongoose
  .connect(
    "mongodb+srv://anadulimited_db_user:eipFX0ybwSWwAJJS@cluster0.kc23mgi.mongodb.net/development"
  )
  .then(() =>
    RestaurantModel.deleteMany({}).then(() => {
      RestaurantModel.insertMany(data).then(() =>
        console.log(`Seeding completed without errors`)
      );
    })
  )
  .catch((err) => console.log(err.message));
