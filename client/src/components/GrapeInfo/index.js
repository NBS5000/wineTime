import React, {useEffect, useState}from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_GRAPE } from '../../utils/queries';

const GrapeInfo = () => {
  const [grape, setGrape] = useState({ 
    name: '', 
    text: '', 
    img: ''
  });
  const { loading, data } = useQuery(QUERY_GRAPE);



  function getRand (arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }


  useEffect(() => {
    if (!data)
    return
    
    const grapeList = data?.getGrapeDescAll || ["X"];
    const thisGrape = getRand(grapeList);
    setGrape({
      name: thisGrape.grapename,
      text: thisGrape.description,
      img: thisGrape.imageLink
    })
  },[data])
  return (
    <div id="grapeInfo">
      {loading ? (
          <div>Loading...</div>
      ) : (
        grape &&
          <div id="grapeOfDay">
            <img id="god_Img" src={grape.img} alt={grape.name}/>
            <div id="god_Details">
              <h3 id="god_Title" className="dance">{grape.name}</h3>
              <p id="god_Desc" className="rubik">{grape.text}</p>
            </div>
          </div>
        )}
    </div>
  );
};

export default GrapeInfo;
