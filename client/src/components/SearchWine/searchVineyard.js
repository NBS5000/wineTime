import React, {useState, useEffect} from 'react';
import VineyardList from './vineyardList';


const SearchVineyard = (props) => {
    // debugger
    const [value, setValue] = useState(props.name);
    const [vineyards, setVineyards] = useState();

    const list = (val) => {
        const input = String(val);
        const len = String(input).length
        if(len > 2){
            const requestUrl = 'https://app.gustos.life/en/api/v1';
            const url = requestUrl + "/vineyard/list?name=" + input;
            fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                if(data.length > 0){
                    console.log(data)
                    setVineyards(data)
                }
                console.log(data)
            });
            console.log(val)
        }
    }

    // list(value)
    useEffect(() => {list(value); console.log(value)},[value])
    return (
        <div id="searchWine">
            <textarea 
                type="text" className="searchField"  id="winerySearch" 
                placeholder=" " name="textarea" 
                value={value}  onChange={(event) => {setValue(event.target.value);}} ></textarea>

            <label htmlFor="winerySearch" className="searchLabel">Winery</label>
            <div id="wineryOptions">
                <ul id="wineryList">
                    <VineyardList
                        vineyards={vineyards}
                    />
                </ul>
            </div>

        </div> 
    )
};

export default SearchVineyard;
