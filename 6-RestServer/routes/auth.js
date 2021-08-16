const { Router } = require('express');
const { check } = require('express-validator');
const { errorHandler } = require('../Middlewares');
const { login } = require('../controllers/auth');

const router = Router();

router.post(
    '/login', 
    [
        check('email').notEmpty().isEmail(),
        check('password').notEmpty().isString(),
        errorHandler
    ],
    login
);

module.exports = router;
