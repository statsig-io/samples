import { useEffect } from "react";
import { useGate } from "statsig-react";
import { FEATURE_GATE_1 } from "./Constant";


export function FetchGateSample({deleteFeatureFlag,setDeleteFeatureFlag}) {
  //const { value, isLoading } = useGate(FEATURE_GATE_1);
  const { value,isLoading } = useGate(FEATURE_GATE_1);

  console.log(`Value is ${value}`)
  console.log(`isLoading ${isLoading}`)

  useEffect(() =>{
    setFlag()
    },[value])

  function setFlag () {
    setDeleteFeatureFlag(value);
    console.log(`Changed value is ${value}`)

  };

  // Only required if you have not set waitForInitialization to true
  if (isLoading) {
    return <div>Fetching Values...</div>;
  }

  return <div style={{margin: "20px", display: "flex", flexDirection:"column"}}>
    <h3> {`Testing gate is ${FEATURE_GATE_1}`}</h3>
    <text>{value ? `Statsig gate ${FEATURE_GATE_1} passed.` : `Statsig gate ${FEATURE_GATE_1} failed.`}</text>
  
    </div>;
}