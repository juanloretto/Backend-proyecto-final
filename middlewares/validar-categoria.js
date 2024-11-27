const Categoria = require("../models/categoria");

const validarCategoriaExiste = async (req, res, next) => {
  const { categoria } = req.body;

  try {
    const categoriaDB = await Categoria.findById(categoria);
    if (!categoriaDB) {
      return res.status(400).json({
        msg: `La categoría con ID ${categoria} no existe`,
      });
    }
    next(); 
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al validar la categoría. Contacta al administrador.",
    });
  }
};

module.exports = { validarCategoriaExiste };