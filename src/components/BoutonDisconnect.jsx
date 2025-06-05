import {on_disconnected} from "../js/gama_client.js";

function BoutonDisconnect() {
    return (
        <button onClick={() => on_disconnected()}>Disconnect</button>
    )
}

export default BoutonDisconnect; 