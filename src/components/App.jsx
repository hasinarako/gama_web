import React, {useState} from "react";
import Option from "./Option";
import BoutonConnect from "./BoutonConnect";
import BoutonLoad from "./BoutonLoad";
import BoutonPlay from "./BoutonPlay";
import BoutonReload from "./BoutonReload";
import BoutonStep from "./BoutonStep";
import BoutonEval  from "./BoutonEval";
import BoutonPause from "./BoutonPause";
import BoutonStop from "./BoutonStop";
import Map from "./GeoMap";
import Parameters  from "./Parameters";
import DataDisplay from "./DataDisplay";


function App() {

  //gama sera le paramètre qui contiendra l'objet gama
  const [gama, setGama] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [Options, setOptions] = useState( { 'API_KEY' : 'OCcRQG5w0Xh9FaCxRMMn', 'map-style': 'world', 'step':20 })
  const [settings, setSettings] = useState({});



  //dictionnaire des données geojson de tous les agents
  const [geojsonData, setGeojsonData] = useState({});


  return (
    
    <div>
      
     
    {/* Groupe de boutons connect/load aligné à gauche */}
    <div style={{ display: "flex", justifyContent: "space-between", margin: "40px"}}>
      
      {/* Boutons à gauche */}
      <div>
        <BoutonConnect setGama={setGama} gama={gama} />
        <BoutonLoad gama={gama} setIsStopped={setIsStopped} />
      </div>

      {/* Boutons à droite */}
      <div>
        <BoutonPlay gama={gama} setIsPlaying={setIsPlaying} setIsPaused={setIsPaused} />
        <BoutonPause gama={gama} setIsPlaying={setIsPlaying} setIsPaused={setIsPaused} />
        <BoutonStep gama={gama} />
        <BoutonEval gama={gama} />
        <BoutonStop gama={gama} setIsPlaying={setIsPlaying} setIsStopped={setIsStopped} />
        <BoutonReload gama={gama} />
      </div>

      </div>

      <div style={{ display: "flex", margin:"30px"}}>


        <Map gama={gama}  geojsonData={geojsonData} setGeojsonData={setGeojsonData} isPlaying={isPlaying} isStopped={isStopped} Options={Options}/>
        <div><Parameters gama={gama} settings={settings} setSettings={setSettings} isStopped={isStopped}/><DataDisplay gama={gama}/></div>
        <Option setOptions={setOptions} Options={Options}/>
        

      </div>
      
      
      
      
    </div>

  );
}

export default App;
