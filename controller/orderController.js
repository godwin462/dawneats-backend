exports.createOrder = async (req, res) => {
    try {
        const { userId, restaurantId, mealId, addressId, orderDate, status, totalItems, totalCost, deliveryFee, serviceFee, instruction, note } = req.body;

        // Create an order object with the provided data
        const order = await orderModel.create({
            userId,
            restaurantId,
            mealId,
            addressId,
            orderDate,
            status,
            totalItems,
            totalCost,
            deliveryFee,
            serviceFee,
            instruction,
            note
        });

        // Check if order creation was successful
        if (order) {
            res.status(201).json({
                message: 'Order created successfully',
                order
            });
        } else {
            res.status(400).json({
                message: 'Order creation failed'
            });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

exports.getAllOrders = async (req, res) => {
    try {
        // Fetch all orders from the orderModel
        const orders = await orderModel.find(); 
        // Send the orders as a response
        res.status(200).json({
            message: 'Order fetched successfully',
            data: orders
        });

    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

exports.updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id; // Get the order ID from the request parameters
        const updatedData = req.body; // The data to update the order with

        // Assuming you have a database function to update the order, it might look like this:
        const updatedOrder = await database.updateOrder(orderId, updatedData);

        if (!updatedOrder) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }

        res.status(200).json({
            message: 'Order updated successfully',
            order: updatedOrder
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}

//const Order = require('./models/Order'); // make sure to adjust the path to your Order model

exports.deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id; // Get the order ID from the request parameters
        const result = await Order.findByIdAndDelete(orderId); // Delete the order from the database

        if (!result) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json({
            message: 'Order deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
}