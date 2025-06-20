import {evaluation} from "../js/simple_syntax.js";

function BoutonEval({ gama, setGeojsonData, geojsonData }) {

  let temp;
  let temp1;
  
  const handleClick = () => {

    evaluation(gama);



  };


  return <button onClick={handleClick}>Evaluation</button>;
}

export default BoutonEval;
