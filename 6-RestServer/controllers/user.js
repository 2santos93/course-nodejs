const User = require('../Models/User');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {

    const {limit = 3, offset = 0} = req.query;

    if(isNaN(Number(limit)) || isNaN(Number(offset))) throw new Error('query params must be a number');

    const usersPromise = User.find({active: true})
        .limit(Number(limit))
        .skip(Number(offset));

    const totalPromise = User.countDocuments({active: true});

    const [users, totalCount] = await Promise.all([
        usersPromise,
        totalPromise
    ]);

    res.json({
        users,
        totalCount,
    });

};

const postUser = async (req, res) => {

    try{
        const body = req.body;
        const salt = bcrypt.genSaltSync(10);
        body.password = bcrypt.hashSync(body.password, salt);

        const user = new User(body);
        await user.save();
        res.json(user);
    }catch(err){
        res.status(err.code).json(err);
    }

};

const updateUser = async (req, res) => {

    const id = req.params.id;
    const {_id, ...user} = req.body.password

    if(userpassword){
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
    }

    const userUpdated = await User.findByIdAndUpdate(id, user, {new: true});

    res.json({user: userUpdated});

};

const deleteUser = async (req, res) => {

    const id = req.params.id;

    const userDeleted = await User.findByIdAndUpdate(id, {active:false});

    res.json(userDeleted);
};

module.exports = {
    getUsers,
    postUser,
    updateUser,
    deleteUser
}