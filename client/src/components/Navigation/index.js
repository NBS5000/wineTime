import React from 'react';
import { Link } from 'react-router-dom';



const Navigation = () => {


  return (
    <div id="navigation">
      <div id="navWrapper">
        <Link to="/MyWine" className="navLink" >
            <div className="homeOptions">
                <img src="../../assets/images/rack.png" alt="Rack" id="profileRack"/>My Wine
            </div>
        </Link>
        <Link to="/Search" className="navLink" >
            <div className="homeOptions">
                <img src="../../assets/images/bottle.png" alt="Bottle" id="profileBottle"/>Add Wine
            </div>
        </Link>

        </div>
    </div>
    
  );
  
};

export default Navigation;
