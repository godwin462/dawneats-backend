const express = require('express');
const mealRouter = express.Router();
const mealController = require('../controller/mealController');
const {checkLogin} = require("../middlewares/authenticationMiddleware");

mealRouter.post('/create', checkLogin, mealController.CreateMeal);

mealRouter.get('/', mealController.getAll);

mealRouter.get('/:id', mealController.getOne);

mealRouter.put('/:id', checkLogin, mealController.update);

mealRouter.delete('/:id', checkLogin, mealController.delete);

module.exports = mealRouter;
