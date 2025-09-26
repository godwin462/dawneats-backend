const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: true,
    },
    restaurantAddress: {
        type: String,
        required: true,
    },
    restaurantContact: {
        type: String,
        required: true,
    },
    restaurantEmail: {
        type: String,
        required: true,
        unique: true,
    },
    restaurantPassword: {
        type: String,
        required: true,
    },
    restaurantImage: {
        type: String,
    },
    restaurantRating: {
        type: Number,
        default: 0,
    },
    restaurantReviews: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
            review: {
                type: String,
            },
            rating: {
                type: Number,
            },
        },
    ],
    isVerified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
