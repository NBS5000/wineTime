import React, {useEffect, useState} from 'react';

import { Navigate, useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

// import MyWine from './MyWine';
// import MyWines from './MyWines';

const MyWine = () => {
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
    <div>

        {/* <Routes>
            <Route 
                path="../components/searchWine"
                element={<SearchWine />}
            />
        </Routes> */}
      
        {/* <div id="profileOptions">


            <div className="homeOptions">
                <img src="../../assets/images/corkscrew.png" alt="Corkscrew" id="profileScrew"/>Statistics
            </div>
        </div> */}

<div>
            <div>
                <MyWine />
            </div>
        </div>

    </div>
  );
};

export default MyWine;
