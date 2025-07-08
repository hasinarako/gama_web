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


function App() {

  //gama sera le paramètre qui contiendra l'objet gama
  const [gama, setGama] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [Options, setOptions] = useState( { 'API_KEY' : 'OCcRQG5w0Xh9FaCxRMMn', 'map-style': 'world', 'step':20 })
  const [Parameters, setParameters] = useState({});


  //dictionnaire des données geojson de tous les agents
  const [geojsonData, setGeojsonData] = useState({});


  return (
    
    <div>
      <BoutonConnect setGama={setGama} gama={gama}/>
      <BoutonLoad gama={gama} setIsStopped={setIsStopped}/>
      <BoutonPlay gama={gama} setIsPlaying={setIsPlaying} setIsPaused={setIsPaused}/>
      <BoutonPause gama={gama} setIsPlaying={setIsPlaying} setIsPaused={setIsPaused}/><BoutonStep gama={gama}/>
      <BoutonEval gama={gama} />
      <BoutonStop gama={gama} setIsPlaying={setIsPlaying} setIsStopped={setIsStopped}/>
      <BoutonReload gama={gama}/>
      <Map gama={gama}  geojsonData={geojsonData} setGeojsonData={setGeojsonData} isPlaying={isPlaying} isStopped={isStopped} Options={Options}/>
      <Option setOptions={setOptions} Options={Options}/>
      
    </div>

  );
}

export default App;
