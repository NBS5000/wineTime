const { Schema, model } = require('mongoose');

const collectionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    wines: [
        {
        type: Schema.Types.ObjectId,
        ref: "Wine"
        },
    ],

});

const Collection = model('Collection', collectionSchema);

module.exports = Collection;