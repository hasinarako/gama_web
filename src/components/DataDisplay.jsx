import {evaluation } from "../js/simple_syntax.js";
import React, {useState} from 'react';
import Pie from "./PieChart.jsx";


function DataDisplay({gama}){

    const [dataset, setDataset] = useState([]);
    

    function handleClick(){
        const data = evaluation(gama);
        setDataset(data);
        console.log(data);
    }

    return(
    <div>
        <button onClick={handleClick}>
            PieChart
        </button>
        <br></br>
        <Pie 
            data={dataset}
            width={200}
            height={200}
            innerRadius={0}
            outerRadius={100}
        />
    </div>
    ) 
};

export default DataDisplay;