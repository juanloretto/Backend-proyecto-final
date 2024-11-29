const Router = require("express");
const { validarJWT } = require("../middlewares/validar-jwt.js");
const {getCanchas, agregarCancha, actualizarCancha} = require('../controllers/canchas.js');
const { esAdminRole } = require("../middlewares/validar-roles.js");

const routerCan = Router()

routerCan.get("/", getCanchas)
routerCan.post("/", validarJWT, esAdminRole, agregarCancha)
routerCan.put("/:id", validarJWT, esAdminRole, actualizarCancha)

module.exports = routerCan