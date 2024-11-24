const { query } = require("express");
const Producto = require("../models/producto");

//GET PAGINACION DE PRODUCTOS
const obtenerProductos = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;
  const productos = await Producto.find({ estado: true })
    .skip(Number(desde))
    .limit(Number(limite))
    .populate("categoria", "nombre")
    .populate("usuario", "email");

  const total = await Producto.countDocuments({ estado: true });

  res.json({
    total,
    productos,
  });
};
//SELECCIONAR UN PRODUCTO
const obtenerProducto = async (req, res) => {
  const { id } = req.params;
  const producto = await Producto.findById(id)
    .populate("categoria", "nombre")
    .populate("usuario", "email");

  res.json({
    producto,
  });
};

//AGREGAR PRODUCTO
const agregarProducto = async (req, res) => {
    const { precio, categoria, descripcion, img, stock } = req.body;
  
    const nombre = req.body.nombre.toUpperCase();
  
    const productoDB = await Producto.findOne({ nombre });
  
    if (productoDB) {
      return res.status(400).json({
        msg: `El producto ${productoDB.nombre} ya existe`,
      });
    }
    //Generar la data a guardar
    const data = {
      nombre,
      categoria,
      precio,
      descripcion,
      img,
      stock,
      usuario: req.usuario._id,
    };
  
    const producto = new Producto(data);
  
    //grabar en la base de datos
    await producto.save();
  
    res.status(201).json({
      msg: "El producto se agregó exitosamente!",
    });
  };


  module.exports = {agregarProducto,obtenerProducto, obtenerProductos }