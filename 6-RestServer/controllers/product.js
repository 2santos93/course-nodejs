const {Product} = require('../Models');

const createProduct = async (req, res) => {
    const { name, price, category } = req.body;
    const user = req.user;
    const product = new Product({name, price, category, user});

    await product.save();

    return res.json(product);

};

const getProduct = async(req, res) => {

    const {id} = req.params;

    const product = await Product.findById(id).populate(['user', 'category']);

    return res.json(product);

};

const getProducts = async(req, res) => {

    const {limit=3, offset=0} = req.query;

    if(isNaN(Number(limit)) || isNaN(Number(offset))) throw new Error('query params must be a number');

    const categories = await Product.find({active: true})
        .limit(Number(limit))
        .skip(Number(offset))
        .populate({path:'user', select:'name'})
        .populate({path:'category', select:'name'});
    
    return res.json({categories});

};

const updateProduct = async(req, res) => {
    const {id} = req.params;
    const { name, price, category } = req.body;

    const product = await Product.findByIdAndUpdate(id, {name, price,category}, {new:true}).populate(['user', 'category']);

    return res.json(product);
};

const deleteProduct = async(req, res) => {
    const {id} = req.params;

    const product = await Product.findByIdAndUpdate(id, {active: false}, {new:true});

    return res.json(product);
};

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct
}