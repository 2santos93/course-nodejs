const {Router} = require('express');
const { check } = require('express-validator');

const {
    isEmailDuplicated,
    isValidRole,
    idUserExist,
    checkRoles,
    errorHandler,
    checkToken
} = require('../Middlewares');

const {
    getUsers,
    postUser,
    updateUser,
    deleteUser
} = require('../controllers/user');

const router = Router();

router.get('/', [
    checkToken,
    errorHandler
], getUsers);

router.post('/', [
    checkToken,
    check('name').notEmpty().isString(),
    check('email').notEmpty().isEmail().custom( isEmailDuplicated ),
    check('password').notEmpty().isString(),
    check('role').custom( isValidRole ),
    errorHandler
], postUser);

router.put('/:id', [
    checkToken,
    check('id').isMongoId(),
    check('id').custom(idUserExist),
    errorHandler
], updateUser);

router.delete('/:id', [
    checkToken,
    checkRoles(['ADMIN']),
    check('id').isMongoId(),
    check('id').custom(idUserExist),
    errorHandler
], deleteUser);

module.exports = router;