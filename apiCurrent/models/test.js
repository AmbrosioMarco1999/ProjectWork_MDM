const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    years: {
        type: String,
        required: true
    }
})

const Test = mongoose.model('Test', TestSchema);

module.exports = Test;