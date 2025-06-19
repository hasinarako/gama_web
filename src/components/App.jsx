import React, {useState} from "react";
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

  //booléen qui dit si la simulation tourne
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  //dictionnaire des données geojson de tous les agents
  const [geojsonData, setGeojsonData] = useState({});


  return (
    
    <div>
      <BoutonConnect setGama={setGama} gama={gama}/>
      <BoutonLoad gama={gama} setIsLoaded={setIsLoaded}/>
      <BoutonPlay gama={gama} setIsPlaying={setIsPlaying}/>
      <BoutonPause gama={gama}/><BoutonStep gama={gama}/>
      <BoutonEval gama={gama} setGeojsonData={setGeojsonData} geojsonData={geojsonData} />
      <BoutonStop gama={gama} setIsPlaying={setIsPlaying}/>
      <BoutonReload gama={gama}/>
      <Map gama={gama}  geojsonData={geojsonData} setGeojsonData={setGeojsonData}/>
    </div>

  );
}

export default App;
