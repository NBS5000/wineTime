import React, { createContext, useContext } from 'react';
import * as data from './grapeList.json';


module.exports={
pick: function (){
        const { grapes } = data;
        // Get a random item given an array
        const getRand = (arr) => arr[Math.floor(Math.random() * arr.length)];

        let picked = grapes[getRand(data)];
        console.log(picked);
    }
}