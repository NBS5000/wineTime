const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    skills: [String]!
    myWine: [String]
  }

  type Grape {
    _id: ID
    grapename: String
    color: String
    description: String
    imageLink: String
  }

  type Wine {
    _id: ID
    name: String
    winery: String
    vintage: String
    consumed: Boolean
    comments: String
    notes: String
    critic: Integer
    score: Integer
    style: String
    blend: String
    grapes: [String]
  }

  type Quote {
    _id: ID
    link: String
    text: String
  }


  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Profile
    getGrapeAll: [Grape]!
    getGrapeDescAll: [Grape]
    getQuote: [Quote]
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addSkill(profileId: ID!, skill: String!): Profile
    removeProfile: Profile
    removeSkill(skill: String!): Profile
  }
`;

module.exports = typeDefs;
