const mongoose = require("mongoose");
const MealModel = require("../models/mealModel");

const data = [
  {
    image: {
      public_id: "Frame_51_hjxaei",
      secure_url:
        "https://res.cloudinary.com/ddv0ffqnj/image/upload/v1759419441/Frame_51_hjxaei.png",
    },
    name: "Oatmeal (with blueberry and toppings)",
    restaurantId: "68dea548c0c42a4535170a11",
    description: "Please provide all the required fields",
    price: 2000,
  },
  {
    image: {
      public_id: "Frame_51_1_qddoqr",
      secure_url:
        "https://res.cloudinary.com/ddv0ffqnj/image/upload/v1759419433/Frame_51_1_qddoqr.png",
    },
    name: "Akara (bean cake) and pap with milk",
    restaurantId: "68dea548c0c42a4535170a11",
    description: "Please provide all the required fields",
    price: 2500,
  },
  {
    image: {
      public_id: "Frame_51_2_izidit",
      secure_url:
        "https://res.cloudinary.com/ddv0ffqnj/image/upload/v1759419433/Frame_51_2_izidit.png",
    },
    name: "Moi moi with eggs",
    restaurantId: "68dea548c0c42a4535170a11",
    description: "Please provide all the required fields",
    price: 1000,
  },
  {
    image: {
      public_id: "Frame_51_3_re7nbb",
      secure_url:
        "https://res.cloudinary.com/ddv0ffqnj/image/upload/v1759419433/Frame_51_3_re7nbb.png",
    },
    name: "Fluffy scrambled eggs and toast bread",
    restaurantId: "68dea548c0c42a4535170a11",
    description: "Please provide all the required fields",
    price: 3000,
  },
  {
    image: {
      public_id: "Frame_51_4_g2syby",
      secure_url:
        "https://res.cloudinary.com/ddv0ffqnj/image/upload/v1759419434/Frame_51_4_g2syby.png",
    },
    name: "Spicy chicken breast",
    restaurantId: "68dea548c0c42a4535170a11",
    description: "Please provide all the required fields",
    price: 4000,
  },
  {
    image: {
      public_id: "Frame_51_5_hufrom",
      secure_url:
        "https://res.cloudinary.com/ddv0ffqnj/image/upload/v1759419434/Frame_51_5_hufrom.png",
    },
    name: "Pancakes",
    restaurantId: "68dea548c0c42a4535170a11",
    description: "Please provide all the required fields",
    price: 3000,
  },
  {
    image: {
      public_id: "Frame_51_6_fg6bk0",
      secure_url:
        "https://res.cloudinary.com/ddv0ffqnj/image/upload/v1759419434/Frame_51_6_fg6bk0.png",
    },
    name: "Fried eggs and fried plantain",
    restaurantId: "68dea548c0c42a4535170a11",
    description: "Please provide all the required fields",
    price: 1500,
  },
  {
    image: {
      public_id: "Frame_51_7_qsryfs",
      secure_url:
        "https://res.cloudinary.com/ddv0ffqnj/image/upload/v1759419434/Frame_51_7_qsryfs.png",
    },
    name: "Coconut curry rice and grilled chicken",
    restaurantId: "68dea548c0c42a4535170a11",
    description: "Please provide all the required fields",
    price: 5500,
  },
  {
    image: {
      public_id: "Frame_51_8_wucgci",
      secure_url:
        "https://res.cloudinary.com/ddv0ffqnj/image/upload/v1759419435/Frame_51_8_wucgci.png",
    },
    name: "Crispy chicken salad and eggs",
    restaurantId: "68dea548c0c42a4535170a11",
    description: "Please provide all the required fields",
    price: 5000,
  },
  {
    image: {
      public_id: "Frame_51_9_r6u2bv",
      secure_url:
        "https://res.cloudinary.com/ddv0ffqnj/image/upload/v1759419434/Frame_51_9_r6u2bv.png",
    },
    name: "Fruit salad",
    restaurantId: "68dea548c0c42a4535170a11",
    description: "Please provide all the required fields",
    price: 2000,
  },
  {
    image: {
      public_id: "Frame_51_10_km8013",
      secure_url:
        "https://res.cloudinary.com/ddv0ffqnj/image/upload/v1759419435/Frame_51_10_km8013.png",
    },
    name: "Fried chicken",
    restaurantId: "68dea548c0c42a4535170a11",
    description: "Please provide all the required fields",
    price: 3000,
  },
  {
    image: {
      public_id: "Frame_51_11_byc6iw",
      secure_url:
        "https://res.cloudinary.com/ddv0ffqnj/image/upload/v1759419435/Frame_51_11_byc6iw.png",
    },
    name: "Ewa agoyin and bread",
    restaurantId: "68dea548c0c42a4535170a11",
    description: "Please provide all the required fields",
    price: 2000,
  },
  {
    image: {
      public_id: "Frame_51_12_fffnka",
      secure_url:
        "https://res.cloudinary.com/ddv0ffqnj/image/upload/v1759419440/Frame_51_12_fffnka.png",
    },
    name: "Bread and akara",
    restaurantId: "68dea548c0c42a4535170a11",
    description: "Please provide all the required fields",
    price: 1500,
  },
  {
    image: {
      public_id: "Frame_51_13_vcskdn",
      secure_url:
        "https://res.cloudinary.com/ddv0ffqnj/image/upload/v1759419440/Frame_51_13_vcskdn.png",
    },
    name: "White rice, stew and chicken",
    restaurantId: "68dea548c0c42a4535170a11",
    description: "Please provide all the required fields",
    price: 3000,
  },
  {
    image: {
      public_id: "Frame_51_14_ynycnc",
      secure_url:
        "https://res.cloudinary.com/ddv0ffqnj/image/upload/v1759419440/Frame_51_14_ynycnc.png",
    },
    name: "Oatmeal with peanut butter",
    restaurantId: "68dea548c0c42a4535170a11",
    description: "Please provide all the required fields",
    price: 2000,
  },
  {
    image: {
      public_id: "Frame_51_15_lkdcrh",
      secure_url:
        "https://res.cloudinary.com/ddv0ffqnj/image/upload/v1759419441/Frame_51_15_lkdcrh.png",
    },
    name: "Tasty grilled fish",
    restaurantId: "68dea548c0c42a4535170a11",
    description: "Please provide all the required fields",
    price: 3000,
  },
];
mongoose
  .connect(
    "mongodb+srv://anadulimited_db_user:eipFX0ybwSWwAJJS@cluster0.kc23mgi.mongodb.net/development"
  )
  .then(() =>
    MealModel.deleteMany({}).then(() => {
      MealModel.insertMany(data).then((result) =>
        console.log(`Seeding completed without errors`)
      );
    })
  )
  .catch((err) => console.log(err.message));
