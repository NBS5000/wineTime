import { gql } from '@apollo/client';

export const QUERY_GRAPE = gql`
  query getGrapeDescAll {
    grape {
      _id
      grapename
      color
      description
      imageLink
    }
  }
`;

export const QUERY_QUOTE = gql`
  query getQuote {
    quote {
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
      skills
    }
  }
`;

