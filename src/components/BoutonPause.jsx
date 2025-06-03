import {pause } from "../js/simple_syntax.js";

function BoutonPause() {
    return (<button onClick={() => pause() }>Pause</button>)
}

export default BoutonPause; 