import React, {useEffect, useState} from 'react';

import { Navigate, useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

import SearchVineyard from '../components/SearchWine/searchVineyard';
import SearchWine from '../components/SearchWine';
import MyWines from './MyWines';

const Profile = () => {
  const { profileId } = useParams();

  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(
    profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
    {
      variables: { profileId: profileId },
    }
  );

  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || data?.profile || {};

  // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data._id === profileId) {
    console.log('profile 29')
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile?.name) {
    return (
      <h4>
        Please log in first.
      </h4>
    );
  }

  return (
    <div id="profile">

        <Routes>
            <Route 
                path="../components/searchWine"
                element={<SearchWine />}
            />
            <Route 
                path="./MyWine"
                element={<MyWines />}
            />
        </Routes>
      
        <div id="profileOptions">
            <Link to="myWines" className="profileLinks">
                <div className="homeOptions">
                    <img src="../../assets/images/rack.png" alt="Rack of wine" id="profileRack"/>My Wines
                </div>
            </Link>
            <Link to="/searchWine" className="profileLinks">
              <div className="homeOptions">
                  <img src="../../assets/images/bottle.png" alt="Bottle of wine" id="profileBottle"/>Add Wine
              </div>
            </Link>
            <div className="homeOptions">
                <img src="../../assets/images/corkscrew.png" alt="Corkscrew" id="profileScrew"/>Statistics
            </div>
        </div>


        <SearchWine />
    </div>
  );
};

export default Profile;
