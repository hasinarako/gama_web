import {pause} from "../js/simple_syntax.js";

function BoutonPause({gama,setIsPlaying}) {

   const handleClick = () => {
               setIsPlaying(false);
               pause(gama);
           }
   
       return (
           <button onClick={handleClick}>Pause</button>
       )
   }


export default BoutonPause; 