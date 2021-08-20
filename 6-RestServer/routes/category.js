const {Router} = require('express');
const { check } = require('express-validator');
const { 
    checkToken,
    errorHandler,
    checkRoles,
 } = require('../Middlewares');

 const { idExistInDb} = require('../Helper/database');

const {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category');

const router = Router();

router.get('/', getCategories);

router.get('/:id',[
    check('id').isMongoId().isString().notEmpty().custom( (id) => idExistInDb(id, require('../Models/Category'))),
    errorHandler
], getCategory);

router.post('/', [
    checkToken,
    check('name').notEmpty().isString(),
    checkRoles(['ADMIN']),
    errorHandler
], createCategory);

router.put('/:id', [
    checkToken,
    check('id').isMongoId().isString().notEmpty().custom( (id) => idExistInDb(id, require('../Models/Category'))),
    check('name').notEmpty().isString(),
    checkRoles(['ADMIN']),
    errorHandler
], updateCategory);

router.delete('/:id', [
    checkToken,
    check('id').isMongoId().isString().notEmpty().custom( (id) => idExistInDb(id, require('../Models/Category'))),
    checkRoles(['ADMIN']),
    errorHandler
], deleteCategory);

module.exports = router;