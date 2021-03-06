import React, {useState, useEffect, useRef} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ALLGRAPES } from '../../utils/queries';
import { ADD_NEWWINE } from '../../utils/mutations';

import Auth from '../../utils/auth';

const SearchVineyard = ({setRefreshWine}) => {
    let profile = Auth.getProfile();
    let profileId = profile.data._id;
    
    const requestUrl = 'https://app.gustos.life/en/api/v1';
    // STATES

    const [gifView, setGifView] = useState("none")
    const [gifOpView, setGifOpView] = useState("0")
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

    // style
    const [wineStyle, setWineStyle] = useState("");
    // cellaring
    const [approxCellar, setApproxCellar] = useState("");
    
    // grapes
    const [chkbxGrape, setChkbxGrape] = useState([
        {
            id: '',
            name: '',
            color: ''
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
    const { data } = useQuery(QUERY_ALLGRAPES);


    useEffect(() => {
        const resList = data?.getGrapeAll || ["X"];
        if (!resList)
        return
        
        setGrapeList([...resList])
    },[data])


    async function grapeModClick(){
        if(grapeModal){
            
            let gColors = "";
            let cellaring = "";
            let myGrapes = "";
            let myGrapesID = [];
            setGrpDisplay([]);
            
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
                    gColors = gColors + chkbxGrape[i].color;
                    cellaring = cellaring + chkbxGrape[i].cellar;

                    i++
                }

                const hasNow = cellaring.search("Now");
                const hasShort = cellaring.search("Short");                
                const hasMed = cellaring.search("Medium");                
                const hasLong = cellaring.search("Long");


                if(hasNow >= 0){
                    setApproxCellar("1");
                } else if(hasShort >= 0){
                    setApproxCellar("3");
                } else if(hasMed >= 0){
                    setApproxCellar("7");
                } else if(hasLong >= 0){
                    setApproxCellar("10");
                }
                const hasRed = gColors.search("Red");
                const hasWhite = gColors.search("White");
                const hasPinot = myGrapes.search("Pinot Noir");
                const hasChard = myGrapes.search("Chardonnay");
                const hasPedro = myGrapes.search("Pedro Ximenez");
                const hasAssy = myGrapes.search("Assyrtiko");
                const hasMusc = myGrapes.search("Muscat");
                const hasGlera = myGrapes.search("Glera");
                
                if(hasPinot >= 0 && hasChard >= 0){
                    // likely sparkling
                    setWineStyle("Sparkling")
                } else if(hasGlera >= 0){
                    // likely prosecco (sparkling)
                    setWineStyle("Sparkling")
                } else if( hasPedro >= 0 || hasAssy >= 0 || hasMusc >= 0){
                    // likely dessert
                    setWineStyle("Dessert")
                }else if(hasRed >= 0){
                    // likely red
                    setWineStyle("Red")
                }else if(hasWhite >= 0){
                    // likely white
                    setWineStyle("White")
                }
            }

            setGrpDisplay(myGrapes)
            setGrpDisplayId(myGrapesID)
            setGrapeModal(false);
        }else{
            
            let myGrapes = [];
            let myGrapesID = [];
            setGrpDisplay(myGrapes)
            setGrpDisplayId(myGrapesID)
            setGrapeModal(true);
        }
    }
    
    async function chk(event){
        let oldArr;
        oldArr = chkbxGrape;
        let val = {
            id:event.target.getAttribute("id"), 
            name:event.target.getAttribute("value"), 
            color:event.target.getAttribute("data-color"), 
            cellar:event.target.getAttribute("data-cellar")
        };

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
    const refQu = useRef(null);

    const [createWine, /*{ error }*/] = useMutation(ADD_NEWWINE);
    const addWine = async ( event ) => {
// debugger
        const winery = refVy.current.innerHTML; 
        const name = refWn.current.innerHTML; 
        let vintage = refVi.current.value;
        let quantity = refQu.current.value;
        let drink;

        if(grpDisplayId[0] === ""){
            setGrpDisplayId(grpDisplayId.shift());
        }

        if(!quantity){
            quantity = 1;
        }

        const grapes = grpDisplayId;
        const style = wineStyle;
        const today = new Date();
        const year = today.getFullYear();

        if(!winery || !name || !grapes){
            alert("Please add all details");
            return
        }else if(!vintage){
            vintage = "NV";
            const year2 = Number(year);
            drink = year2 + 1;
        }else if(vintage){
            const vInt = parseInt(vintage);
            if(!vInt){
                alert('Please enter a valid vintage, or leave blank for Non Vintage wines')
                return
            }

            if(vintage.length === 2){
                const convert = String(year).slice(-2);
                const convert2 = String(year).slice(0,2);
                
                if(vInt > convert){
                    vintage = (convert2 - 1) + vintage;
                }else{
                    vintage = convert2 + vintage;
                }
                drink = parseInt(vintage) + parseInt(approxCellar);

            } else if(vintage.length === 4){
                const year2 = Number(year);

                if(vInt > year2){
                    alert('Vintage cannot be in the future');
                    return
                }
                drink = parseInt(vintage) + parseInt(approxCellar);
            }

        }                                                               

        try{
            await createWine({
                variables: { 
                    profileId: profileId, 
                    winery: winery, 
                    name: name, 
                    vintage: vintage, 
                    grapes: grapes, 
                    style: style, 
                    notes: grpDisplay,
                    drinkBy: drink.toString(), 
                    quantity: quantity},
            });

            clearAll();
            // success gif
            setGifView("block")
            setTimeout(function(){
                setGifOpView("1")
                setTimeout(() => {
                    setGifOpView("0")
                    setTimeout(() => {
                        setGifView("none")
                    },500)
                }, 1700);
            },100)

        } catch (error) {
            console.error(error);
        }

    }
    function clearAll(){
            // clear fields
            setVySearch("")
            setVyWineSearch("")
            setGrpDisplay("")
            setWineStyle("")
            refVi.current.value = "";
            
            // clear states
            setSelectedVy("");
            setVineyards([]);
            setVineyards([]);
            setSelectedVy("");
            setSelectedVyWine("");
            setWines([]);
            setApproxCellar("");
            setChkbxGrape([
                {
                    id: '',
                    name: '',
                    color: ''
                }
            ]);
            setGrpDisplay([]);
            setGrpDisplayId([]);

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


                {/* vintage */}
                <input 
                    type="number" className="searchField"  id="vintageSearch" 
                    placeholder=" " name="textarea" ref={refVi} >

                </input>

                <label htmlFor="vintageSearch" className="searchLabel">Vintage</label>
                <p id="leaveBlank">Leave blank for Non-Vintage wines</p>

                {/* grape */}
                <textarea 
                    type="text" className="searchField"  id="grapeSearchShow"  ref={refGr}
                    placeholder=" " name="textarea" disabled={true} value={grpDisplay} data-idlist={grpDisplayId}><div></div></textarea>

                <label htmlFor="grapeSearchShow" className="searchLabel">Grape</label>


                {/* add grapes button */}
                <button className="grpModal" id="btn_addGrp" onClick={grapeModClick}></button>


                {/* wine style */}
                <select 
                    className="searchField"  id="wineStyleShow" onChange={(event) => {setWineStyle(event.target.value)}}
                    placeholder=" " name="styleSelect" value={wineStyle} required>
                    <option value=""></option>
                    <option value="Red">Red</option>
                    <option value="White" >White</option>
                    <option value="Rose">Rose</option>
                    <option value="Sparkling">Sparkling</option>
                    <option value="Dessert">Dessert</option>
                </select>

                <label htmlFor="grapeSearchShow" className="searchLabel">Style</label>


                {/* quantity */}
                <input 
                    type="number" className="searchField"  id="quantitySearch" 
                    placeholder=" " name="textarea" ref={refQu} >

                </input>

                <label htmlFor="quantitySearch" className="searchLabel">Quantity</label>
            </div>


            {/* modal */}
            { grapeModal ? (
            <>
                <div id="chkGrape">
                    <div id="grapeChkBody">
                    {grapeList &&
                    grapeList.map((option, i) => (
                        <span className="checkSpan" key={option._id} >
                            <input type="checkbox" className="checkMark" id={option._id} value={option.grapename} 
                            key={option._id} onChange={chk} data-color={option.color} data-cellar={option.cellar}/>
                            <label htmlFor={option._id} className="checkLabel">{option.grapename}</label>
                        </span>
                    ))}
                        <div className="closeModalWrap">
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


            {/* add wine button */}
            <button className="grpModal" id="addWine" onClick={addWine} >Add Wine</button>
            
            {/* success gif */}
            <div id="success" style={{
                backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/images/pop2.gif?a='+Math.random()+'?raw=true'})`,
                display:gifView,
                opacity:gifOpView
            }}>
            </div>
        </div> 
    )
};

export default SearchVineyard;
