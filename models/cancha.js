const { model, Schema } = require('mongoose')


const Cancha = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre de la cancha es obligatorio"],
    unique: true,
  },
  tipo: {
    type: String,
    enum: ["Fútbol 5", "Fútbol 7", "Fútbol 11", "Paddle 1", "Paddle 2"],
    required: [true, "El tipo de cancha es obligatorio"],
  },
  precioPorHora: {
    type: Number,
    required: [true, "El precio por hora es obligatorio"],
    min: 0,
  },
  descripcion: {
    type: String,
  },
  imagen: {
    type: String,
    default: "https://www.shutterstock.com/image-vector/default-image-icon-vector-missing-260nw-2086941550.jpg",
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

module.exports = model("Cancha", Cancha);