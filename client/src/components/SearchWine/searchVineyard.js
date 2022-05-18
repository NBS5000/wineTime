import React, {useState, useEffect} from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALLGRAPES } from '../../utils/queries';


let chosenGrapes;
const SearchVineyard = (props) => {

    const [chkbxGrape, setChkbxGrape] = useState([
        // {
        //     id: '',
        //     name: ''
        // }
    ]);


    const [value, setValue] = useState(props.name);
    // const [vineyards, setVineyards] = useState({ 
    //     name: '', 
    //     id: ''
    // });
    const [grapeList, setGrapeList] = useState([
        { 
            name: '',
            _id: ''
        }
    ]);

    const { loading, data } = useQuery(QUERY_ALLGRAPES);


    useEffect(() => {

        const resList = data?.getGrapeAll || ["X"];

        if (!resList)
        return
        
        setGrapeList([...resList])
    },[data])

    // let chosenGrapes;
    useEffect(() => {
        console.log("test")
        chosenGrapes = 
        <span>
        {/* { chkbxGrape &&
            chkbxGrape.map((chkbx) => (
                <span key={chkbx.id}>{chkbx.name}</span>
        ))} */}
    </span>

    },[chkbxGrape])


    
    async function chk(event){
        let oldArr, newArr;
        oldArr = chkbxGrape;
        console.log(chkbxGrape);
        
        const val = [{id:event.target.getAttribute("id"), name:event.target.getAttribute("value")}];

        if(event.target.checked===true){
            oldArr.push(...val);
            setChkbxGrape(oldArr);

        }else{


            newArr = oldArr.filter(await function (grp) { 
                return grp.id !== val.id && grp.id;
            })
            // console.log(newArr);
            setChkbxGrape(...newArr);
        }

        console.log(chkbxGrape);
    }


    
    return (
        <div id="searchWine">
            <div id="searchInputArea">
                <textarea 
                    type="text" className="searchField"  id="winerySearch" 
                    placeholder=" " name="textarea" 
                    value={value}/*  onChange={(event) => {setValue(event.target.value);}} */></textarea>

                <label htmlFor="winerySearch" className="searchLabel">Winery</label>

                <textarea 
                    type="text" className="searchField"  id="bottleSearch" 
                    placeholder=" " name="textarea" 
                    value={value}  /*onChange={(event) => {setValue(event.target.value);}}*/ ></textarea>

                <label htmlFor="bottleSearch" className="searchLabel">Wine Name</label>

                <textarea 
                    type="text" className="searchField"  id="vintageSearch" 
                    placeholder=" " name="textarea" 
                    value={value}  /*onChange={(event) => {setValue(event.target.value);}}*/ ></textarea>

                <label htmlFor="vintageSearch" className="searchLabel">Vintage</label>
                
                <textarea 
                    type="text" className="searchField"  id="grapeSearchShow" 
                    placeholder=" " name="textarea" disabled={true} value="">

                        {chosenGrapes}
                    </textarea>

                <label htmlFor="grapeSearchShow" className="searchLabel">Grape</label>
            </div>




            <div id="chkGrape">
                {grapeList &&
                    grapeList.map((option, i) => (
                        <span >
                            <input type="checkbox" id={option._id} value={option.grapename} key={option._id} onChange={chk}/>
                            <label htmlFor={option._id}>{option.grapename}</label>&nbsp;&nbsp;&nbsp;&nbsp;
                            {(i+1)%3 ===0 ? (
                                <br/>
                                ) : (
                                    <span></span>
                                )}
                        </span>
                    ))}
            </div>
        </div> 
    )
};

export default SearchVineyard;
