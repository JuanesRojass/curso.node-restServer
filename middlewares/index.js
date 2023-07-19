const validaCampos = { validarCampos } = require('../middlewares/validar-campos');
const  validaJWT = { validarJWT } = require('../middlewares/validar-jwt');
const  validaRoles = { esAdminRole, tieneRole } = require('../middlewares/validar-roles');

module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRoles
}