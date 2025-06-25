import {play } from "../js/simple_syntax.js";


function BoutonPlay({gama, setIsPlaying, setIsPaused}) {

    const handleClick = () => {
        setIsPlaying(true);
        setIsPaused(false);
        play(gama);
    }


    return (
        <button onClick={handleClick}>Play</button>
    )
}

export default BoutonPlay; 