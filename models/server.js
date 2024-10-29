const express = require('express')
const router = require('../routes/usuarios.js')
const routerAuth = require('../routes/auth.js')
const dbConnection = require('../database/config.js')
class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios'
        this.authPath = '/api/auth'
        this.conectarDB();
        this.middlewares();
        this.routes();

    }
    async conectarDB(){
        await dbConnection()
    }

    routes() {
        this.app.use(this.usuarioPath, router)
        this.app.use(this.authPath, routerAuth)
        
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