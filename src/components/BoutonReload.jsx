import {reload } from "../js/simple_syntax.js";


function BoutonReload() {
    return (
        <button onClick={() => reload()}>Reload</button>
    )
}

export default BoutonReload; 