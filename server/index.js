// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); 
app.use(express.json()); 

mongoose.connect('mongodb://localhost:27017/webshort_db')
  .then(() => console.log('Conectado exitosamente a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB:', err));

// Importamos las rutas de autenticación
app.use('/api/auth', require('./routes/auth'));

app.get('/api/status', (req, res) => {
  res.json({ status: 'online', message: '¡El backend de Web Short está vivo!' });
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});