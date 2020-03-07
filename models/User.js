const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
}, {
    timestamps: true,
});

module.exports = User = mongoose.model('user', UserSchema);