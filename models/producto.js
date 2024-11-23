const { model, Schema } = require('mongoose')
const ProductoSchema = Schema({
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      unique: true,
    },
    estado: {
      type: Boolean,
      default: true,
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    categoria: {
      type: Schema.Types.ObjectId,
      ref: "Categoria",
      required: true,
    },
    precio: {
      type: Number,
      default: 0,
    },
    descripcion: {
      type: String,
    },
    disponible: {
      type: Boolean,
      default: true,
    },
    img: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNK7-n-r_w_qCEIjsnu8VXMBamUkSmLUr9Eg&s",
    },
    stock: {
      type: Number,
      default: 0,
    },
  });

  module.exports = model('Producto', ProductoSchema)