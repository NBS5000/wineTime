const { Schema, model } = require('mongoose');

const styleSchema = new Schema({
    style: {
        type: String,
        required: true,
    },

});

const Style = model('Style', styleSchema);

module.exports = Style;