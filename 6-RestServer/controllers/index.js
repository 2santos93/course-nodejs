const auth = require('./auth');
const category = require('./category');
const user = require('./user');
const product = require('./product');
const search = require('./search');
const file = require('./file');

module.exports = {
    ...auth,
    ...user,
    ...category,
    ...product,
    ...search,
    ...file,
}