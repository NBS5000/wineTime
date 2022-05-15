import React/*, { useState }*/ from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_GRAPE } from '../../utils/queries';
import ShowGrape from '../GetGrape';

const GrapeInfo = () => {
  // const [grape, setGrape] = useState('');

  const { data } = useQuery(QUERY_GRAPE);

  const grapeList = data?.getGrapeDescAll || ["X"];

  console.log(grapeList);



  // const getRand = (arr) => arr[Math.floor(Math.random() * arr.length)];
  // let picked = getGrapeDescAll[getRand(getGrapeDescAll)];
  // console.log(getRand(picked));



  return (
    <div id="grapeInfo">
      {/* <ul>
            {grapeList.map((grape) => {
              return (
                <li key={grape._id}>
                  
                  {grape.grapename}

                </li>
              );
            })}
          </ul> */}


        <ShowGrape
            grapes={grapeList}
            title="here's some grapes..."
        />
    </div>
  );
};

export default GrapeInfo;
