// server/routes/videos.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs'); // Módulo nativo de Node.js para manejar archivos
const path = require('path');
const Video = require('../models/Video');

// Middleware para verificar el Token
const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Acceso denegado.' });

    try {
        req.user = jwt.verify(token, 'mi_secreto_super_seguro');
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token no válido.' });
    }
};

// Ruta GET /api/videos (Obtiene los videos)
router.get('/', verificarToken, async (req, res) => {
    try {
        const videos = await Video.find({ userId: req.user.userId }).sort({ createdAt: -1 });
        res.status(200).json(videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los videos' });
    }
});

// Ruta DELETE /api/videos/:id (Elimina un video físicamente y de la BD)
router.delete('/:id', verificarToken, async (req, res) => {
    try {
        // 1. Buscamos el video asegurándonos de que le pertenezca a este usuario
        const video = await Video.findOne({ _id: req.params.id, userId: req.user.userId });
        
        if (!video) {
            return res.status(404).json({ message: 'Video no encontrado o sin permisos.' });
        }

        // 2. Destruimos el archivo físico del disco duro
        const rutaArchivo = path.resolve(video.path); 
        if (fs.existsSync(rutaArchivo)) {
            fs.unlinkSync(rutaArchivo); 
        }

        // 3. Borramos el registro de MongoDB
        await Video.deleteOne({ _id: video._id });

        res.status(200).json({ message: 'Video eliminado para siempre.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al intentar eliminar el video.' });
    }
});

module.exports = router;