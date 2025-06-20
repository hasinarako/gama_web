import {load } from "../js/simple_syntax.js";

function BoutonLoad({gama, setIsLoaded}) {

    const handleClick = () => {
            load(gama);
            setIsLoaded(true);
        }


    return (
        <button onClick={handleClick}>Load</button>
    )
}

export default BoutonLoad; 