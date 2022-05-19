const express = require('express');
const cors = require('cors');

const comandasRouter = require('./routes/comandasRouter');

// Instancio mi app
const app = express();

// Utilizo el middleware CORS para poder hacer peticiones desde el frontend local sin problemas
// Ojo!: Antes tengo que instalarlo con npm i cors
app.use(cors());

// Utilizo el middleware JSON para poder leer los body de las peticiones que vienen en JSON
app.use(express.json());

// RUTAS
app.use('/comanda', comandasRouter);

// Arranco la app
const port = 3001;
app.listen(port, () => {
  console.log('Servidor rulando!');
});
