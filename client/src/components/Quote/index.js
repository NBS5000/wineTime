import React, {useEffect, useState} from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_QUOTE } from '../../utils/queries';

const QuoteInfo = () => {
  const [quote, setQuote] = useState({ 
    img: '', 
    text: ''
  });

  const { loading, data } = useQuery(QUERY_QUOTE);
  const quoteList = data?.getQuote || ["X"];

  function getRand (arr){
    return arr[Math.floor(Math.random() * arr.length)];
  }

  const thisQuote = getRand(quoteList);
  console.log(thisQuote);
  useEffect(() => {
    setQuote({
      img: thisQuote.link,
      text: thisQuote.text
    })
  },[])

console.log(thisQuote);
  return (
    <div id="quoteOfDay">
      {loading ? (
          <div>Loading...</div>
      ) : (
            <img id="qt_Img" src={quote.img} alt={quote.text}/>
        )}
    </div>
  );
};

export default QuoteInfo;
