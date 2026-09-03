// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // No pueden existir dos cuentas con el mismo correo
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    plan: { 
        type: String,
        enum: ['free', 'starter', 'pro', 'business'],
        default: 'free' // Todos empiezan en el plan gratuito
    },
    videosProcessed: {
        type: Number,
        default: 0
    }
}, { timestamps: true }); // Esto agrega automáticamente la fecha de creación y actualización

module.exports = mongoose.model('User', UserSchema);