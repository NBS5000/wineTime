const { Schema, model } = require('mongoose');
const grapeSchema = require('./Grape');
const dateFormat = require('../utils/dateFormat');

const wineSchema = new Schema({
    profileId: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
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
    drinkBy: {
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
        type: Schema.Types.ObjectId,
        ref: "Grape"
        },
    ],

},
{
    toJSON: {
        getters: true,
        virtuals: true,
    },
    toObject: {
        getters: true,
        virtuals: true,
    }
});

wineSchema
    .virtual('grapeCount')
    .get(function () {
        return this.grapes.length;
    });


const Wine = model('Wine', wineSchema);

// let gs = grapeSchema;
// Wine.findOne({ _id: this._id })
//     .populate('grapes').exec((err, gs) => {
//         console.log("Grape: " + gs);
//     })

// function populateGrapeNames(id){
//     return Wine.findOne({ _id: id })
//         .populate('grapes').exec((err, gs) => {
//         console.log("Populated Grapes: " + grapeSchema);
//         })
//     }

// populateGrapeNames(this._id)
module.exports = Wine;