
import React, {useEffect, useState, useRef} from 'react';
import Auth from '../../utils/auth';

import { Navigate, useParams } from 'react-router-dom';
import { throwServerError, useQuery } from '@apollo/client';
import { QUERY_ALLMYWINE, QUERY_FILTERMYWINE } from '../../utils/queries';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../../utils/queries';



const MyWineList = () =>  {


    const [myWineList, setMyWineList] = useState([]);


    // test
    const {data} = useQuery(QUERY_ALLMYWINE,{pollInterval: 500})
    const [wineModal, setWineModal] = useState(false)

    const [wineDets, setWineDets] = useState(
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
    );
    
    // const [filtering, setFiltering] = useState(false)
    // const [wineFilter, setWineFilter] = useState("");
    
    // const [filterTheList, error] = useQuery(QUERY_FILTERMYWINE);
    // const filterList = async (event) => {

    //     const input = String(event.target.value);
    //     const len = String(input).length

    //     if(!len || len ===0){
    //         setFiltering(false);
    //         return
    //     }else{
    //         setFiltering(true);
    //     }

        

    //     try{
    //         await filterTheList({
    //             variables: { 
    //                 searchTerm: input, 
    //             }
    //         });

    //         console.log()
    //     } catch (error) {
    //         console.error(error);
    //     }



    // }

    useEffect(() => {
        if (!data)
        return

        const allMyWine = data.getWineAll;
        setMyWineList(allMyWine)
    },[data])


    async function wineModClick(event){

        if(!wineModal){
            
            setWineDets(
                { 
                    _id: event.target.dataset.id,
                    name: event.target.dataset.name,
                    winery: event.target.dataset.winery,
                    vintage: event.target.dataset.vintage,
                    drinkBy: event.target.dataset.drink,
                    style: event.target.dataset.style,
                    blend: event.target.dataset.blend,
                    quantity: event.target.dataset.quantity,
                    notes: event.target.dataset.notes,
                    // notes being used as pseudo field for grape names for demo


                    // grapes: e.data.grapes,
        
                    // consumed: e.data.consumed,
                    // comments: e.data.comments,

                    // critic: e.data.critic,
                    // score: e.data.score,
                }
            )
            setWineModal(true);
                console.log(wineDets.quantity)
        }else{
            setWineModal(false);

        }
    }
    



    return (
        <div id="viewWineList">


            {/* filter field */}
            {/* <textarea 
                type="text" className="searchField"  id="wineFilter" 
                placeholder=" " name="textarea" //onChange={filterList} 
                // ref={refFilter}
            ></textarea>

            <label htmlFor="wineFilter" id="lbl_wineFilter"className="searchLabel">Filter</label> */}

            <div id="wineListSection" className="scroll">
                {myWineList &&
                myWineList.map((wine, i) => (
                    <div key={wine._id} onClick={wineModClick} className="wineCardWrap">
                        
                            <div className="wineCard" key={wine.id} >
                                <img src={`../../assets/images/glass${wine.style}.png`} alt={wine.style} className="wineGlass" />
                                <div className="wineDets" >
                                    <h3 className="wineTitle" data-all={wine.toJSON}>{wine.winery}</h3>
                                    <h4 className="wineName" >{wine.name}</h4>
                                    <p className="wineGrape">{wine.notes}</p>
                                    <p >{wine.vintage} <em className="drinkBy" >({wine.drinkBy})</em></p>
                                </div>
                            </div>
                            <button className="btn_viewWine"   
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
                            ></button>
                    </div>
                ))}
            </div>

            
            { wineModal ? (
            <>
            
                <div id="mod_wineDets">
                    <div id="wineDetBody">
                        <h3 id="mod_winery">{wineDets.winery}</h3>
                        <h4 id="mod_wineName">{wineDets.name}</h4>
                        <div id="drinkingDates">
                            <div id="drinkingVint">
                                <p className="modalStyleTitle">Vintage</p>
                                <p id="mod_vintage">{wineDets.vintage}   </p>
                            </div>
                            <div id="drinkingBy">
                                <p className="modalStyleTitle">Drink by</p>
                                <p id="mod_drinkBy">{wineDets.drinkBy}</p>
                                <p id="drinkByDisclaimer">This is an estimation, the Drink By date can vary depending on storage conditions, quality of wine, and provenance.</p>
                            </div>
                        </div>

                        <div id="mod_style">
                            <div id="mod_styleSelectWrap">
                                {/* <select 
                                    className="searchField"  id="wineStyleShow" 
                                    placeholder=" " name="styleSelect" value={wineDets.style} required>
                                    <option value=""></option>
                                    <option value="Red">Red</option>
                                    <option value="White" >White</option>
                                    <option value="Rose">Rose</option>
                                    <option value="Sparkling">Sparkling</option>
                                    <option value="Dessert">Dessert</option>
                                </select>


                                <label htmlFor="wineStyleShow" id="mod_styleLabel" className="searchLabel">Style</label> */}
                            </div>
                            {/* { wineDets.quantity > 1 ? (
                                    <>
                                        <p id="mod_numBottles">{wineDets.quantity} bottles</p>    
                                    </>
                                ) : (
                                    <>
                                        <p id="mod_numBottles">{wineDets.quantity} bottle</p>
                                    </>
                                )
                            } */}

                            <div id="mod_styleImgWrap">
                                <img src={`../../assets/images/glass${wineDets.style}.png`} alt={wineDets.style} id="mod_styleImg" className="wineGlass" />
                            </div>
                            <p id="mod_Grapes">{wineDets.notes}</p>
                            { wineDets.blend ? (
                                    <>
                                        <p id="mod_blend">{wineDets.blend} style blend</p>    
                                    </>
                                ) : (
                                    <>
                                        <div></div>
                                    </>
                                )
                            }
                        </div>


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