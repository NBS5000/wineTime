import React from 'react';
import ShowGrape from '../GetGrape';
import { useQuery } from '@apollo/client';
import { QUERY_GRAPE } from '../../utils/queries';

const GrapeInfo = () => {
  const { loading, data } = useQuery(QUERY_GRAPE);
  const grapeList = data?.getGrapeDescAll || ["X"];

  console.log(grapeList);



  // const getRand = (arr) => arr[Math.floor(Math.random() * arr.length)];
  // let picked = getGrapeDescAll[getRand(getGrapeDescAll)];
  // console.log(getRand(picked));



  return (
    <div id="grapeInfo">
      {loading ? (
          <div>Loading...</div>
      ) : (

          <div id="grapeOfDay">

            <img id="god_Img" src="https://usawineratings.com/cont/blog/imagePot/USAWineRatings-03152019084731000000-5c8b66a37723c.jpg" />
            <div id="god_Details">
              <h3 id="god_Title" className="dance">Pinot Blanc</h3>
              <p id="god_desc" className="rubik">The traditional home of Pinot Blanc is the northeast of France, in the Alsace wine growing region. In addition, Pinot Blanc is grown in France’s famed Burgundy wine region. Outside of France, Pinot Blanc is also popular in the Baden and Palatinate wine regions of Germany (where it is known as Weissburgunder), in Austria (where it is known as Klevner), and in Spain and Italy (where it is known as Pinot Bianco).</p>
            </div>
          </div>



          // <ShowGrape
          //     grapes={grapeList}
          //     title="here's some grapes..."
          // />
        )}
    </div>
    
  );
  
};

export default GrapeInfo;
