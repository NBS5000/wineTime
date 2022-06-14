import React from 'react';
import { useLocation } from 'react-router-dom'

import Auth from '../../utils/auth';

import GrapeInfo from '../GrapeInfo';
import QuoteInfo from '../Quote';

const Fun = () => {


    
    // if(!prof){
    //     return <Please />;
    // }
    

    function getMyName(){
        const prof = Auth.getProfile();
        const myName = prof.data.name;

        return myName;
    }

    let landing;
    const location = useLocation();
    if(location.pathname === "/" || location.pathname ==="/login"){
        landing = true; 
    }
    else{
        landing = false;
    }

    return (
        <div id="funContent">

        {landing ? (
            <div>
                {Auth?.loggedIn() ? (
                    <>
                    <h2 id="hello" className="dance">Hello { getMyName() }!</h2>
                    </>
                ) : (
                    <>
                    </>
                )}
                <div>
                    <GrapeInfo />
                    <QuoteInfo />
                </div>
            </div>
        ) : (
            <div></div>
        )}
        </div>
    );
}
    export default Fun;