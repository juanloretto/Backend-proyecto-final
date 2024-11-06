const mongoose = require('mongoose')
const dbConnection = async ()=>{
try {
    console.log('Intentando conectar a la base de datos:', process.env.DATABASE_CNN);
    await mongoose.connect(process.env.DATABASE_CNN)
    console.log('Base de datos online')
} catch ( error) {
    throw new Error('Error de conexión a la base de datos')
}
}

module.exports = {dbConnection}