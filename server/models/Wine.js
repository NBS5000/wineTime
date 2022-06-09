const { Schema, model } = require('mongoose');

const wineSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    winery: {
        type: String,
        required: true,
    },
    vintage: {
        type: String,
        required: true,
    },
    consumed: {
        type: Boolean,
        required: true,
        default: false
    },
    comments: {
        type: String,
        required: false,
    },
    notes: {
        type: String,
        required: false,
    },
    critic: {
        type: Number,
        required: false,
    },
    score: {
        type: Number,
        required: false,
    },
    style: {
        type: String,
        required: false,
    },
    blend: {
        type: String,
        required: false
    },
    grapes: [
        {
        type: Schema.Types.Array,
        ref: "Grape"
        },
    ],

});

const Wine = model('Wine', wineSchema);

module.exports = Wine;