const Router = require("express");
const { body } = require("express-validator");

const { validarJWT } = require("../middlewares/validar-jwt.js");
const { esAdminRole } = require("../middlewares/validar-roles.js");
const {
  traerReservas,
  reservar,
  quitarReserva,
} = require("../controllers/reservas.js");

const routerRes = Router;
routerRes.get("/", esAdminRole, validarJWT, traerReservas);

routerRes.post(
  "/",
  [
    esAdminRole,
    validarJWT,
    body("horario")
      .isIso8601()
      .withMessage("El horario debe ser formato ISO8601"),
  ],
  reservar
);

routerRes.delete("/:id", esAdminRole, validarJWT, quitarReserva);

module.exports = routerRes;
