const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole, esAdminRole } = require('../middlewares/validar-roles');
const { crearProducto, obtenerProductos, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const { existeProducto } = require('../helpers/db-validators');


const router = Router();

//Obtener todas las categorias - publico

router.get('/', obtenerProductos)

//Obtener una categoria por id - publico

//Crear validaciones de id
router.get('/:id', [
   check('id', 'El id no coincide con la BD').isMongoId(),
   check('id').custom( existeProducto ),
   validarCampos
], obtenerProducto)

//Crear una categoria - privado - Cualquier persona que tenga token valido
router.post('/', [
   validarJWT,
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   check('categoria', 'No es un id de Mongo').isMongoId(),
   validarCampos,
], crearProducto);

//Actualizar categoria - privado - Cualquier persona que tenga token valido
router.put('/:id', [
   validarJWT,
//    check('categoria', 'El id no coincide con la BD').isMongoId(),
   check('id').custom( existeProducto ),
   validarCampos
], actualizarProducto)

//Borrar cateogoria - Admin

router.delete('/:id', [
   validarJWT,
   esAdminRole,
   check('id', 'El id no coincide con la BD').isMongoId(),
   check('id').custom( existeProducto ),
   validarCampos
], borrarProducto)




module.exports = router;