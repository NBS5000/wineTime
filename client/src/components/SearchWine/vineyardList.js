import React from 'react';


function VineyardList  ({ vineyards })  {

    return (
        <div>
            <ul id="vineList">
                {vineyards &&
                vineyards.map((vineyard) => (
                    <li key={vineyard._id}>
                        {vineyard.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default VineyardList;

