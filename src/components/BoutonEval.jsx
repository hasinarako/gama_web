import {evaluation } from "../js/simple_syntax.js";

function BoutonEval({gama}) {

    return (<button onClick={() => evaluation(gama) }>Evaluation</button>)
}

export default BoutonEval; 