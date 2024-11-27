const Router = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos.js");
const { validarJWT } = require("../middlewares/validar-jwt.js");
const { esAdminRole } = require("../middlewares/validar-roles.js");
const {validarCategoriaExiste} = require('../middlewares/validar-categoria.js')
const {productoExiste} = require('../helpers/db-validators.js')
const {
  obtenerProductos,
  obtenerProducto,
  agregarProducto,
  actualizarProducto,
  borrarProducto,
  
} = require("../controllers/productos.js");
const routerProd = Router();

routerProd.get("/", obtenerProductos);

routerProd.get(
  "/:id",
  [
    check("id", "El id no es valido").isMongoId(),
    check("id").custom(productoExiste),
    validarCampos,
  ],
  obtenerProducto
);

routerProd.post(
  "/",
  [
    
    validarJWT,
    esAdminRole,
    validarCategoriaExiste,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("categoria", "La categoría es obligatoria").notEmpty(),
    validarCampos,
  ],
  agregarProducto
);

routerProd.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    validarCategoriaExiste,
    check("id", "No es un Id válido").isMongoId(),
    check("id").custom(productoExiste),
    validarCampos,
  ],
  actualizarProducto
);

routerProd.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un Id válido").isMongoId(),
    check("id").custom(productoExiste),
    validarCampos,
  ],
  borrarProducto
);

module.exports = routerProd;
