import {stop } from "../js/simple_syntax.js";

function BoutonStop({gama, setIsPlaying, setIsStopped}) {

    const handleClick = () => {
            setIsPlaying(false);
            setIsStopped(true);
            stop(gama);
        }

    return (<button onClick={handleClick}>Stop</button>)
}

export default BoutonStop; 