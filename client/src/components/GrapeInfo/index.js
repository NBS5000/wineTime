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
  const grapeList = data?.getGrapeDescAll || ["X"];

  function getRand (arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
console.log(vw+"\n"+vh)
  const thisGrape = getRand(grapeList);

  useEffect(() => {
    setGrape({
      name: thisGrape.grapename,
      text: thisGrape.description,
      img: thisGrape.imageLink
    })
  },[])
  console.log(thisGrape);
  return (
    <div id="grapeInfo">
      {loading ? (
          <div>Loading...</div>
      ) : (
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
