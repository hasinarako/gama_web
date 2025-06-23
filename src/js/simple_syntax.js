import GAMA from "./../dev/GAMA";

// var ABSOLUTE_PATH_TO_GAMA = 'C:\\git\\';
// var modelPath = ABSOLUTE_PATH_TO_GAMA + 'gama/msi.gama.models/models/Tutorials/Road Traffic/models/Model 05.gaml'; 
// var modelPath =  '/var/www/github/gama/msi.gama.models/models/Tutorials/Road Traffic/models/Model 05.gaml';

// const experiment = new GAMA("ws://51.255.46.42:6001/", modelPath, experimentName);
var experiment=null;


export function connect(experiment){
	
	const host= "localhost";
	const port= 1000;
	const modelPath='C:/Users/rhmha/Downloads/stage/GAMA/headless/samples/roadTraffic/models/model7.gaml';
	const experimentName = 'road_traffic';

	experiment = new GAMA("ws://"+host+":"+port+"/", modelPath, experimentName);
	experiment.logger = log;
	experiment.connect(on_connected);

	return experiment;
}

export function load(experiment){

	if(experiment==null) return;
	// console.log(document.getElementById("model").value);
	//experiment.modelPath='C:/Users/rhmha/Downloads/GAMA_2025.05.4_Windows_with_JDK_10.05.25_f9040ca/headless/samples/roadTraffic/models/model7';
	//experiment.experimentName='road_traffic';

	experiment.setParameters([
		{ "name": "Number of people agents", "value": 111, "type": "int" },
		{ "name": "Value of destruction when a people agent takes a road", "value": 0.2, "type": "float" }
	]);
	experiment.setEndCondition("cycle>=15");
    experiment.launch(onReceiveMsg);


}
export function play(experiment){
	if(experiment==null) return;
	// experiment.play((onReceiveMsg)=>{start_renderer(experiment)});
	experiment.play(onReceiveMsg);

}

export function step(experiment){
	if(experiment==null) return;
	experiment.step(onReceiveMsg);

}

export function pause(experiment){
	if(experiment==null) return;
	experiment.pause(onReceiveMsg);
}


export function evaluation(experiment){
	if(experiment==null) return;

	agents(experiment);
	// experiment.evalExpr("create people number:100;", onReceiveMsg);
	// experiment.evalExpr("length(people)", onReceiveMsg);
	// experiment.evalExpr("cycle", onReceiveMsg);
}


export function agents(experiment){

	if(experiment==null) return;

	let liste = [];
	let final = [];
	let dico = {};
	let bounds = {};
	let temp;
	let sep;

	experiment.evalExpr("to_geojson("+"world.shape"+",\"EPSG:4326\",[\"" + "color" + "\"])", function(message){
		var parsed = JSON.parse(message);
		bounds["bound"]=JSON.parse(JSON.parse(parsed["content"]))["features"][0];
	})

	experiment.evalExpr("world.agents", function(message){

		var parsed = JSON.parse(message)["content"];
		var parsed2 = JSON.parse(parsed)["gama_contents"];


		for (let key of parsed2){
			sep = key["agent_reference"].indexOf(".");
			temp = key["agent_reference"].slice(sep+1);
			sep = temp.indexOf('[');
			liste.push(temp.slice(0,sep));
		};

		final = new Set(liste);
		//result for road_traffic-> {'building', 'road', 'people'}

		for (const species of final){
			
			console.log(species);

			experiment.evalExpr("to_geojson(" + species + ",\"EPSG:4326\",[\"" + "color" + "\"])", function (message) {

			if (typeof message == "object") {

			} else {
				var parsed = JSON.parse(message);

				const geojsonString = parsed.content;  // encore encodé et avec des antislash
				const geojson = JSON.parse(geojsonString);
				
				dico[species]=geojson;    //en clé on a l'id et en valeur on a les données geojson
				//log(geojson);
			}
			}, true);
			
		};
		
	});

	return [bounds,dico];
	
};



export function reload(){
	if(experiment==null) return;
	
	experiment.setParameters([
		{ "name": "Number of people agents", "value": "333", "type": "int" },
		{ "name": "Value of destruction when a people agent takes a road", "value": "0.2", "type": "float" }
	]);
	experiment.setEndCondition("cycle>=10000");
	experiment.reload();
}

export function stop(experiment){

	if(experiment==null) return;
	experiment.stop(onReceiveMsg);
	
}


function on_connected() {
	onReceiveMsg("connected");
	
	// experiment.evalExpr("cycle", onReceiveMsg);


	// experiment.play();
	// experiment.evalExpr("length(people)", onReceiveMsg);
	// experiment.evalExpr("cycle", onReceiveMsg);

}

function onReceiveMsg(e) {
	log(e);
}

export function log(e) {
	const element = document.getElementById("output");
	element.innerHTML +=(e);
	element.innerHTML +=("</br>");
	element.innerHTML +=("------------------------------");
	element.innerHTML +=("</br>");
}