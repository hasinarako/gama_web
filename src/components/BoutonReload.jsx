import {reload } from "../js/simple_syntax.js";


function BoutonReload({gama}) {
    return (
        <button onClick={() => reload(gama)}>Reload</button>
    )
}

export default BoutonReload; 