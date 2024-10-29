const Usuario = require("../models/usuario.js");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Verf si existe email
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        message: "El correo o contraseña son incorrectos",
      });
    }
//Verifico password

const validPassword = bcrypt.compareSync(password,usuario.password)
if (!validPassword) {
    return res.status(400).json({
      message: "El correo o contraseña son incorrectos",
    });
  }

    res.status(200).json({
      message: "Te logeaste existosamente!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Comuniquese con el ADMIN",
    });
  }
};

module.exports = {login};
