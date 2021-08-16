const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER'],
        required: [true, 'role is required']
    },
    active: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false,
    },
});

userSchema.methods.toJSON = function(){
    const { password, __v, _id, ...user } = this.toObject();

    user.uid = _id
    return user;
};

module.exports = model('User', userSchema);