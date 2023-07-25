const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');
const { tieneRole, esAdminRole } = require('../middlewares/validar-roles');


const router = Router();

/**
    {{url}}/api/categorias
 */

//Obtener todas las categorias - publico

 router.get('/', obtenerCategorias)

//Obtener una categoria por id - publico

//Crear validaciones de id
router.get('/:id', [
   check('id', 'El id no coincide con la BD').isMongoId(),
   check('id').custom( existeCategoria ),
   validarCampos
], obtenerCategoria)

//Crear una categoria - privado - Cualquier persona que tenga token valido
router.post('/', [
   validarJWT,
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   validarCampos,
], crearCategoria);

//Actualizar categoria - privado - Cualquier persona que tenga token valido
router.put('/:id', [
   validarJWT,
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   check('id', 'El id no coincide con la BD').isMongoId(),
   check('id').custom( existeCategoria ),
   validarCampos
], actualizarCategoria)

//Borrar cateogoria - Admin

router.delete('/:id', [
   validarJWT,
   esAdminRole,
   check('id', 'El id no coincide con la BD').isMongoId(),
   check('id').custom( existeCategoria ),
   validarCampos
], borrarCategoria)

module.exports = router;