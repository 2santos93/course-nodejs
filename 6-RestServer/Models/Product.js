const { Schema, model} = require('mongoose');

const productSchema = Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    price: {
        type: Number,
        default: 0,
        required: [true, 'price is required']
    },
    available: {
        type: Boolean,
        default: true        
    },
    active: {
        type: Boolean,
        default: true        
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user is required']
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    img: {
        type: String,
    },
});

module.exports = model('Product', productSchema);