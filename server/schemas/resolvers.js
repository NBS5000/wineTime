const { AuthenticationError } = require('apollo-server-express');
const { Profile, Grape, Quote, Wine, Style } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    //get all grapes where description is not null
    getGrapeDescAll: async () => {
      return Grape.find({description: {$ne : null}});
    },

    //get all quotes
    getQuote: async () => {
      return Quote.find();
    },

    getGrapeAll: async () => {
      return Grape.find().sort({grapename:1});
    },

    getWineAll: async () => {
      return Wine.find();
    },

    getMyWineAll: async (parent, {profileId}) => {
      return Wine.find({ profileId: profileId });
    },
    getStyleAll: async () => {
      return Style.find();
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(profile);
      return { token, profile };
    },

    addNewWine: async (parent, { profileId, winery, name, vintage, grapes, style, drinkBy }) => {

        const newWine = await Wine.create({ 
          profileId,
          winery,
          name,
          vintage,
          grapes, 
          style, 
          drinkBy
        });

        return newWine

    },

    // Set up mutation so a logged in user can only remove their profile and no one else's
    /*removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },*/
    // Make it so a logged in user can only remove a skill from their own profile
    /*removeSkill: async (parent, { skill }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { skills: skill } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },*/
  },
};

module.exports = resolvers;
