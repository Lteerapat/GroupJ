const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile_image_url: {
        type: String
    },
    location: {
        type: String
    },
    user_line_id: {
        type: String
    },
    
});

const User = mongoose.model('users', userSchema);

module.exports = User;