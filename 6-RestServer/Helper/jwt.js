const jwt = require('jsonwebtoken');

const generateJWT = (payload) => {
    return new Promise( (resolve, reject) => {
        jwt.sign(payload, process.env.JWT_KEY, { expiresIn:'4h'}, (err, token) => {
            if(err) return reject('Error creating token');

            resolve(token);
        });
    });
}

const verifyJWT = (token) => {
    return new Promise( (resolve, reject) => {
        jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
            if(err) return reject('Invalid token');

            resolve(payload);
        });
    });
};

module.exports = {
    generateJWT,
    verifyJWT
}