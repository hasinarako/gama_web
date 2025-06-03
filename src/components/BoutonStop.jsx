import {stop } from "../js/simple_syntax.js";

function BoutonStop() {
    return (<button onClick={() => stop() }>Stop</button>)
}

export default BoutonStop; 