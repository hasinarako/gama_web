import {pause} from "../js/simple_syntax.js";

function BoutonPause({gama,setIsPaused}) {

   const handleClick = () => {
        setIsPaused(true);
        pause(gama);
    }
   
       return (
           <button onClick={handleClick}>Pause</button>
       )
   }


export default BoutonPause; 