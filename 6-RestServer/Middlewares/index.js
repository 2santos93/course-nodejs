const error = require('./error');
const token = require('./token');
const role = require('./role');
const upload = require('./upload');

module.exports = {
    ...error,
    ...token,
    ...role,
    ...upload
}