import {step } from "../js/simple_syntax.js";


function BoutonStep({gama}) {
    return (
        <button onClick={() => step(gama)}>Step</button>
    )
}

export default BoutonStep; 