const db = require('../config/connection');
const { Profile, Grape, Quote } = require('../models');
const profileSeeds = require('./profileSeeds.json');
const grapeSeeds = require('./grapeSeeds.json');
const quoteSeeds = require('./quoteSeeds.json');

db.once('open', async () => {
  try {
    await Profile.deleteMany({});
    await Profile.create(profileSeeds);
    await Grape.deleteMany({});
    await Grape.create(grapeSeeds);
    await Quote.deleteMany({});
    await Quote.create(quoteSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
