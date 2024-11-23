const { model, Schema } = require('mongoose')
const usuario = require('./usuario')

const CategoriaSchema = Schema({
    nombre:{
        type: String,
        required: [true, "El nombre es obligatorio"],
        unique: true
    },

    estado:{
        type: Boolean,
        default:true,
        required:true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref:"Usuario"
    }


})

module.exports= model("Categoria", CategoriaSchema)