const { model, Schema } = require("mongoose");
const usuario = require("./usuario");

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
    type: String,
    required: [true, "El tipo de cancha es obligatorio"],
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
