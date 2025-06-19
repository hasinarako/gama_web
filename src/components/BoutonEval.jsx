import { start_renderer} from "../js/simple_syntax.js";

function BoutonEval({ gama, setGeojsonData, geojsonData }) {

  let temp;
  let temp1;
  
  const handleClick = () => {

    const result = start_renderer(gama);
    setGeojsonData(result); 

    //console.log(geojsonData);
    //console.log(Object.keys(geojsonData).length);

    // for (let key in geojsonData){
    //   temp = JSON.parse(geojsonData[key]);
    //   temp1 = temp['features'];
    //   console.log(temp1);
    // };

    

  };


  return <button onClick={handleClick}>Evaluation</button>;
}

export default BoutonEval;
