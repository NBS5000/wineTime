import React from 'react';

import Please from "../components/Please";

import Auth from '../utils/auth';






const Home = () => {

    return (
        <div id="homeContent">

            {!Auth.loggedIn() ? (
                <>
                    <Please />
                </>
            ) : (
                <>
                </>
            )}

        </div>
    );
};

export default Home;
