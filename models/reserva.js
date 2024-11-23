/* const { model, Schema } = require('mongoose')
const usuario = require('./usuario')

const ReservaSchema = Schema({
    hora:{
        type: Number,
        required: [true, "El nombre es obligatorio"],
        unique: true
    },

    Cancha:{
        type: String,
        required: [true, "El tipo de cancha es obligatorio"]
    }, //A confirmar, se puede hacer una coleccion aparte de canchas

    estado:{
        type: Boolean,
        default:true,
        required:true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref:"Usuario"
    }


}) */