
import React, {useEffect, useState} from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_ALLMYWINE } from '../../utils/queries';

const MyWineList = () => {
    const [myWineList, setMyWineList] = useState([]);
    const { data } = useQuery(QUERY_ALLMYWINE);
    const [wineModal, setWineModal] = useState(false)

    const [wineDets, setWineDets] = useState([
        { 
            _id: '',
            profileId: '',
            name: '',
            winery: '',
            vintage: '',
            drinkBy: '',
            style: '',
            grapes: '',

            consumed: '',
            comments: '',
            notes: '',
            critic: '',
            score: '',
            blend: ''
        }
    ]);



    useEffect(() => {
        if (!data)
        return

        const allMyWine = data.getWineAll;
        setMyWineList(allMyWine)
    },[data])


    async function wineModClick(event){
        console.log(event.target)
        debugger
        if(!wineModal){
            setWineDets(
                { 
                    _id: event.target.dataset.id,
                    name: event.target.dataset.name,
                    winery: event.target.dataset.winery,
                    vintage: event.target.dataset.vintage,
                    // drinkBy: e.data.drink,
                    // style: e.data.style,
                    // grapes: e.data.grapes,
        
                    // consumed: e.data.consumed,
                    // comments: e.data.comments,
                    // notes: e.data.notes,
                    // critic: e.data.critic,
                    // score: e.data.score,
                    // blend: e.data.blend
                }
            )

            setWineModal(true);

        }else{
            setWineModal(false);

        }
    }
    



    return (
        <div id="viewWineList">

            <div id="wineListSection">
                {myWineList &&
                myWineList.map((wine, i) => (
                    <div key={wine._id}>
                        <button className="btn_viewWine"  onClick={wineModClick} 
                            data-id={wine._id}
                            data-winery={wine.winery} 
                            data-name={wine.name} 
                            data-vintage={wine.vintage} 
                            data-added={wine.createdAt}
                            data-drink={wine.drinkBy}
                            data-consumed={wine.consumed}
                            data-comments={wine.comments}
                            data-notes={wine.notes}
                            data-critic={wine.critic}
                            data-score={wine.score}
                            data-style={wine.style}
                            data-blend={wine.blend}
                            data-grapes={[wine.grapes]}
                            >
                            <div className="wineCard" key={wine.id}>
                                <img src={`../../assets/images/glass${wine.style}.png`} alt={wine.style} className="wineGlass"/>
                                <div className="wineDets" >
                                    <h3 className="wineTitle" >{wine.winery}</h3>
                                    <h4 className="wineName" >{wine.name}</h4>
                                    {/* <p className="wineGrape">{wine.grapes}</p> */}
                                    <p >{wine.vintage} <em className="drinkBy">({wine.drinkBy})</em></p>
                                </div>
                            </div>
                        </button>
                    </div>
                ))}
            </div>

            
            { wineModal ? (
            <>
            
                <div id="chkGrape">
                    <div id="wineDetBody">
                        <h3 id="mod_winery">{wineDets.winery}</h3>
                        <h4 id="mod_wineName">{wineDets.name}</h4>

                        <div className="closeModalWrap">
                            <button className="grpModal"onClick={wineModClick} id="closeWineModal">Close</button>
                        </div>
                    </div>
                </div>
            </>
            ) : (
            <>
                <div></div>
            </>
            )}

        </div>
    )
};

export default MyWineList;