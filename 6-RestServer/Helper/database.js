const {User, Product, Role} = require('../Models');

const allowedCollections = ['Product', 'User'];

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

const idExistInDb = async (id, model) => {
    const document = await model.findById(id);

    if(!document || !document.active) throw new Error('id not found');
}

const productExists = async (name, { req }) => {
    const {category} = req.body; 
    const product = await Product.findOne({name, category});
    
    if(product) throw new Error('the product has already exists');
};

const modelValidator = async (collection, {req}) => {
    const { id } = req.params;

    if(!allowedCollections.includes(collection)) throw new Error('collection not found');

    const model = require(`../Models/${collection}`);
    const document = await model.findById(id);

    if(!document) throw new Error('document not found');

    return true;
}


module.exports = {
    isValidRole,
    isEmailDuplicated,
    idUserExist,
    idExistInDb,
    productExists,
    modelValidator
};
