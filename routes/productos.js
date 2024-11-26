const Router = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos.js");
const { validarJWT } = require("../middlewares/validar-jwt.js");
const { esAdminRole } = require("../middlewares/validar-roles.js");
const {obtenerProductos, obtenerProducto, agregarProducto} = require("../controllers/productos.js")
const routerProd = Router()

routerProd.get()



module.exports=routerProd