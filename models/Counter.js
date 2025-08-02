const mongoose = require('mongoose');

const counterSchema = new mongoose.Schema({
    siteId: { type: String, required: true, unique: true },
    count: { type: Number, default: 0 },
});

module.exports = mongoose.model('Counter', counterSchema);
