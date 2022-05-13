const { Schema, model } = require('mongoose');

const grapeSchema = new Schema({
    grapename: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    type: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
});

const Grape = model('Grape', grapeSchema);

module.exports = Grape;