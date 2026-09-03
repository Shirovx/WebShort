const jwt = require('jsonwebtoken');

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User'); 
// Ruta para Registrar un nuevo usuario (POST /api/auth/register)
router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Verificar si el usuario ya existe
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        // 2. Crear un nuevo usuario en memoria usando el molde
        user = new User({ email, password });

        // 3. Encriptar la contraseña 
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // 4. Guardar en MongoDB
        await user.save();

        res.status(201).json({ message: '¡Usuario registrado con éxito!', userId: user._id });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

// Ruta para Iniciar Sesión (POST /api/auth/login)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas (Usuario no encontrado)' });
        }

        // 2. Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas (Contraseña incorrecta)' });
        }

        // 3. Crear el Gafete VIP (Token)
        
        const token = jwt.sign(
            { userId: user._id, plan: user.plan, email: user.email }, 
            'mi_secreto_super_seguro', 
            { expiresIn: '7d' } // El usuario se mantendrá logueado por 7 días
        );

        // 4. Devolver el token al frontend
        res.status(200).json({ 
            message: '¡Login exitoso!', 
            token: token // Mandamos el token en la respuesta
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;