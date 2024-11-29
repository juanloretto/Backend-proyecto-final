const express = require('express')
const router = require('../routes/usuarios.js')
const routerAuth = require('../routes/auth.js')
const routerProd = require('../routes/productos.js')
const routerCat = require('../routes/categorias.js')
const routerImg = require('../routes/imagenes.js');
const routerRes = require('../routes/reservas.js')
const cors = require('cors');
const dbConnection = require('../database/config.js');

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT;
        this.usuarioPath = '/api/usuarios'
        this.authPath = '/api/auth'
        this.categoriaPath = '/api/categorias'
        this.reservaPath = '/api/reservas'
        this.productoPath = '/api/productos'
        this.imagenesPath = '/api/imagenes'
        this.canchasPath = '/api/canchas'
        this.conectarDB();
        this.middlewares();
        this.routes();

    }
    async conectarDB(){
        await dbConnection()
    }

    routes() {
        this.app.use(cors());
        this.app.use(this.usuarioPath, router);
        this.app.use(this.authPath, routerAuth);
        this.app.use(this.categoriaPath, routerCat);
        this.app.use(this.productoPath, routerProd);
        this.app.use(this.imagenesPath, routerImg);
        this.app.use(this.reservaPath, routerRes)
        this.app.use(this.canchasPath, routerCan)
        
        
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