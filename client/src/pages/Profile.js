import React, {useEffect, useState} from 'react';

import { Navigate, useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

import MyWine from '../components/MyWine';
import SearchWine from '../components/SearchWine';
// import MyWines from './MyWines';

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


        <div id="wineListSection">

          <div className="wineCard">
            <img src="../../assets/images/glassRed.png" alt="Red" className="wineGlass"/>
            <div className="wineDets">
              <h3 className="wineTitle">Penfolds</h3>
              <h4 className="wineName">Grange</h4>
              <p className="wineGrape">Shiraz, Cabernet Sauvignon</p>
              <p>2008 <em className="drinkBy">(2058)</em></p>
            </div>
          </div>

          <div className="wineCard">
            <img src="../../assets/images/glassWhite.png" alt="White" className="wineGlass"/>
            <div className="wineDets">
              <h3 className="wineTitle">Grossets</h3>
              <h4 className="wineName">Polish Hill</h4>
              <p className="wineGrape">Riesling</p>
              <p>2019 <em className="drinkBy">(2042)</em></p>
            </div>
          </div>
          <div className="wineCard">
            <img src="../../assets/images/glassSparkling.png" alt="White" className="wineGlass"/>
            <div className="wineDets">
              <h3 className="wineTitle">Gemar Breton</h3>
              <h4 className="wineName">Brut</h4>
              <p className="wineGrape">Pinot Noir, Chardonnay</p>
              <p>NV <em className="drinkBy">(NV)</em></p>
            </div>
          </div>
          
          <div className="wineCard">
            <img src="../../assets/images/glassRose.png" alt="White" className="wineGlass"/>
            <div className="wineDets">
              <h3 className="wineTitle">Gérard Bertrand</h3>
              <h4 className="wineName">Cote des Roses</h4>
              <p className="wineGrape">Grenache, Syrah, Cinsault</p>
              <p>NV <em className="drinkBy">(NV)</em></p>
            </div>
          </div>
          <div className="wineCard">
            <img src="../../assets/images/glassDessert.png" alt="White" className="wineGlass"/>
            <div className="wineDets">
              <h3 className="wineTitle">Drayton's</h3>
              <h4 className="wineName">Family Heritage Vives</h4>
              <p className="wineGrape">Shiraz, Cabernet Sauvignon</p>
              <p>1978 <em className="drinkBy">(2028)</em></p>
            </div>
          </div>
        </div>

        <MyWine />
        <SearchWine />
    </div>
  );
};

export default Profile;
