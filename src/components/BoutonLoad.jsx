import {load } from "../js/simple_syntax.js";

function BoutonLoad({gama, setIsStopped}) {

    const handleClick = () => {
            setIsStopped(false);
            load(gama);
     
        }


    return (
        <button onClick={handleClick}>Load</button>
    )
}

export default BoutonLoad; 