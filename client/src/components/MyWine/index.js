
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

            {/* {wineList &&
            wineList.map((wine, i) => (
            <div className="wineBox">
                <img src={"../../assets/images/"+ wine.style +".png"} alt={wine.style}/>
                <h3>{wine.winery}</h3>
                <p>{wine.name}</p>
                <p>{wine.grapes}</p>
                <p>{wine.vintage}</p>
            </div>

            ))} */}
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
                        <h3 className="wineTitle">{wine.winery}</h3>
                        <h4 className="wineName">{wine.name}</h4>
                        {/* <p className="wineGrape">{wine.grapes}</p> */}
                        <p>{wine.vintage} <em className="drinkBy">(2058)</em></p>
                    </div>
                </div>
                    
                ))}

            </div>






            {/* <div id="wineListSection">
                <div className="wineCard">
                    <img src="../../assets/images/glassRed.png" alt="Red" className="wineGlass"/>
                    <div className="wineDets">
                    <h3 className="wineTitle">Penfolds</h3>
                    <h4 className="wineName">Grange</h4>
                    <p className="wineGrape">Shiraz, Cabernet Sauvignon</p>
                    <p>2008 <em className="drinkBy">(2058)</em></p>
                    </div>
                </div>
                <div className="wineCard">
                    <img src="../../assets/images/glassWhite.png" alt="White" className="wineGlass"/>
                    <div className="wineDets">
                        <h3 className="wineTitle">Grossets</h3>
                        <h4 className="wineName">Polish Hill</h4>
                        <p className="wineGrape">Riesling</p>
                        <p>2019 <em className="drinkBy">(2042)</em></p>
                    </div>
                </div>
                <div className="wineCard">
                    <img src="../../assets/images/glassSparkling.png" alt="White" className="wineGlass"/>
                    <div className="wineDets">
                    <h3 className="wineTitle">Gemar Breton</h3>
                    <h4 className="wineName">Brut</h4>
                    <p className="wineGrape">Pinot Noir, Chardonnay</p>
                    <p>NV <em className="drinkBy">(NV)</em></p>
                    </div>
                </div>
                <div className="wineCard">
                    <img src="../../assets/images/glassRose.png" alt="White" className="wineGlass"/>
                    <div className="wineDets">
                    <h3 className="wineTitle">Gérard Bertrand</h3>
                    <h4 className="wineName">Cote des Roses</h4>
                    <p className="wineGrape">Grenache, Syrah, Cinsault</p>
                    <p>NV <em className="drinkBy">(NV)</em></p>
                    </div   >
                </div>
                <div className="wineCard">
                    <img src="../../assets/images/glassDessert.png" alt="White" className="wineGlass"/>
                    <div className="wineDets">
                    <h3 className="wineTitle">Drayton's</h3>
                    <h4 className="wineName">Family Heritage Vives</h4>
                    <p className="wineGrape">Shiraz, Cabernet Sauvignon</p>
                    <p>1978 <em className="drinkBy">(2028)</em></p>
                    </div>
                </div>                            
            </div>                                                                   */}
        </div>
    )
};

export default MyWineList;







