import { useState } from "react";
import {play } from "../js/simple_syntax.js";


function BoutonPlay({gama, setIsPlaying}) {

    const handleClick = () => {
        setIsPlaying(true);
        play(gama);
    }


    return (
        <button onClick={handleClick}>Play</button>
    )
}

export default BoutonPlay; 