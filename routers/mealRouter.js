const express = require('express');
const router = express.Router();
const mealController = require('../controller/mealController');

router.post('/create', mealController.CreateMeal);

router.get('/', mealController.getAll);

router.get('/:id', mealController.getOne);

router.put('/:id', mealController.update);

router.delete('/:id', mealController.delete);

module.exports = router;
