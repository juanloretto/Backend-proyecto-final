const Router = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos.js");
const { validarJWT } = require("../middlewares/validar-jwt.js");
const { esAdminRole } = require("../middlewares/validar-roles.js");
const {productoExiste} = require('../helpers/db-validators.js')
const {
  obtenerProductos,
  obtenerProducto,
  agregarProducto,
  
} = require("../controllers/productos.js");
const routerProd = Router();

routerProd.get("/", [validarJWT], obtenerProductos);

routerProd.get(
  "/:id",
  [
    validarJWT,
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(productoExiste),
    validarCampos,
  ],
  obtenerProducto
);

module.exports = routerProd;
