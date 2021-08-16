const database = require('./database');
const error = require('./error');
const token = require('./token');
const role = require('./role');

module.exports = {
    ...database,
    ...error,
    ...token,
    ...role
}