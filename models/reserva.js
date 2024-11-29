const { model, Schema } = require("mongoose");


const ReservaSchema = Schema({
  horarioInicio: {
    type: Date,
    required: [true, "El horario de inicio es obligatorio"],
  },
  horarioFin: {
    type: Date,
    required: [true, "El horario de fin es obligatorio"],
  },
  cancha: {
    type: Schema.Types.ObjectId,
    ref: "Cancha",
    required: [true, "La cancha es obligatoria"],
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },
});

module.exports = model('Reserva', ReservaSchema)
