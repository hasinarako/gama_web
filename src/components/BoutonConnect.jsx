import {connect } from "../js/simple_syntax.js";

function BoutonConnect({setGama}) {


    const handleClick = () => {
        const envir = connect();
        setGama(envir);
    }
 
    return (<button onClick={handleClick}>Connect</button>)
}

export default BoutonConnect; 