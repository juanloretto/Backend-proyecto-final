const Router = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos.js");
const { validarJWT } = require("../middlewares/validar-jwt.js");
const {
  traerCategorias,
  agregarCategoria,
  cambiarCategoria,
  borrarCategoria,
} = require("../controllers/categorias.js");
const { esAdminRole } = require("../middlewares/validar-roles.js");
const routerCat = Router();

routerCat.get("/", [validarJWT], traerCategorias);

routerCat.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").notEmpty(),
    esAdminRole,
    validarCampos
  ],
  agregarCategoria
);

routerCat.put("/:id", [validarJWT, esAdminRole], cambiarCategoria);

routerCat.delete("/:id",[validarJWT, esAdminRole], borrarCategoria);

module.exports = routerCat;
