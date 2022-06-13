import React from 'react';



import Auth from '../utils/auth';


import Navigation from '../components/Navigation';




const Home = () => {

    return (
        <div id="homeContent">

            {!Auth.loggedIn() ? (
                <>
                <div id="pleaseDiv">
                    <h2 id="pleaseH2" className="dance">Please log in</h2>
                </div>
                </>
            ) : (
                <>
                </>
            )}

        </div>
    );
};

export default Home;
