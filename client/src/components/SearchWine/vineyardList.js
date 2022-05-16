import React from 'react';


const VineyardList = ({ vineyards }) => {

    return (
        <div>
            {vineyards &&
            vineyards.map((vineyard) => (
                <li key={vineyard._id}>
                    {vineyard.name}
                </li>
            ))}
        </div>
    );
};

export default VineyardList;

