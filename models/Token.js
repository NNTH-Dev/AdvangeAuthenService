const mongoose = require('mongoose');
const { create } = require('./User');
const { Schema } = mongoose;

const TokenSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
    expiredAt: {
        type: Date,
        default: new Date().setDate(new Date().getDate() + 7),
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('token', TokenSchema);
