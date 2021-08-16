const { generateJWT } = require('../Helper/jwt');
const bcrypt = require('bcryptjs');
const User = require('../Models/User');

const login = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({active: true, email});

    if(!user) return res.status(400).json({message: 'user not found'});

    const isTheSamePassword = bcrypt.compareSync(password, user.password);

    if(!isTheSamePassword) return res.status(400).json({message: 'invalid password'});

    try{
        const token = await generateJWT({uid: user.id});

        res.json({
            token,
            user
        });
    }catch(err){
        res.status(500).json({message: err});
    }

};

module.exports = {
    login,
};