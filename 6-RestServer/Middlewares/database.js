const User = require('../Models/User');
const Role = require('../Models/Role');

const isValidRole = async (role) =>{
    const roleFinded = await Role.findOne({ name: role });
    if(!roleFinded) throw new Error('role is not found');
};

const isEmailDuplicated = async (email) => {
    const emailFinded = await User.findOne({email});
    if(emailFinded) throw new Error('email has already exists');
};

const idUserExist = async (id) => {
    const userFound = await User.findById(id);
    if(!userFound) throw new Error('user not found');
};


module.exports = {
    isValidRole,
    isEmailDuplicated,
    idUserExist
};
