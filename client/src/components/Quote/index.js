import React, {useEffect, useState} from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_QUOTE } from '../../utils/queries';

const QuoteInfo = () => {
  const [quote, setQuote] = useState({ 
    img: '', 
    text: ''
  });

  const { loading, data } = useQuery(QUERY_QUOTE);


  function getRand (arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }



  useEffect(() => {
    if (!data)
    return

    const quoteList = data?.getQuote || ["X"];
    const thisQuote = getRand(quoteList);
    setQuote({
      img: thisQuote.link,
      text: thisQuote.text
    })
  },[data])

// console.log(thisQuote);
  return (
    <div id="quoteOfDay">
      {loading ? (
          <div>Loading...</div>
      ) : (
        quote && 
            <img id="qt_Img" src={quote.img} alt={quote.text}/>
        
        )}
    </div>
  );
};

export default QuoteInfo;
