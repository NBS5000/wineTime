import React from 'react';

const ShowGrape = ({ grapes, title }) => {
  
console.log(grapes);
  return (
    <div>
      <div id="bg">
      </div>
      <p  id="routeHome"></p>
      <div>
        <h3>{title}</h3>
        <div>
          {grapes &&
            grapes.map((grape) => (
              
                  <h4 key="{grape._id}">
                    {grape.grapename} <br />
                  </h4>

            ))}
        </div>
      </div>
    </div>
  );
};

export default ShowGrape;
