const { response } = require("express")
const { Categoria} = require('../models')

//obtenerCategorias - paginado - total - populate
const obtenerCategorias = async (req, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true}

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    

    res.json({
        total,
        categorias
    });

}

//obtenerCategoria - pupulate {}
const obtenerCategoria = async (req, res= response) => {
    const { id } = req.params;

    // const [categoria] = await Promise.all([
    //     Categoria.id.findOne(id)
    // ])

    const categoriaEncontrada = await Categoria.findById(id).populate('usuario', 'nombre')

    res.json({
        categoriaEncontrada
    });
}


const crearCategoria = async(req, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if ( categoriaDB){
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre}, ya existe`
        });

    }


    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria(data);

    //Guardar DB
    await categoria.save();

    res.status(202).json(categoria);

}

//actualizarCategoria

const actualizarCategoria = async(req, res = response) => {

    const {id} = req.params;
    const {_id, usuario, estado, ...resto} = req.body;

    resto.nombre = data.nombre.toUpperCase();
    resto.usuario = req.usuario._id;
    
    const categoriaActualizada = await Categoria.findByIdAndUpdate(id, resto);

    res.status(301).json({
        categoriaActualizada,
        Actualización: resto
    });
    

}


//borrarCategoria - estado:false

const borrarCategoria = async(req, res=response) => {

    const {id} = req.params;

    const categoriaEliminada = await Categoria.findByIdAndUpdate(id, {estado:false});


    res.json({
        categoriaEliminada
    })
}



module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}