import { gql } from '@apollo/client';

export const QUERY_GRAPE = gql`
  query getGrapeDescAll {
    getGrapeDescAll {
      _id
      grapename
      color
      description
      imageLink
    }
  }
`;

export const QUERY_ALLGRAPES = gql`
  query getGrapeAll {
    getGrapeAll {
      _id
      grapename
    }
  }
  `;

export const QUERY_QUOTE = gql`
  query getQuote {
    getQuote {
      _id
      link
      text
    }
  }
`;


export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      skills
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      skills
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
    }
  }
`;

