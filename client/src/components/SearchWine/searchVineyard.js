import React, {useState} from 'react';


const SearchVineyard = (props) => {
    
    const [value, setValue] = useState(props.name);

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
                    let i = 0;
                    while(i < len) {

                        <li></li>

                        i = i++;
                    }
                }
                console.log(data);
                
            })
        }
    }

    list(value)
    return (
        <div id="searchWine">
            <textarea 
                type="text" className="searchField"  id="winerySearch" 
                placeholder=" " name="textarea" 
                value={value}  onChange={(event) => {setValue(event.target.value);}} ></textarea>

            <label htmlFor="winerySearch" className="searchLabel">Winery</label>
            <div id="wineryOptions">
                <ul id="wineryList">

                </ul>
            </div>
        </div> 
    );
}
    
export default SearchVineyard;
