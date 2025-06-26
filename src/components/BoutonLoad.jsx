import {load } from "../js/simple_syntax.js";

function BoutonLoad({gama}) {

    const handleClick = () => {
            load(gama);
     
        }


    return (
        <button onClick={handleClick}>Load</button>
    )
}

export default BoutonLoad; 