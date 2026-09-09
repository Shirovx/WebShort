// server/routes/upload.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const jwt = require('jsonwebtoken');
const Video = require('../models/Video'); 

// Configuración de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
        cb(null, true);
    } else {
        cb(new Error('Formato no soportado, solo videos.'), false);
    }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Middleware para verificar el Token en esta ruta
const verificarToken = (req, res, next) => {
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'Acceso denegado. No hay token.' });

    try {
        const verificado = jwt.verify(token, 'mi_secreto_super_seguro');
        req.user = verificado; // Guardamos los datos del usuario en la request
        next(); // Le damos paso a la subida
    } catch (error) {
        res.status(400).json({ message: 'Token no válido.' });
    }
};

// Ruta POST /api/upload (Ahora protegida con verificarToken)
router.post('/', verificarToken, upload.single('video'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No se recibió ningún archivo.' });
        }
        
        console.log('Nuevo video recibido de:', req.user.email);
        
        
        const nuevoVideo = new Video({
            userId: req.user.userId,
            originalName: req.file.originalname,
            filename: req.file.filename,
            path: req.file.path,
            status: 'ready' 
        });

        await nuevoVideo.save();

        res.status(200).json({ 
            message: 'Video subido y registrado correctamente',
            video: nuevoVideo 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al subir el archivo o guardar en base de datos' });
    }
});

module.exports = router;