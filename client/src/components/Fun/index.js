import React from 'react';
import { useLocation } from 'react-router-dom'

import GrapeInfo from '../GrapeInfo';
import QuoteInfo from '../Quote';

const Fun = () => {
    let landing;
    const location = useLocation();
    console.log(location.pathname);
    if(location.pathname === "/"){
        landing = true; 
    }
    else{
        landing = false;
    }

    return (
        <div id="funContent">

        {landing ? (
            <div>
            <GrapeInfo />
            <QuoteInfo />
            </div>
        ) : (
            <div></div>
        )}
        </div>
    );
}
    export default Fun;