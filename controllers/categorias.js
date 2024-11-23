const Categoria = require("../models/categoria");

const traerCategorias = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;
  const categorias = await Categoria.find({ estado: true })
    .limit(limite)
    .skip(desde)
    .populate("usuario","nombre email")
  res.json({
    categorias,
  });
};

const agregarCategoria = async (req, res) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoriaEncontrada = await Categoria.findOne({ nombre });
  if (categoriaEncontrada) {
    return res.status(400).json({
      msg: `La categoria ${nombre} ya existe!`,
    });
  }

  const usuario = req.usuario._id;

  const categoria = new Categoria({ nombre, usuario });
  await categoria.save();

  res.status(200).json({
    msg: "La categoria fué añadida exitosamente!",
    categoria,
  });
};

const cambiarCategoria = (req, res) => {
  res.json({
    msg: "PUT categorias",
  });
};

const borrarCategoria = (req, res) => {
  res.json({
    msg: "DELETE categorias",
  });
};

module.exports = {
  traerCategorias,
  agregarCategoria,
  cambiarCategoria,
  borrarCategoria,
};
