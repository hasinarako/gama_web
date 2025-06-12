import React, {useState} from "react";
import BoutonConnect from "./BoutonConnect";
import BoutonLoad from "./BoutonLoad";
import BoutonPlay from "./BoutonPlay";
import BoutonReload from "./BoutonReload";
import BoutonStep from "./BoutonStep";
import BoutonEval  from "./BoutonEval";
import BoutonPause from "./BoutonPause";
import BoutonStop from "./BoutonStop";
//import Map from "./GeoMap";


function App() {

  //gama sera le paramètre qui contiendra l'objet gama
  const [gama, setGama] = useState(null);


  return (
    
    <div>
      <BoutonConnect setGama={setGama} gama={gama}/><BoutonLoad gama={gama}/><BoutonPlay gama={gama}/><BoutonPause gama={gama}/><BoutonStep gama={gama}/><BoutonEval gama={gama}/><BoutonStop gama={gama}/><BoutonReload gama={gama}/>
      {/* <Map gama={gama}/> */}
    </div>

  );
}

export default App;
