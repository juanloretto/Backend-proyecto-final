const Router = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos.js");
const { rolValido, emailValido } = require("../helpers/db-validators.js");

const {
  getUsers,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/usuarios.js");
const router = Router();

router.get("/", getUsers);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check(
      "password",
      "La contraseña debe tener minimo 8 caracteres, una mayúscula, minúscula y un dígito"
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,14}$/),
    check("email", "El email no es valido").isEmail(),
    check("email").custom(emailValido),
    check("rol").custom(rolValido),
    validarCampos,
  ],
  postUser
);

router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(ConfirmoUsuarioId),
    check("rol").custom(rolValido),
    validarCampos,
  ],
  putUser
);

router.delete("/:id",[
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(ConfirmoUsuarioId),
    validarCampos,
], deleteUser);

module.exports = router;
