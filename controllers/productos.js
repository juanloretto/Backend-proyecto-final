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
  
    await producto.save();
  
    res.status(201).json({
      msg: "El producto se agregó exitosamente!",
    });
  };

  //ACTUALIAZAR PRODUCTO
  const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { precio, categoria, descripcion, disponible, estado } = req.body;
    const usuario = req.usuario._id;
  
    let data = {
      nombre,
      precio,
      descripcion,
      categoria,
      disponible,
      usuario,
      estado,
    };
  
    if (req.body.nombre) {
      data.nombre = req.body.nombre.toUpperCase();
    }
  
    if (req.body.stock) {
      data.stock = req.body.stock;
    }
    if (req.body.img) {
      data.img = req.body.img;
    }
  
    const producto = await Producto.findByIdAndUpdate(id, data, { new: true })
      .populate("categoria", "nombre")
      .populate("usuario", "email");
     
    res.status(200).json({
      producto,
      msg: "Producto actualizado!",
    });
  };

  //BORRAR PRODUCTO
  const borrarProducto = async (req, res) => {
    const { id } = req.params;
  
    const productoBorrado = await Producto.findByIdAndUpdate(
      id,
      { estado: false },
      { new: true }
    );
  
    const { nombre } = productoBorrado;
  
    res.status(200).json({
      msg: "El producto fue borrado",
      nombre,
    });
  };

  module.exports = {agregarProducto,obtenerProducto, obtenerProductos, borrarProducto, actualizarProducto }