import { useLayer,useExperiment } from "statsig-react";
import { EXPERIMENT_1, LAYER_1 } from "./Constant";

export function FecthExperiment() {
  
 const { config } = useExperiment(EXPERIMENT_1);
 console.log(`Experiment is ${JSON.stringify(config)}`)

  const { layer, isLoading } = useLayer(LAYER_1);
  console.log(`Layer is ${JSON.stringify(layer)}`)

  // Only required if you have not set waitForInitialization to true
  if (isLoading) {
    return <div>Fetching Values...</div>;
  }

  return (
    <div style={{margin: "20px", display: "flex", flexDirection:"column"}}>
        
        <h3> {config ? `Testing experiment ${config.name}` : "Experiment not initialized."} </h3>
        <text>{config ? `Experiment message ${config.value.message} `: "Message not initialized"}</text>
    {/**<h3>{layer.get("title", "Welcome to Statsig!")}</h3>
      <p>{layer.get("discount", 0.1)}</p>**/}
    </div>
  );
}