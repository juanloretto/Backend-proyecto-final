const Router = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos.js");
const { validarJWT } = require("../middlewares/validar-jwt.js");
const { esAdminRole } = require("../middlewares/validar-roles.js");
const routerProd = Router()



module.exports=routerProd