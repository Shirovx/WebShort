// server/models/Video.js
const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Lo vinculamos directamente al usuario que lo subió
        required: true
    },
    originalName: {
        type: String,
        required: true // El nombre original 
    },
    filename: {
        type: String,
        required: true // El nombre único que le puso Multer 
    },
    path: {
        type: String,
        required: true // La ruta física en el servidor
    },
    status: {
        type: String,
        enum: ['uploading', 'processing', 'ready', 'error'],
        default: 'ready' 
    },
}, { timestamps: true }); // Guarda la fecha de subida automáticamente

module.exports = mongoose.model('Video', VideoSchema);