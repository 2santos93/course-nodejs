const Category = require('../Models/Category');

const getCategories = async (req, res) => {

    const {limit=3, offset=0} = req.query;

    if(isNaN(Number(limit)) || isNaN(Number(offset))) throw new Error('query params must be a number');

    const categories = await Category.find({active: true})
        .limit(Number(limit))
        .skip(Number(offset))
        .populate('user');
    
    return res.json({categories});
};

const getCategory = async (req, res) => {
    const {id: _id} = req.params;

    const category = await Category.findOne({active: true, _id}).populate('user');

    return res.json({category});
};

const createCategory = (req, res) => {

    const {name} = req.body;

    const user = req.user;

    const category = new Category({name, user});

    category.save();

    return res.json({category});
    
};

const updateCategory =  async (req, res) => {

    const {id} = req.params;
    const {name} = req.body;

    const user = req.user;

    const category = await Category.findByIdAndUpdate(id, {user, name}, {new: true});

    return res.json({category});

};

const deleteCategory = async (req, res) => {
    const {id} = req.params;

    const category = await Category.findByIdAndUpdate(id, {active: false}, {new: true});

    return res.json({category});
};

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
};