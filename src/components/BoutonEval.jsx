import { evaluation } from "../js/simple_syntax";

function BoutonEval({ gama }) {


  const handleClick = () => {
    evaluation(gama);
    
  };


  return <button onClick={handleClick}>Evaluation</button>;
}

export default BoutonEval;
