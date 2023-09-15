import { useConfig } from "statsig-react";
import { DYNAMIC_CONFIG_1 } from "./Constant";


export function FetchDynamicConfig() {
  const { config, isLoading } = useConfig(DYNAMIC_CONFIG_1);
  console.log(`Dyanamic config is ${JSON.stringify(config)}`)
  console.log(`isLoading ${isLoading}`)


  // Only required if you have not set waitForInitialization to true
  if (isLoading) {
    return <div>Fetching Values...</div>;
  }

  return <div style={{margin: "20px", display: "flex", flexDirection:"column"}}>
  <h3> {`Test for dyanmic config ${DYNAMIC_CONFIG_1}`}</h3>
  <text style={{color: `${config.value.fontColor}`}}>{config.value.message}</text>

  </div>;
  }