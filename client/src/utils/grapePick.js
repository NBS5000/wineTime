import React, { createContext, useContext } from 'react';


// Get a random item given an array
const getRand = (arr) => arr[Math.floor(Math.random() * arr.length)];