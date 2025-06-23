import {agents} from "../js/simple_syntax.js";
function BoutonEval({ gama }) {


  const handleClick = () => {

    agents(gama);
    


  };


  return <button onClick={handleClick}>Evaluation</button>;
}

export default BoutonEval;
