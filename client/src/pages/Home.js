import React from 'react';

import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';


const Home = () => {

    return (
        <div id="homeContent">
          

            <h1>Home Test</h1>


        </div>
    );
};

export default Home;
