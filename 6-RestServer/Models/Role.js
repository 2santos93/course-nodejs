const {Schema, model} = require('mongoose');

const roleSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    }
});

module.exports = model('Role', roleSchema);