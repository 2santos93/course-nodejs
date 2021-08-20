const {Router} = require('express');

const {
    searchElements
} = require('../controllers');

const router = new Router();

router.get('/:collection/:query', searchElements);

module.exports = router;