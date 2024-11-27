const Categoria = require("../models/categoria");
const producto = require("../models/producto");

const traerCategorias = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;
  const categorias = await Categoria.find({ estado: true })
    .limit(limite)
    .skip(desde)
    .populate("usuario", "nombre email");
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

const cambiarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  const usuario = req.usuario._id;

  if (!nombre || nombre.trim().length === 0) {
    return res.status(400).json({ error: "El nombre es obligatorio." });
  }

  const data = {
    nombre: nombre.toUpperCase(),
    usuario,
  };
  try {
    const categoria = await Categoria.findByIdAndUpdate(id, data, {
      new: true,
    }).populate("usuario", "email");

    if (!categoria) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.status(200).json({
      msg: "La categoría fué actualizada exitosamente!",
      categoria,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error al actualizar la categoría",
      message: error.message,
    });
  }
};

const borrarCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const categoriaBorrada = await Categoria.findByIdAndUpdate(
      id,
      { estado: false },
      { new: true }
    );

    if (!categoriaBorrada) {
      return res.status(404).json({
        msg: "Categoría no encontrada.",
      });
    }
    if (categoriaBorrada.estado === false) {
      return res.status(400).json({
        msg: "La categoría ya está desactivada.",
      });
    }

    res.status(200).json({
      msg: "Categoría desactivada con éxito.",
      categoria: categoriaBorrada,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al desactivar la categoría.",
      error: error.message,
    });
  }
};

module.exports = {
  traerCategorias,
  agregarCategoria,
  cambiarCategoria,
  borrarCategoria,
};
