import {stop } from "../js/simple_syntax.js";

function BoutonStop({gama}) {
    return (<button onClick={() => stop(gama) }>Stop</button>)
}

export default BoutonStop; 