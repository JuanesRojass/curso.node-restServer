const { Router } = require('express');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/usuarios');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');


const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'El id no coincide con la BD').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), //Verificar que no este vacio
    // check('correo', 'El correo no es valido').isEmail(), //Verificar que sea un correo
    check('correo').custom(emailExiste),
    check('password', 'La contraseña debe tener minimo 6 letras').isLength({min: 6}), //Verifica si la contraseña tiene minimo seis letras
    // check('rol', 'El rol no es valido').isIn(['ADMIN_ROLE','USER_ROLE']), //Verifica dentro de un arreglo de opciones
    check('rol').custom(esRolValido),
    validarCampos,
],usuariosPost);                                                             //si el usuario esocgio alguno 

router.delete('/:id', [
    check('id', 'El id no coincide con la BD').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
] ,usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router;



