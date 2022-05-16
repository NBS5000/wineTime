import React from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_QUOTE } from '../../utils/queries';

const QuoteInfo = () => {
  const { loading, data } = useQuery(QUERY_QUOTE);
  const quoteList = data?.getQuote || ["X"];

  console.log(quoteList);



  // const getRand = (arr) => arr[Math.floor(Math.random() * arr.length)];
  // let picked = getGrapeDescAll[getRand(getGrapeDescAll)];
  // console.log(getRand(picked));



  return (
    <div id="quoteOfDay">
      {loading ? (
          <div>Loading...</div>
      ) : (

            <img id="qt_Img" 
            src="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F24%2F2020%2F09%2F23%2FBurgundy-National-Wine-Day-Social-Media-Graphic-24.jpg"
            alt="I drink and I know things. -Tyrion Lannister"/>
        )}
    </div>
    
  );
  
};

export default QuoteInfo;
