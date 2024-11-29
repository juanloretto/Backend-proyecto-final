const { query } = require("express");
const Reserva = require("../models/reserva");

const traerReservas = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;
  if (isNaN(limite) || isNaN(desde)) {
    return res.status(400).json({ msg: "Los parámetros deben ser numéricos" });
  }
  const reservas = await Reserva.find({ estado: true })
    .skip(Number(desde))
    .limit(Number(limite))
    .populate("usuario", "email");

  const total = await Reserva.countDocuments({ estado: true });

  res.json({
    total,
    reservas,
  });
};

const reservar = async (req, res) => {
  const { cancha, horarioInicio, horarioFin } = req.body;
  const inicio = new Date(horarioInicio);
  const fin = new Date(horarioFin);
  const duracionReserva = (fin - inicio) / (1000 * 60 * 60); 
  if (!cancha || !inicio || !fin) {
    return res.status(400).json({ msg: "Cancha y horario son obligatorios" });
  }
  if (inicio >= fin) {
    return res.status(400).json({ msg: "La hora de inicio debe ser anterior a la hora de fin" });
  }
  if (duracionReserva < 1) {
    return res.status(400).json({ msg: "La reserva debe tener una duración mínima de una hora" });
  }

  const reservaExistente = await Reserva.findOne({
    cancha,
    $or: [
      {
        horarioInicio: { $lt: fin },
        horarioFin: { $gt: inicio },
      },
      {
        horarioInicio: { $gte: inicio, $lt: fin },
      },
    ],
  });
  if (reservaExistente) {
    return res.status(400).json({ msg: "Ese horario ya está reservado" });
  }
  const data = { horarioInicio: inicio, horarioFin: fin, cancha };
  const reserva = new Reserva(data);
  await reserva.save();
  res.status(201).json({
    msg: "La reserva quedó registrada!",
  });
};

const quitarReserva = async (req, res) => {
  const { id } = req.params;

  try {
    const reserva = await Reserva.findByIdAndDelete(id);
    if (!reserva) {
      return res.status(404).json({ msg: "Reserva no encontrada" });
    }
    res.status(200).json({
      msg: "Reserva eliminada con éxito",
      reserva,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Hubo un error al intentar eliminar la reserva" });
  }
};
module.exports = { traerReservas, reservar, quitarReserva };
