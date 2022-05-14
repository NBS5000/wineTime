import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_GRAPE } from '../../utils/queries';

const GrapeInfo = () => {
  const [grape, setGrape] = useState('');

  // const [addGrape, { error }] = useQuery(QUERY_GRAPE);

  const { pickGrape } = grape.readQuery({
    query: QUERY_GRAPE,

  });


  console.log(pickGrape)

    // const [getGrapeDescAll, { error }] = useQuery(QUERY_GRAPE, {
    //   update(cache, { data: [ getGrapeDescAll ] }) {
    //     try {
    //       cache.readQuery({
    //         query: QUERY_GRAPE,
    //       });
    //       console.log("test2")
    //     } catch (e) {
    //       console.log("test3")
    //       console.error(e);
    //     }
    //   },
    // });
  
  // Get a random item given an array
  
  // try{
  //   cache.readQuery({ 
  //     query: QUERY_GRAPE
  //   })
  // }catch{

  // }

  // const getRand = (arr) => arr[Math.floor(Math.random() * arr.length)];
  // let picked = getGrapeDescAll[getRand(getGrapeDescAll)];
  // console.log(getRand(picked));



  return (
    <div id="grapeInfo">
        
        <span role="button" tabIndex="0" onclick>
          Show
        </span>

    </div>
  );
};

export default GrapeInfo;
