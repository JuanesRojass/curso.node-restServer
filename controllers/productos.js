const { response } = require("express")
const { Producto} = require('../models')


const obtenerProductos = async (req, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true}

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    

    res.json({
        total,
        productos
    });

}

//obtenerCategoria - pupulate {}
const obtenerProducto = async (req, res= response) => {
    const { id } = req.params;

    const ProductoEncontrado = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria', 'nombre');

    res.json({
        ProductoEncontrado
    });
}


const crearProducto = async(req, res = response) => {

    const {estado, usuario, ...body} = req.body;

    const ProductoDB = await Producto.findOne({nombre: body.nombre});

    if ( ProductoDB){
        return res.status(400).json({
            msg: `El producto ${ProductoDB.nombre}, ya existe`
        });

    }


    //Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto(data);

    //Guardar DB
    await producto.save();

    res.status(202).json(producto);

}

const actualizarProducto = async(req, res = response) => {

    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    if (data.nombre){
        data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;
    
    const productoActualizado = await Producto.findByIdAndUpdate(id, data);

    res.status(301).json({
        productoActualizado,
        Actualización: data
    });
    

}


//borrarCategoria - estado:false

const borrarProducto = async(req, res=response) => {

    const {id} = req.params;

    const ProductoEliminado = await Producto.findByIdAndUpdate(id, {estado:false});


    res.json({
        ProductoEliminado
    })
}



module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto

}