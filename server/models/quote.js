const { Schema, model } = require('mongoose');

const quoteSchema = new Schema({
    link: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },

});

const Quote = model('Quote', quoteSchema);

module.exports = Quote;