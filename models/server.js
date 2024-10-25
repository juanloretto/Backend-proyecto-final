const express = require('express')
const router = require('../routes/usuarios.js')
class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios'
        this.middlewares();
        this.routes();

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