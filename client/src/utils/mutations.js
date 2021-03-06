import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
  mutation addProfile($name: String!, $email: String!, $password: String!) {
    addProfile(name: $name, email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const ADD_NEWWINE = gql`
  mutation AddNewWine($profileId: String!, $name: String!, $winery: String!, $vintage: String!, $grapes: [String!], $style: String!, $drinkBy: String!, $quantity: Int) {
    addNewWine(profileId: $profileId, name: $name, winery: $winery, vintage: $vintage, grapes: $grapes, style: $style, drinkBy: $drinkBy, quantity: $quantity) {
      _id
      profileId
      name
      winery
      vintage
      drinkBy
      grapes
      style
      quantity
    }
  }
`;



export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const REMOVE_SKILL = gql`
  mutation removeSkill($skill: String!) {
    removeSkill(skill: $skill) {
      _id
      name
      skills
    }
  }
`;
