const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 0,
        max:100
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
    },
    allergens:{
        type:[String],
    },
    height: {
        type: Number,
    },
    weight: {
        type: Number,
    },
    dietaryPreferences: {
        type: [String],
        default: [],
    },
    goals: {
        type: String,
    },
    savedProducts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    language: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
