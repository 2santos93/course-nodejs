const {verifyJWT} = require('../Helper/jwt');
const User = require('../Models/User');

const checkToken = async (req, res, next) => {

    try{

        const token = req.headers['x-token'];
        
        const payload = await verifyJWT(token);
        
        const user = await User.findById(payload.uid);

        if(!user || !user.active){
            throw new Exception('User not found');
        }

        req.user = user;

        next();
    }catch(err){
        return res.status(401).json(err);
    }

}; 

module.exports = {
    checkToken
} 