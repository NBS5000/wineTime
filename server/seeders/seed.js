const db = require('../config/connection');
const { Profile, Grape, Quote, Wine, Style } = require('../models');
const profileSeeds = require('./profileSeeds.json');
const grapeSeeds = require('./grapeSeeds.json');
const quoteSeeds = require('./quoteSeeds.json');
const wineSeeds = require('./wineSeeds.json');
const styleSeeds = require('./styleSeeds.json');

db.once('open', async () => {
  try {
    await Profile.deleteMany({});
    await Profile.create(profileSeeds);
    console.log('Profiles done');
    await Grape.deleteMany({});
    await Grape.create(grapeSeeds);
    console.log('Grapes done');
    await Quote.deleteMany({});
    await Quote.create(quoteSeeds);
    console.log('Quotes done');
    await Wine.deleteMany({});
    await Wine.create(wineSeeds);
    console.log('Wines done');
    await Style.deleteMany({});
    await Style.create(styleSeeds);
    console.log('Styles done');

    console.log('Seeding complete');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
