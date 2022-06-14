
import React, {useEffect, useState, useRef} from 'react';
import Auth from '../../utils/auth';

import { Navigate, useParams } from 'react-router-dom';
import { throwServerError, useQuery } from '@apollo/client';
import { QUERY_ALLMYWINE, QUERY_FILTERMYWINE } from '../../utils/queries';

import { QUERY_SINGLE_PROFILE, QUERY_ME } from '../../utils/queries';



const MyWineList = () => {

    // function myId (){
        // const prof = Auth.getProfile(); const me = prof.data._id; return me;


        const refFilter = useRef("");
    //     return me;
    // }
    // const { profileId } = useParams();

    // const { loading, d } = useQuery(
    //     profileId ? QUERY_SINGLE_PROFILE : QUERY_ME,
    //     {
    //         variables: { profileId: profileId },
    //     }
    // );

    // console.log(me)


    //, {$or: [ { name: { $regex: searchTerm, $options: 'i'}}, {winery: { $regex: searchTerm,$options: 'i'}}]}
    //, 'searchTerm':refFilter


    const [myWineList, setMyWineList] = useState([]);
    let { data } = useQuery(QUERY_FILTERMYWINE,
            {
                'profileId': async function me () { const prof = await Auth.getProfile(); const me = toString(prof.data._id); return me;}, 
                'searchTerm': refFilter
            }, 
            {pollInterval: 500}
        );
    // let {filterData} = useQuery(QUERY_FILTERMYWINE)
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
    const filterList = async (event) => {

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



    }

    useEffect(() => {
        if (!data)
        return
        // if (filtering){
        //     console.log("list is filtering")

        //     return
        // }else{
        //     // console.log("not filtering")
        // }


        const allMyWine = data.getWineAll;
        setMyWineList(allMyWine)
    },[data])


    async function wineModClick(event){

        if(!wineModal){
            debugger
            setWineDets(
                { 
                    _id: event.target.dataset.id,
                    name: event.target.dataset.name,
                    winery: event.target.dataset.winery,
                    vintage: event.target.dataset.vintage,
                    drinkBy: event.target.dataset.drink,
                    style: event.target.dataset.style,
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


            {/* filter field */}
            <textarea 
                type="text" className="searchField"  id="wineFilter" 
                placeholder=" " name="textarea" onChange={filterList} 
                ref={refFilter} 
            ></textarea>

            <label htmlFor="wineFilter" id="lbl_wineFilter"className="searchLabel">Filter</label>

            <div id="wineListSection" className="scroll">
                {myWineList &&
                myWineList.map((wine, i) => (
                    <div key={wine._id} onClick={wineModClick} className="wineCardWrap">
                        
                            <div className="wineCard" key={wine.id} >
                                <img src={`../../assets/images/glass${wine.style}.png`} alt={wine.style} className="wineGlass" />
                                <div className="wineDets" >
                                    <h3 className="wineTitle" data-all={wine.toJSON}>{wine.winery}</h3>
                                    <h4 className="wineName" >{wine.name}</h4>
                                    {/* <p className="wineGrape">{wine.grapes}</p> */}
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
            
                <div id="chkGrape">
                    <div id="wineDetBody">
                        <h3 id="mod_winery">{wineDets.winery}</h3>
                        <h4 id="mod_wineName">{wineDets.name}</h4>

                        <p id="mod_vintage">{wineDets.vintage}   <span id="mod_drinkBy">{wineDets.drinkBy}</span></p>


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