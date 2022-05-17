const { Schema, model } = require('mongoose');

const collectionSchema = new Schema({
    wines: [
        {
        type: Schema.Types.ObjectId,
        ref: "Wine"
        },
    ],

});

const Collection = model('Collection', collectionSchema);

module.exports = Collection;