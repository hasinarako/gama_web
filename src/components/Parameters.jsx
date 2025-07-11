import React, {use, useEffect} from 'react';
import {loadsettings } from "../js/simple_syntax.js";
import './../style/Parameters.css';



function Parameters({gama,settings, setSettings, isStopped}){

    useEffect(() => {
        if (isStopped){
            setSettings({});
        };

    },[isStopped]);


    const handleClick = () => {
        const dico = loadsettings(gama);
        setSettings(dico);  
    }

    
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