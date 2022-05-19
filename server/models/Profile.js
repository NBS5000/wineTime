const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const collectionSchema = require('./Collection');

const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email address",
    ]
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  myWine: [collectionSchema],
  myCollection: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Wine'
    }
  ]
},
{
  toJSON: {
    virtuals: true,
  },
});

// set up pre-save middleware to create password
profileSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
profileSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};


profileSchema.virtual('wineCount').get(function () {
  return this.myLength.length;
});

const Profile = model('Profile', profileSchema);

module.exports = Profile;
