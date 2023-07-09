const {response, request} = require('express');



const usuariosGet = (req = request, res = response) => {

    const {q, nombre='no name', page = 1, limit} = req.query;

    res.json({
        msg: 'GET API',
        q,
        nombre,
        page,
        limit
    });
}

const usuariosPut = (req, res = response) => {

    const {id} = req.params;

    res.status(301).json({
        msg: 'PUT API',
        id
    });
}

const usuariosPost = (req, res = response) => {

    const {nombre, edad} = req.body;

    res.json({
        msg: 'POST API',
        nombre,
        edad
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'DELETE API'
    });
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
