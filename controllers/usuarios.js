const { request, response } = require("express");
const Usuario = require("../models/usuario.js");
const bcrypt = require("bcrypt");
/* const { validationResult } = require("express-validator"); */

const getUsers = async (req = request, res = response) => {
  const { limite=5, desde=0 } = req.query;

  const usuarios = await Usuario.find().limit(limite).skip(desde);
  const total = await Usuario.countDocuments();

  res.json({
    total,
    usuarios,
    message: "Peticion GET desde controllers",
  });
};

const postUser = async (req = request, res = response) => {
  const datos = req.body;
  const { nombre, email, password, rol } = datos;

  const usuario = new Usuario({ nombre, email, password, rol });

  //Encriptar Password
  const salt = bcrypt.genSaltSync();
  usuario.password = bcrypt.hashSync(password, salt);
  //Guardar en la DB
  await usuario.save();
  res.status(201).json({
    msg: "Usuario creado con éxito",
    usuario,
  });
};

const putUser = async (req, res) => {
  const { id } = req.params;
  const { password, _id, email, ...resto } = req.body;
  console.log(resto);
  //password
  const salt = bcrypt.genSaltSync();
  resto.password = bcrypt.hashSync(password, salt);
  try {
    const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json({
      message: "Usuario actualizado!",
      usuario,
    });
  } catch {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  //Borrado permanente
  const borrarUsuario = await Usuario.findByIdAndDelete(id);
  res.json({
    message: "Usuario eliminado",
    borrarUsuario,
  });
};

module.exports = { getUsers, postUser, putUser, deleteUser };
