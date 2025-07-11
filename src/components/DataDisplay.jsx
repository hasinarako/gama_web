import {evaluation } from "../js/simple_syntax.js";
import React, {useState} from 'react';



function DataDisplay({gama}){

    const [dataset, setDataset] = useState([]);

    function handleClick(){
        setDataset(evaluation(gama));
    }

    return(
    <div>
        <button onClick={handleClick}>
            PieChart
        </button>
    </div>
    ) 
};

export default DataDisplay;