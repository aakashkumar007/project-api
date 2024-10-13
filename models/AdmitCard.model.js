const mongoose = require('mongoose');

const admitCardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const AdmitCard = mongoose.model('AdmitCard', admitCardSchema);

module.exports = AdmitCard;
