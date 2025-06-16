import {load } from "../js/simple_syntax.js";

function BoutonLoad({gama, setIsLoaded}) {

    const handleClick = () => {
            setIsLoaded(true);
            load(gama);
        }


    return (
        <button onClick={handleClick}>Load</button>
    )
}

export default BoutonLoad; 