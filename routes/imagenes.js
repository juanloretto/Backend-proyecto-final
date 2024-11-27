const express = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
  crearImagen,
  obtenerTodasLasImagenes,
  obtenerImagenPorId,
  actualizarImagenPorId,
  eliminarImagenPorId,
} = require('../controllers/imagenes');

const routerImg = express.Router(); 


routerImg.post('/', validarJWT, crearImagen); 
routerImg.get('/', validarJWT, obtenerTodasLasImagenes);
routerImg.get('/:id', validarJWT, obtenerImagenPorId);
routerImg.put('/:id', validarJWT, actualizarImagenPorId);
routerImg.delete('/:id', validarJWT, eliminarImagenPorId);

module.exports = routerImg;