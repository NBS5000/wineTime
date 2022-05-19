const { Schema } = require('mongoose');

const collectionSchema = new Schema({
    wineId: {
        type: String,
        required: true,
    }

});


module.exports = collectionSchema;