
import React, {useEffect, useState} from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_ALLWINE } from '../../utils/queries';

const MyWineList = () => {
    const [wineList, setWineList] = useState();

    const { loading, data } = useQuery(QUERY_ALLWINE);


    useEffect(() => {
        if (!data)
        return

        const allWine = data?.getQuote || ["X"];
        console.log(allWine);
        setWineList([allWine])
    },[])

// console.log(thisQuote);
    return (
        <div id="viewWineList">
            {wineList &&
            wineList.map((wine, i) => (
            <div className="wineBox">
                <img src={"../../assets/images/"+ wine.style +".png"} alt={wine.style}/>
                <h3>{wine.winery}</h3>
                <p>{wine.name}</p>
                <p>{wine.grapes}</p>
                <p>{wine.vintage}</p>
            </div>

    ))}

        </div>
    )
};

export default MyWineList;







