import { evaluation } from "../js/simple_syntax.js";

function BoutonEval({ gama, setGeojsonData }) {
  const handleClick = () => {
    const result = evaluation(gama);
    setGeojsonData(result); // update state in parent
  };

  return <button onClick={handleClick}>Evaluation</button>;
}

export default BoutonEval;
