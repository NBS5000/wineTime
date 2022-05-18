import React, {useState, useEffect} from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ALLGRAPES } from '../../utils/queries';

const SearchVineyard = (props) => {





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
        console.log(resList)
        if (!resList)
        return
        console.log(resList)
        setGrapeList([...resList])
    },[data])

    console.log(grapeList)

    
    return (
        <div id="searchWine">
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


            
            <select  
                id="grapeSearch"
                className="searchField" 
                placeholder=" ">
                    <option> </option>
                {grapeList &&
                    grapeList.map((option) => (
                    <option key={option._id} >{option.grapename}
                    

                    
                    
                    
                    </option>
                ))}
            </select>
            <label htmlFor="grapeSearch" className="searchLabel">Select Grape</label>




        </div> 
    )
};

export default SearchVineyard;
