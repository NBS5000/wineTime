import React, {useState, useEffect} from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALLGRAPES } from '../../utils/queries';

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VineyardList from './vineyardList';


const SearchVineyard = (props) => {
    
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
            if(chkbxGrape){
                const len = chkbxGrape.length;
                let i = 0;
                while(i<len){
                    if(i !==0){
                        let end = "";
                        if((i+1)!==len){end =", "}
                        myGrapes = myGrapes + chkbxGrape[i].name + end
                    }
                    i++
                }
            }
            setGrpDisplay(myGrapes)
            grapeModClickState = false;
            setGrapeModal(false);
        }else{
            let myGrapes = "";
            setGrpDisplay(myGrapes)
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




    /*********** Vineyards *****/
    const list = (event) => {
        const input = String(event.target.value);
        // console.log(input)
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

        console.log(clickId);
        setVySearch(clickName);
        setSelectedVy(clickId);
        setVyListDisplay("none");
    }
    /************************* */

    /************ wines *****/
    const vyWinelist = (event) => {
        if(selectedVy){
            const input = String(event.target.value);
            // console.log(input)
            setVyWineSearch(input)
            const len = String(input).length
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
        }
    }
    const clickVyWine = (event) => {
        const clickId = event.target.dataset.id;
        const clickName = event.target.innerText;

        console.log(clickId);
        setVyWineSearch(clickName);
        setSelectedVyWine(clickId);
        setVyWineDisplay("none");
    }
    /************************* */




    return (
        <div id="searchWine">
            <div id="searchInputArea">
                {/* winery */}
                <textarea 
                    type="text" className="searchField"  id="winerySearch" 
                    placeholder=" " name="textarea" 
                    value={vySearch} onChange={list} data-apiId={selectedVy}></textarea>

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
                    placeholder=" " name="textarea" 
                    value={vyWineSearch} onChange={vyWinelist} data-apiId={selectedVyWine}></textarea>
                
                <label htmlFor="bottleSearch" className="searchLabel">Wine Name</label>

                <ul id="vy_wineList" style={{display:vyWineDisplay}}>
                    {wines &&
                    wines.map((wine) => (
                        <li key={wine.id} className="li_vineyard">
                            <div data-id={wine.id}  className="li_vyName" onClick={clickVyWine}>{wine.name}</div>
                        </li>
                    ))}
                </ul>





                <textarea 
                    type="text" className="searchField"  id="vintageSearch" 
                    placeholder=" " name="textarea" >

                </textarea>

                <label htmlFor="vintageSearch" className="searchLabel">Vintage</label>
                
                
            </div>
                    <textarea 
                        type="text" className="searchField"  id="grapeSearchShow" 
                        placeholder=" " name="textarea" disabled={true} value={grpDisplay}><div></div></textarea>

                    <label htmlFor="grapeSearchShow" className="searchLabel">Grape</label>



            <button className="grpModal" onClick={grapeModClick}>Add grape</button>
            { grapeModal ? (
            <>
            
                <div id="chkGrape">
                    <div id="grapeChkBody">
                    {grapeList &&
                    grapeList.map((option, i) => (
                        <span >
                            <input type="checkbox" className="checkMark" id={option._id} value={option.grapename} key={option._id} onChange={chk}/>
                            <label htmlFor={option._id}>{option.grapename}</label>&nbsp;&nbsp;&nbsp;&nbsp;
                            {(i+1)%4 ===0 ? (
                                <br/>
                            ) : (
                                <span></span>
                            )}
                        </span>
                    ))}
                <br/>
                <button className="grpModal"onClick={grapeModClick}>Close</button>
                    </div></div>
            </>
            ) : (
            <>
                <div></div>
            </>
            )}



            <button className="grpModal" id="addWine">Add Wine</button>
            


        </div> 
    )
};

export default SearchVineyard;
