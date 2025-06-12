import {load } from "../js/simple_syntax.js";

function BoutonLoad({gama}) {

    return (
        <button onClick={() => load(gama)}>Load</button>
    )
}

export default BoutonLoad; 