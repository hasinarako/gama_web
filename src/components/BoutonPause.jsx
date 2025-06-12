import {pause } from "../js/simple_syntax.js";

function BoutonPause({gama}) {
    return (<button onClick={() => pause(gama) }>Pause</button>)
}

export default BoutonPause; 