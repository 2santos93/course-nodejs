const {Router} = require('express');
const { check } = require('express-validator');
const {
    errorHandler,
    checkToken
} = require('../Middlewares');

const { idExistInDb, productExists} = require('../Helper/database');

const {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct
} = require('../controllers')

const router = Router();

router.post('/', [
    checkToken,
    check('name').isString().notEmpty(),
    check('price').isNumeric().notEmpty(),
    check('category').isMongoId().isString().notEmpty(),
    check('name').custom(productExists),
    errorHandler
], createProduct);

router.get('/', getProducts);

router.get('/:id', [
    check('id').isMongoId().isString().notEmpty().custom( (id) => idExistInDb(id, require('../Models/Product'))),
    errorHandler
], getProduct);

router.put('/:id', [
    check('id').isMongoId().isString().notEmpty().custom( (id) => idExistInDb(id, require('../Models/Product'))),
    check('name').isString(),
    check('price').isNumeric(),
    check('category').isMongoId().isString(),
    errorHandler
], updateProduct);

router.delete('/:id', [
    checkToken,
    check('id').isMongoId().isString().notEmpty().custom( (id) => idExistInDb(id, require('../Models/Product'))),
    errorHandler
], deleteProduct);



module.exports = router;