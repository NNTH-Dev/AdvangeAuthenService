const { Schema, default: mongoose } = require('mongoose');
const { create } = require('./User');

const AccountSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    studentCode: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true
    },
    passwordId: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        default: 'user',
    }
});

module.exports = mongoose.model('account', AccountSchema);
