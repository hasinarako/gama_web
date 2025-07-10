import React, {use, useEffect} from 'react';
import {evaluation } from "../js/simple_syntax.js";
import './../style/Parameters.css';



function Parameters({gama,settings, setSettings, isStopped}){

    useEffect(() => {
        console.log(isStopped);
        if (isStopped){
            setSettings({});
        };

    },[isStopped]);


    const handleClick = () => {
        const dico = evaluation(gama);
        setSettings(dico);  
    }

    // function log(){

    //     const element = document.getElementById('parameter');
    //     console.log(settings);

    //     for (let key in settings){
    //         element.innerHTML += key;
    //         element.innerHTML += "       ";
    //         element.innerHTML += JSON.parse(settings[key]['value']);
	//         element.innerHTML +=("</br></br>");
    //     };

    // };


    
    return(

        <div className="settings">
            <button onClick={handleClick}>Model Settings</button>
            <div id='parameter'>

                {Object.keys(settings).map((key) => (
                    <div key={key}>
                        <span>{key}</span>
                        <input type="number" defaultValue={JSON.parse(settings[key].value)}
                        />
                        <br /><br />
                    </div>
                ))}
            </div>
        </div>
        
    )
};

export default Parameters;