
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_ALLMYWINE } from '../../utils/queries';

const MyWineList = () => {
    const [myWineList, setMyWineList] = useState([]);




    const { loading, data } = useQuery(QUERY_ALLMYWINE);


    useEffect(() => {
        console.log(data)
        if (!data)
        return


        const allMyWine = data.getWineAll;
        console.log(allMyWine)
        setMyWineList(allMyWine)
    },[data])


    return (
        <div id="viewWineList">

            {/* <Link to="myWines" className="profileLinks"> */}
                <div className="homeOptions">
                    <img src="../../../assets/images/rack.png" alt="Rack of wine" id="profileRack"/>My Wines
                </div>
            {/* </Link> */}


            <div id="wineListSection">
                {myWineList &&
                myWineList.map((wine, i) => (
                    <div className="wineCard" key={wine.id}>
                        <img src={`../../assets/images/glass${wine.style}.png`} alt={wine.style} className="wineGlass"/>
                        <div className="wineDets" key={wine.id} >
                            <h3 className="wineTitle" key={wine.id}>{wine.winery}</h3>
                            <h4 className="wineName">{wine.name}</h4>
                            {/* <p className="wineGrape">{wine.grapes}</p> */}
                            <p>{wine.vintage} <em className="drinkBy">(2058)</em></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default MyWineList;