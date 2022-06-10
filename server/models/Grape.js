const { Schema, model } = require('mongoose');

const grapeSchema = new Schema({
    grapename: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    color: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    imageLink: {
        type: String,
    },
    cellar: {
        type: String,
    }
});

const Grape = model('Grape', grapeSchema);

module.exports = Grape;