const Cancha = require("../models/cancha");

const getCanchas = async (req, res) => {
  try {
    const { estado } = req.query;
    const query = estado ? { estado: estado === "true" } : {};

    const canchas = await Cancha.find(query);

    if (!canchas.length) {
      return res.status(404).json({
        msg: "No se encontraron canchas disponibles",
      });
    }

    res.status(200).json({
      msg: "Canchas obtenidas correctamente",
      canchas,
    });
  } catch (error) {
    console.error("Error al obtener las canchas:", error.message);
    res.status(500).json({
      msg: "Ocurrió un error al intentar obtener las canchas",
      error: error.message,
    });
  }
};

module.exports = { getCanchas };

const agregarCancha = async (req, res) => {
  const { nombre, tipo, precioPorHora, descripcion, imagen } = req.body;
  const tipoEnMayusculas = tipo.toUpperCase();
  try {
    if (!nombre || !tipo || !precioPorHora || !descripcion || !imagen) {
      return res.status(400).json({
        msg: "Todos los campos son obligatorios: nombre, tipo, precioPorHora, descripción e imagen.",
      });
    }
    const tiposValidosMayusculas = tiposValidos.map((tipo) =>
      tipo.toUpperCase()
    );

    const tiposValidos = [
      "Fútbol 5",
      "Fútbol 7",
      "Fútbol 11",
      "Paddle 1",
      "Paddle 2",
      "Paddle 3",
    ];

    if (!tiposValidosMayusculas.includes(tipoEnMayusculas)) {
      return res.status(400).json({
        msg: `El tipo de cancha debe ser uno de los siguientes: ${tiposValidos}.`,
      });
    }
    if (typeof precioPorHora !== "number" || precioPorHora <= 0) {
      return res.status(400).json({
        msg: "El precio por hora debe ser un número positivo.",
      });
    }
    const canchaExistente = await Cancha.findOne({ nombre });
    if (canchaExistente) {
      return res.status(400).json({
        msg: "Ya existe una cancha con ese nombre.",
      });
    }
    const nuevaCancha = new Cancha({
      nombre,
      tipo,
      precioPorHora,
      descripcion,
      imagen,
    });

    await nuevaCancha.save();

    res.status(201).json({
      msg: "Cancha creada exitosamente",
      cancha: nuevaCancha,
    });
  } catch (error) {
    console.error("Error al crear la cancha:", error.message);
    res.status(500).json({
      msg: "Ocurrió un error al intentar crear la cancha",
      error: error.message,
    });
  }
};

const actualizarCancha = async (req, res) => {
  const { id } = req.params;
  const { nombre, tipo, descripcion, precioPorHora, estado, imagen } = req.body;
  if (!id) {
    return res.status(400).json({
      msg: "Se debe proporcionar un ID válido de la cancha",
    });
  }
  const cancha = await Cancha.findById(id);
  if (!cancha) {
    return res.status(404).json({ msg: "Cancha no encontrada" });
  }

  const tiposValidos = [
    "Fútbol 5",
    "Fútbol 7",
    "Fútbol 11",
    "Paddle 1",
    "Paddle 2",
    "Paddle 3",
  ];
  const tipoEnMayusculas = tipo.toUpperCase();
  const tiposValidosMayusculas = tiposValidos.map((tipo) => tipo.toUpperCase());

  if (!tiposValidosMayusculas.includes(tipoEnMayusculas)) {
    return res.status(400).json({
      msg: `El tipo de cancha debe ser uno de los siguientes: ${tiposValidos}.`,
    });
  }
  if (precioPorHora <= 0) {
    return res.status(400).json({
      msg: "El precio por hora debe ser un número mayor a 0.",
    });
  }

  if (estado !== undefined && typeof estado !== "boolean") {
    return res.status(400).json({
      msg: "El estado debe ser un valor booleano (true o false).",
    });
  }
  if (nombre) cancha.nombre = nombre;
  if (tipo) cancha.tipo = tipo;
  if (descripcion) cancha.descripcion = descripcion;
  if (precioPorHora !== undefined) cancha.precioPorHora = precioPorHora;
  if (estado !== undefined) cancha.estado = estado; // Aseguramos que el estado se actualice si se proporciona
  if (imagen !== undefined) cancha.imagen = imagen;
};
await cancha.save();

  res.status(200).json({
    msg: "Cancha actualizada correctamente",
    cancha, 
  });

module.exports = { getCanchas, agregarCancha, actualizarCancha };
