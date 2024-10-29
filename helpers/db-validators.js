const Role = require("../models/rol.js");
const Usuario = require("../models/usuario.js")
const rolValido = async (rol) => {
  const esRolValido = await Role.findOne({ rol });
  if (!esRolValido) {
    throw new Error(`${rol} Elija un rol valido`);
  }
};

const emailValido = async(email)=>{
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
        throw new Error(`el correo ${email} ya existe`);
      };
    }


module.exports = { rolValido, emailValido };
