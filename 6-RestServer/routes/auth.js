const { Router } = require('express');
const { check } = require('express-validator');
const { errorHandler } = require('../Middlewares');
const { login, googleLogin } = require('../controllers/auth');

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

router.post(
    '/login/google', 
    [
        check('id_token').notEmpty().isString(),
        errorHandler
    ],
    googleLogin
);

module.exports = router;
