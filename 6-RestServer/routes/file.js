const {Router} = require('express');
const {check} = require('express-validator');

const { modelValidator } = require('../Helper/database');
const {
    uploadFile, 
    updateImage,
    getImage
} = require('../controllers');
const { 
    checkRoles, 
    errorHandler, 
    checkToken, 
    checkFiles 
} = require('../Middlewares');

const router = Router();

router.post('/', [
    checkToken,
    checkFiles,
    checkRoles(['ADMIN']),
    errorHandler
], uploadFile);

router.put('/:collection/:id', [
    checkToken,
    checkFiles,
    check('id').isMongoId().notEmpty(),
    check('collection').isString().notEmpty().custom( modelValidator ),
    errorHandler
],updateImage);

router.get('/:collection/:id', [
    check('id').isMongoId().notEmpty(),
    check('collection').isString().notEmpty().custom( modelValidator ),
    errorHandler
], getImage);

module.exports = router;