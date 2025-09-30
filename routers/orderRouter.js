const { createOrder, getAllOrders, updateOrder, deleteOrder} = require('../controller/orderController');

const orderRouter = require('express').Router();

// const uploads = require('../middleware/maulter');

orderRouter.post('/create', createOrder );
orderRouter.get('/all', getAllOrders ) 
orderRouter.put('/update/:id', updateOrder )
orderRouter.delete('/delete/:id', deleteOrder );

module.exports = orderRouter
