const { Schema, model } = require('mongoose');

const blendSchema = new Schema({
    link: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    grapes: [
        {
        type: Schema.Types.ObjectId,
        ref: "Grape"
        },
    ],

});

const Blend = model('Blend', blendSchema);

module.exports = Blend;