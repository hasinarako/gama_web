import React, { useState } from 'react';

function Options({ setOptions, Options }) {

    // états de la composante
    const [apiKey, setApiKey] = useState(Options['API_KEY']);
    const [mapStyle, setMapStyle] = useState(Options['map-style']);
    const [step, setStep] = useState(Options['step']);

    //mise à jour des états de la composante parente après validation
    const handleSave = () => {
        setOptions({
            'API_KEY': apiKey,
            'map-style': mapStyle,
            'step' : step
            });
    };

    //si annulation, les états locaux reprennent les valeurs des états de la composante parente    
    const handleCancel = () => {
        setApiKey(Options['API_KEY']); 
        setMapStyle(Options['map-style']); 
        setStep(Options['step']);
    };

    return (
        <div>
                <h3>API Key</h3>
                <input
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter API key"
                />

                <h3>Map Style</h3>
                <div>
                    <input
                        type="radio"
                        id="world"
                        checked={mapStyle === 'world'}
                        onChange={() => setMapStyle('world')}
                    />
                    <label htmlFor="world">World Map</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="blanc"
                        checked={mapStyle === 'blanc'}
                        onChange={() => setMapStyle('blanc')}
                    />
                    <label htmlFor="blanc">White Background</label>
                </div>

                <h3>Simulation Step</h3>
                <input 
                    type="text"
                    value={step}
                    onChange={(e) => setStep(e.target.value)}
                    placeholder="Enter number of steps"
                />


            <br></br>
                <button type="button" onClick={handleSave}>Save</button>           
                <button type="button" onClick={handleCancel}>Cancel</button>
    
            
        </div>
    );
}

export default Options;