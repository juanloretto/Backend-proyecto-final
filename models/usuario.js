const { model, Schema } = require('mongoose')
const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    rol: {
        type: String,
        required: true,
        enum: ['USER_ROLE', 'ADMIN_ROLE'],
    },
    status: {
        type: Boolean,
        default: true,
    },


})

module.exports = model("Usuario", UsuarioSchema);

