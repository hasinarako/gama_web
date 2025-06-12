import {play } from "../js/simple_syntax.js";


function BoutonPlay({gama}) {
    return (
        <button onClick={() => play(gama)}>Play</button>
    )
}

export default BoutonPlay; 