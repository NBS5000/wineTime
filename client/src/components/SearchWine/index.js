import React, {useState} from 'react';
import SearchVineyard from './searchVineyard';
// import VineyardList from './VineyardList';

// const txt_Vineyard = document.querySelector("#winerySearch");
// const requestUrl = 'https://app.gustos.life/en/api/v1';

// setVyard={setVyard} vyard={vyard} />
const SearchWine = () => {


  return (
    <div id="searchWine">
        <SearchVineyard /> 
        {/* <VineyardList vyard={vyard} /> */}
    </div>
    
  );
  
};

export default SearchWine;
