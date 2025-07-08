import {connect } from "../js/simple_syntax.js";


//ajout modelpath, host, port et experiment name
function BoutonConnect({setGama, gama}) {

    const handleClick = () => {
        const envir = connect(gama);
        setGama(envir);
    }
 
    return (<button onClick={handleClick}>Connect</button>)
}

export default BoutonConnect; 