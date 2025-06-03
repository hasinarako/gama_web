import BoutonConnect from "./BoutonConnect";
import BoutonLoad from "./BoutonLoad";
import BoutonPlay from "./BoutonPlay";
import BoutonReload from "./BoutonReload";
import BoutonStep from "./BoutonStep";
//import BoutonEval  from "./BoutonEval";
import BoutonPause from "./BoutonPause";
import BoutonStop from "./BoutonStop";
import Simulation from "./GeoMap";


function App() {
  return (
    <div>
      <BoutonConnect /><BoutonLoad /><BoutonPlay /><BoutonPause /><BoutonStep /><BoutonStop /><BoutonReload />
      <Simulation />
    </div>
  );
}

export default App;
