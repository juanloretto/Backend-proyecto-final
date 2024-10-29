const Router = require("express");
const { check } = require("express-validator");
const {validarCampos} = require('../middlewares/validar-campos.js')

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
    check('email', 'El email no es valido').isEmail(),
    validarCampos
  ],
  postUser
);

router.put("/:id", putUser);

router.delete("/", deleteUser);

module.exports = router;
