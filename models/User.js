const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSchema = new Schema({
    id: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    studentCode: {
      type: String,
      required: true,
    },
    email: {
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
});

module.exports = mongoose.model('user', UserSchema);
