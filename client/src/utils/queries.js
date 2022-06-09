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

export const QUERY_ALLWINE = gql`
  query getWineAll {
    getWineAll {
      _id
      winery
      name
      vintage
      grapes
      style
    }
  }
`;

export const QUERY_ALLMYWINE = gql`
  query getMyWineAll {
    getWineAll {
      _id
      winery
      name
      vintage
      grapes
      style
      blend
      score
      critic
      notes
      comments
      consumed
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

