const mongoose = require('mongoose');
const { Schema } = mongoose;

const PasswordSchema = new Schema({
    id: {
        type: String,
        require: true
    },
    hashPassword: {
        type: String,
        require: true
    },
    salt: {
        type: String,
        require: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('password', PasswordSchema);