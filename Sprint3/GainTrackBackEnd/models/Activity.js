const mongoose = require('mongoose');
const { Schema } = mongoose;

const activitySchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user_line_id: {
        type: String,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    activity_type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    distance: {
        type: Number,
        required: true
    },
    calories: Number,
    note: String,
    create_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const Activity = mongoose.model('activities', activitySchema);

module.exports = Activity;