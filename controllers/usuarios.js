const { request, response } = require('express')
const Usuario = require('../models/usuario.js')

const getUsers = (req = request, res = response) => {
    res.json({
        message: 'Peticion GET desde controllers'
    });
};

const postUser = async (req = request, res = response) => {

    const datos = req.body
    const { nombre, email, password, rol } = datos
    const usuario = new Usuario({nombre, email, password, rol})
//Verificar email
const existeEmail = await Usuario.findOne({email})

if(existeEmail){
    return res.status(400).json({
        msg:'El correo ya existe'
    })
}

//Guardar en la DB
await usuario.save()
res.status(201).json({
    msg:'Usuario creado con éxito',
    usuario,
})

    /*  const {nombre, puesto} = req.body;
    if(nombre){
        res.json({
            message: 'Peticion POST desde controllers',
            nombre,
            puesto,
        });
        
    }else{
        res.status(400).json({
            message: 'falta el nombre'
        })
    } */

}

const putUser = (req, res) => {
    res.json({
        message: 'Peticion PUT desde controllers'
    })
}

const deleteUser = (req, res) => {
    res.json({
        message: 'Peticion DELETE desde controllers'
    })
}

module.exports = { getUsers, postUser, putUser, deleteUser }