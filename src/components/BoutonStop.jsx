import {stop } from "../js/simple_syntax.js";

function BoutonStop({gama, setIsPlaying}) {

    const handleClick = () => {
            setIsPlaying(false);
            stop(gama);
        }

    return (<button onClick={handleClick}>Stop</button>)
}

export default BoutonStop; 