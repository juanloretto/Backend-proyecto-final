const express = require('express');
const validarJWT = require('../middlewares/validar-jwt')
const {
    crearImagen,
    obtenerTodasLasImagenes,
    obtenerImagenPorId,
    actualizarImagenPorId,
    eliminarImagenPorId,
  } = require('./imageController');

  const routerImg = express.Router();

  
  router.post('/imagenes', validarJWT, crearImagen);
  router.get('/imagenes', validarJWT, obtenerTodasLasImagenes);
  router.get('/imagenes/:id', validarJWT, obtenerImagenPorId); 
  router.put('/imagenes/:id', validarJWT, actualizarImagenPorId);
  router.delete('/imagenes/:id', validarJWT, eliminarImagenPorId); 
  
  module.exports = routerImg;
