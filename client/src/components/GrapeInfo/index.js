import React, { useState, useEffect } from 'react';
import * as data from '../../utils/grapeList.json';
import { QUERY_GRAPE } from '../../utils/queries';
const GrapeInfo = (data) => {


  
  const grapes  = data;
  // Get a random item given an array
  const getRand = (arr) => arr[Math.floor(Math.random() * arr.length)];

  let picked = grapes[getRand(grapes)];
  console.log(picked);



  return (
    <div id="grapeInfo">
        
        <span role="button" tabIndex="0" onclick>
          Show
        </span>

    </div>
  );
};

export default GrapeInfo;
