const express = require('express')
const router = require('../routes/usuarios.js')
const dbConnection = require('../database/config.js')
class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios'
        this.conectarDB();
        this.middlewares();
        this.routes();

    }
    async conectarDB(){
        await dbConnection()
    }

    routes() {
        this.app.use(this.usuarioPath, router)
        
    }

    middlewares() {
        this.app.use(express.json())
        this.app.use(express.static('public'));
    }
    listen() {
        this.app.listen(this.port, () => console.log('Server online en el puerto:', this.port));
    }
}

module.exports = Server