const Category = require('./Category');
const User = require('./User');
const Role = require('./Role');
const Product = require('./Product');

const collectionsEnabled = [
    'category',
    'user',
    'product',
];


module.exports = {
    Category,
    User,
    Role,
    Product,
    collectionsEnabled
}