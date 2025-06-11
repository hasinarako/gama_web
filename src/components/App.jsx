import BoutonConnect from "./BoutonConnect";
// import BoutonConnectBis from "./BoutonConnectBis";
// import BoutonDisconnect from "./BoutonDisconnect";
import BoutonLoad from "./BoutonLoad";
import BoutonPlay from "./BoutonPlay";
import BoutonReload from "./BoutonReload";
import BoutonStep from "./BoutonStep";
import BoutonEval  from "./BoutonEval";
import BoutonPause from "./BoutonPause";
import BoutonStop from "./BoutonStop";
//import Map from "./GeoMap";


function App() {

  return (
    
    <div>
      <BoutonConnect /><BoutonLoad /><BoutonPlay /><BoutonPause /><BoutonStep /><BoutonEval /><BoutonStop /><BoutonReload />
      {/* <Map /> */}
    </div>

    // <div>
    //   <BoutonConnectBis /><BoutonDisconnect />
    // </div>

  );
}

export default App;
