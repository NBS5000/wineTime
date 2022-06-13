import React from 'react';
import SearchVineyard from './searchVineyard';

const SearchWine = ({setRefreshWine}) => {


  return (
    <div id="searchWineBody">
                  {/* <Link to="/searchWine" className="profileLinks"> */}
                <div className="homeOptions">
                    <img src="../../assets/images/bottle.png" alt="Bottle of wine" id="profileBottle"/>Add Wine
                </div>
            {/* </Link> */}
        <SearchVineyard /> 
    </div>
    
  );
  
};

export default SearchWine;
