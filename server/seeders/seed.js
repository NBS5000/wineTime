const db = require('../config/connection');
const { Profile, Grape, Quote, Wine } = require('../models');
const profileSeeds = require('./profileSeeds.json');
const grapeSeeds = require('./grapeSeeds.json');
const quoteSeeds = require('./quoteSeeds.json');
const wineSeeds = require('./wineSeeds.json');

db.once('open', async () => {
  try {
    await Profile.deleteMany({});
    await Profile.create(profileSeeds);
    await Grape.deleteMany({});
    await Grape.create(grapeSeeds);
    await Quote.deleteMany({});
    await Quote.create(quoteSeeds);
    await Wine.deleteMany({});
    await Wine.create(wineSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
