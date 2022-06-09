import React, {useState, useEffect, useRef} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALLGRAPES } from '../../utils/queries';
import { ADD_NEWWINE } from '../../utils/mutations';

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useParams} from 'react-router-dom';
import VineyardList from './vineyardList';

import Auth from '../../utils/auth';

const SearchVineyard = (props) => {
    let profile = Auth.getProfile();
    let profileId = profile.data._id;
    
    const requestUrl = 'https://app.gustos.life/en/api/v1';
    // STATES

    const [value, setValue] = useState(props.name);
    // vineyards
    const [vySearch, setVySearch] = useState("");
    const [vineyards, setVineyards] = useState([]);
    const [selectedVy, setSelectedVy] = useState("");
    const [vyListDisplay, setVyListDisplay] = useState("none");

    // wines
    const [vyWineDisplay, setVyWineDisplay] = useState("none");
    const [selectedVyWine, setSelectedVyWine] = useState("");
    const [vyWineSearch, setVyWineSearch] = useState("");
    const [wines, setWines] = useState([]);


    
    // grapes
    const [chkbxGrape, setChkbxGrape] = useState([
        {
            id: '',
            name: ''
        }
    ]);
    const [grapeModal, setGrapeModal] = useState(false)


    const [grapeList, setGrapeList] = useState([
        { 
            name: '',
            _id: ''
        }
    ]);
    const [grpDisplay, setGrpDisplay] = useState([]);
    const [grpDisplayId, setGrpDisplayId] = useState([]);
    const { loading, data } = useQuery(QUERY_ALLGRAPES);


    useEffect(() => {
        const resList = data?.getGrapeAll || ["X"];
        if (!resList)
        return
        
        setGrapeList([...resList])
    },[data])


    let grapeModClickState = true;
    function grapeModClick(){
        if(grapeModal){
            let myGrapes = "";
            let myGrapesID = [];
            if(chkbxGrape){
                const len = chkbxGrape.length;
                let i = 0;
                while(i<len){
                    if(i !==0){
                        let end = "";
                        if((i+1)!==len){end =", "}
                        myGrapes = myGrapes + chkbxGrape[i].name + end
                    }
                    myGrapesID.push(chkbxGrape[i].id)
                    i++
                }
            }
            console.log(myGrapesID)
            setGrpDisplay(myGrapes)
            setGrpDisplayId(myGrapesID)
            grapeModClickState = false;
            setGrapeModal(false);
        }else{
            let myGrapes = "";
            let myGrapesID = [];
            setGrpDisplay(myGrapes)
            setGrpDisplayId(myGrapesID)
            grapeModClickState = true;
            setGrapeModal(true);
        }
    }

    let chosenGrapes;
    useEffect(() =>  {
        if(chkbxGrape.length>1){
            chosenGrapes = `<span>{ chkbxGrape && chkbxGrape.map((chkbx) => (<span key={chkbx.id}>{chkbx.name}</span>))}</span>`
        }
    },[chkbxGrape])
    
    async function chk(event){
        let oldArr;
        oldArr = chkbxGrape;
        let val = {id:event.target.getAttribute("id"), name:event.target.getAttribute("value")};

        if(event.target.checked===true){
            oldArr.push(val);
            setChkbxGrape(oldArr);
        }else if(event.target.checked===false){
            let i = 0;
            let len = oldArr.length;
            let newArr=[];
            while(i < len){
                if(val.id!==oldArr[i].id){
                    newArr.push(oldArr[i]);
                }
                i++
            }
            setChkbxGrape(newArr);
        }
    }
    /********* close type ahead menus **********/
    const target = document.querySelector('.typeAheadList')

    document.addEventListener('click', (event) => {
        const withinBoundaries = event.composedPath().includes(target)
        
        if (!withinBoundaries) {
            setVyListDisplay("none")
            setVyWineDisplay("none")
        } 
    })


    /*********** Vineyards *****/
    const list = (event) => {
        const input = String(event.target.value);
        setVySearch(input)
        const len = String(input).length
        if(len > 2){
            const url = requestUrl + "/vineyard/list?limit=15&name=" + input;
            fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if(data.items.length > 0){
                    setVyListDisplay("block")
                    setVineyards(data.items)
                }
            })
            .catch(
                setVyListDisplay("none")
            );
        }
    }

    const clickVy = (event) => {
        const clickId = event.target.dataset.id;
        const clickName = event.target.innerText;

        setVySearch(clickName);
        setSelectedVy(clickId);
        setVyListDisplay("none");
    }
    /************************/

    /************ wines *****/
    const vyWinelist = (event) => {
        const input = String(event.target.value);
        const len = String(input).length
        if(selectedVy){
            setVyWineSearch(input)
            if(len > 2){
                const url = requestUrl + "/vineyard/" + selectedVy + "/wine/list?name=" + input;
                fetch(url)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    if(data.items.length > 0){
                        setVyWineDisplay("block")
                        setWines(data.items)
                    }
                })
                .catch(
                    setVyWineDisplay("none")
                );
            }
        } else if (!selectedVy && vySearch){
            setVyWineSearch(input)
        }
    }
    const clickVyWine = (event) => {
        const clickId = event.target.dataset.id;
        const clickName = event.target.innerText;

        setVyWineSearch(clickName);
        setSelectedVyWine(clickId);
        setVyWineDisplay("none");
    }
    /************************* */

    /********** add wine *******/
    const refVy = useRef(null);
    const refWn = useRef(null);
    const refVi = useRef(null);
    const refGr = useRef(null);

    const [createWine, { error }] = useMutation(ADD_NEWWINE);
    const addWine = async ( event ) => {
        // debugger
        const winery = refVy.current.innerHTML; 
        const name = refWn.current.innerHTML; 
        let vintage = refVi.current.value;
        const grapes = grpDisplayId;

        if(!winery || !name || !grapes){
            alert("Please add all details");
            return
        }else if(!vintage){
            vintage = "NV";
        }

        console.log(profileId + ", " + winery + ", " + name + ", " + vintage + ", " + grapes)
        try{
            await createWine({
                variables: { profileId: profileId, winery: winery, name: name, vintage: vintage, grapes:  grapes  },
            });
        } catch (error) {
            console.error(error);
        }
    }




    return (
        <div id="searchWine">
            <div id="searchInputArea">
                {/* winery */}
                <textarea 
                    type="text" className="searchField"  id="winerySearch" 
                    placeholder=" " name="textarea" ref={refVy}
                    value={vySearch} onChange={list} data-apiid={selectedVy}></textarea>

                <label htmlFor="winerySearch" className="searchLabel">Winery</label>

                <ul id="vineList" style={{display:vyListDisplay}}>
                    {vineyards &&
                    vineyards.map((vineyard) => (
                        <li key={vineyard.id} className="li_vineyard">
                            <div data-id={vineyard.id}  className="li_vyName" onClick={clickVy}>{vineyard.name}</div>
                        </li>
                    ))}
                </ul>




                {/* wines */}
                <textarea 
                    type="text" className="searchField"  id="bottleSearch" 
                    placeholder=" " name="textarea" ref={refWn}
                    value={vyWineSearch} onChange={vyWinelist} data-apiid={selectedVyWine}></textarea>
                
                <label htmlFor="bottleSearch" className="searchLabel">Wine Name</label>

                <ul id="vy_wineList" style={{display:vyWineDisplay}} className="typeAheadList">
                    {wines &&
                    wines.map((wine) => (
                        <li key={wine.id} className="li_vineyard">
                            <div data-id={wine.id}  className="li_vyName" onClick={clickVyWine}>{wine.name}</div>
                        </li>
                    ))}
                </ul>





                <textarea 
                    type="text" className="searchField"  id="vintageSearch" 
                    placeholder=" " name="textarea" ref={refVi} >

                </textarea>

                <label htmlFor="vintageSearch" className="searchLabel">Vintage</label>
                
                
            </div>
                    <textarea 
                        type="text" className="searchField"  id="grapeSearchShow"  ref={refGr}
                        placeholder=" " name="textarea" disabled={true} value={grpDisplay} data-idlist={grpDisplayId}><div></div></textarea>

                    <label htmlFor="grapeSearchShow" className="searchLabel">Grape</label>



            <button className="grpModal" onClick={grapeModClick}>Add grape</button>
            { grapeModal ? (
            <>
            
                <div id="chkGrape">
                    <div id="grapeChkBody">
                    {grapeList &&
                    grapeList.map((option, i) => (
                        <span className="checkSpan" key={option._id} >
                            <input type="checkbox" className="checkMark" id={option._id} value={option.grapename} key={option._id} onChange={chk}/>
                            <label htmlFor={option._id} className="checkLabel">{option.grapename}</label>
                        </span>
                    ))}
                    <div id="closeGrpWrap">
                        <button className="grpModal"onClick={grapeModClick} id="closeGrpModal">Close</button>
                    </div>
                    </div>
                </div>
            </>
            ) : (
            <>
                <div></div>
            </>
            )}



            <button className="grpModal" id="addWine" onClick={addWine} >Add Wine</button>
            


        </div> 
    )
};

export default SearchVineyard;
