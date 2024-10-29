const Role = require("../models/rol.js");

const rolValido = async (rol) => {
  const esRolValido = await Role.findOne({ rol });
  if (!esRolValido) {
    throw new Error(`${rol} Elija un rol valido`);
  }
};

module.exports = { rolValido };
