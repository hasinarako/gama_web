import {on_connected} from "../js/gama_client.js";

function BoutonConnectBis() {
    return (
        <button onClick={() => on_connected()}>Connect</button>
    )
}

export default BoutonConnectBis; 