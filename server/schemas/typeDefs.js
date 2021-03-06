const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    skills: [String]!
    myWine: [String]
    myCollection: [String]
  }

  type Grape {
    _id: ID
    grapename: String
    color: String
    description: String
    imageLink: String
    cellar: String
  }

  type Wine {
    _id: ID
    profileId: String
    name: String
    winery: String
    vintage: String
    drinkBy: String
    consumed: Boolean
    comments: String
    notes: String
    critic: Int
    score: Int
    style: String
    blend: String
    grapes: [String]
    quantity: Int
  }

  type Quote {
    _id: ID
    link: String
    text: String
  }

  type Style {
    _id: ID
    style: String
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

    getWineAll: [Wine]
    getMyWineAll(profileId: ID!): [Wine]
    getMyWineFilter(profileId: String!,searchTerm: String): [Wine]

    getStyleAll: [Style]
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addNewWine(profileId: String!, name: String!, winery: String!, vintage: String!, grapes: [String!], style: String!, drinkBy: String, quantity:Int): Wine
    addMyWine(profileId: ID!, myCollection: String!): Profile

    removeProfile: Profile
    removeSkill(skill: String!): Profile
  }
`;

module.exports = typeDefs;
