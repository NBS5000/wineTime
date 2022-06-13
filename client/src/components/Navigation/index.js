import React from 'react';
import { Link } from 'react-router-dom';



const Navigation = () => {


  return (
    <div id="navigation">
        <Link to="/Search" >
                <div className="homeOptions">
                    <img src="../../assets/images/bottle.png" alt="Bottle" id="profileBottle"/>Add Wine

            </div>
        </Link>
        <Link to="/MyWine" >
                <div className="homeOptions">
                    <img src="../../assets/images/rack.png" alt="RAck" id="profileRack"/>Add Wine
            </div>
        </Link>

    </div>
    
  );
  
};

export default Navigation;
