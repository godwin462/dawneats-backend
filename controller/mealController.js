const mealModel = require('../models/mealModel');
const UserModel = require('../models/userModel');

exports.CreateMeal = async (req,res) => {
    try {
       const {id} = req.params;
       const{name,resturant,description,price,image} = req.body;

        const meal = new mealModel({
            name,
            resturant,
            description,
            price,
            image
        });
        //await meal.save();
        res.status(201).json({
            message:'Meal created successfully',
            meal
        });
    } catch (error) {
        res.status(500).json({
            message:'Internal Server Error',
            error:error.message
        })
    }
};
exports.getAll = async (req,res) => {
    try {
      const meal = await mealModel.find();
      res.status(200).json({
        message:'All meal below'
      })  
    } catch (error) {
        res.status(500).json({
            message:'Internal Server Error',
            error:error.message
        })
    }
}
exports.getOne = async (req,res) => {
    try {
        const id = req.params.id()
        const meal = await mealModel.findById()
        if (!meal) {
        return res.status(404).json({
                message:'Product not found'
            })
            res.status(200).json({
                message:'Meal Below',
                error:error.message
            })
        }
    } catch (error) {
        res.status(500).json({
            message:'Internal Server Error',
            error:error.message
        })
    }
}
exports.update= async (req,res) => {
   try {
    const {name,resturant,description,price} = req.body;
    const {id} = req.params
    const meal = await mealModel.findById(id);
    if (!meal) {
    return res.status(404).json({
        message:'Meal not found',
        error:error.message
    })
    res.status(201).json({
        message:'Meal updated successfully',
        error:eror.message
    })
    }
   } catch (error) {
    res.status(500).json({
        message:'Internal Server Error',
        error:error.message
    })
   }
}
exports.delete = async (req,res) => {
    try {
        const id = req.params.id
     const meal = await mealModel.findById(id);
     if (!meal) {
      return res.status(404).json({
        message: "meal not found",
      });
      res.status(200).json({
        message:'Product deleted successfully'
     })
    }
    } catch (error) {
        res.status(500).json({
            message:'Internal Server error',
            error:error.message
        })
    }
}