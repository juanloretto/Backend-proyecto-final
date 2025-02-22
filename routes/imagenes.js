const express = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-roles.js");
const {
  crearImagen,
  obtenerTodasLasImagenes,
  obtenerImagenPorId,
  actualizarImagenPorId,
  eliminarImagenPorId,
} = require("../controllers/imagenes");

const routerImg = express.Router();

routerImg.post("/", validarJWT, esAdminRole, crearImagen);
routerImg.get("/", validarJWT, obtenerTodasLasImagenes);
routerImg.get("/:id", validarJWT, obtenerImagenPorId);
routerImg.put("/:id", validarJWT,esAdminRole, actualizarImagenPorId);
routerImg.delete("/:id", validarJWT,esAdminRole, eliminarImagenPorId);

module.exports = routerImg;
