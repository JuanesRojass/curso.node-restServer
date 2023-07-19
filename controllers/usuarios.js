const {response, request} = require('express');
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');



const usuariosGet = async (req = request, res = response) => {

    // const {q, nombre='no name', page = 1, limit} = req.query;
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true}

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    

    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async(req, res = response) => {

    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    //TODO validar contra base de datos
    if (password){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(301).json(usuario);
}

const usuariosPost = async(req, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol}); //Creacion de instancia

    //Verificar si el correo existe
    

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt);

    //Guardar en BD
    await usuario.save(); //Grabar registro

    res.json({
        msg: 'POST API',
        usuario
    });
}

const usuariosDelete = async(req, res = response) => {

    const { id } = req.params;

    //Manera de borrarlo fisicamente - No recomendado
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
 
    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'PATCH API'
    });
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}
