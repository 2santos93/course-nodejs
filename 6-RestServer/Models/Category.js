const { Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    active: {
        type: Boolean,
        default: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'user is required']
    }
});

CategorySchema.methods.toJSON = function() {

    const {_id, __v, ...category} = this.toObject();

    category.uid = _id;

    return category; 
};

module.exports = model('Category', CategorySchema);