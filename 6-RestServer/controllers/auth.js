const bcrypt = require('bcryptjs');
const {OAuth2Client} = require('google-auth-library');

const User = require('../Models/User');

const { generateJWT } = require('../Helper/jwt');

const login = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({active: true, email});

    if(!user) return res.status(400).json({message: 'user not found'});
    
    if(!user.active) res.status(401).json({message: 'user not found'});  

    if(user.google){
        res.status(401).json({message: 'use the correct login method'});
    }

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

const googleLogin = async (req, res) => {

    const {id_token} = req.body;

    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

    const ticket  = await client.verifyIdToken({
        idToken: id_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

    const { name, email, sub } = ticket.getPayload();

    const user = await User.findOne({email});

    if(user){

        if(!user.google) return res.status(401).json({message: 'use the correct login method'});
        if(!user.active) return res.status(401).json({message: 'user not found'});
    }else{

        const user = new User({name, email, google:true, password:sub});
        await user.save();
    }
    
    const token = await generateJWT({uid: user.id});

    res.json({
        token,
        user
    });
};

module.exports = {
    login,
    googleLogin
};