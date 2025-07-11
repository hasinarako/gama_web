import {evaluation } from "../js/simple_syntax.js";
import React, {useState, useRef, useEffect} from 'react';
import * as d3 from "d3";



function DataDisplay({gama}){

    const [dataset, setDataset] = useState([]);
    const ref = useRef();
    let width = 300;
    let height = 300;

    useEffect(()=>{
        if (dataset.length === 0) return;


        const svg = d3.select(ref.current);
        svg.selectAll("*").remove(); // clear before redraw

        const radius = Math.min(width, height) / 2;
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        const pie = d3.pie().value(d => d.value);
        const data_ready = pie(dataset);

        const arc = d3.arc()
        .innerRadius(0) // full pie, not a donut
        .outerRadius(radius);

        const g = svg
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

        g.selectAll("path")
        .data(data_ready)
        .join("path")
        .attr("d", arc)
        .attr("fill", (d, i) => color(i))
        .attr("stroke", "black")
        .style("stroke-width", "2px");

    }, [dataset]);

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
        <svg ref={ref} width={width} height={height}></svg>
    </div>
    ) 
};

export default DataDisplay;