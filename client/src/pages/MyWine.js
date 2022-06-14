import React from 'react';

import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';
import Fun from '../components/Fun';
import Please from '../components/Please';

import Auth from '../utils/auth';

import MyWineList from '../components/MyWineList';

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

  // if (!profile?.name) {
  //   return (
  //     <h4>
  //       Please log in first.
  //     </h4>
  //   );
  // }




  return (
    <div>
        {!Auth.loggedIn() ? (
            <>
                <Please />
                <Fun />
            </>
            ) : (
            <>
                <div>
                  <MyWineList />
                </div>
            </>
            )}

    </div>
  );
};

export default MyWine;
