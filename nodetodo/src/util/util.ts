import Statsig from "statsig-node";
import { FEATURE_NODE, SERVER_KEY } from "../constants/AppConstant";

const user = {
  userID: "node_user",
  email: "user_node@statsig.com",
  country: "IN",
  browserName:"Chrome"
};

/**
 * To Initialize the sdk to perform other
 * statsig related features
 */
export async function initializeStatsigSdk() {
  try {
    await Statsig.initialize(SERVER_KEY, { environment: { tier: "staging" } });
    console.log("Statsig initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Statsig:", error);
  }
}

/**
 * To read the feature from statsig sdk
 * @returns
 */
export async function isDeleteFeatureEnable(): Promise<boolean> {
  let enableDelete: boolean = false;

  enableDelete = await Statsig.checkGate(user, FEATURE_NODE);
  console.log(`Is delete feature enable ${enableDelete}`);

  return new Promise<boolean>((resolve) => {
    console.log(`Is delete feature enable ${enableDelete}`);
    resolve(enableDelete);
  });
}

export async function getExperiment(){
  const experiment = await Statsig.getExperiment(user, "item_sorting");
  console.log(`Experiment is ${JSON.stringify(experiment)}`)
}

export async function getDynamicConfig(){
  const config = await Statsig.getConfig(user, "warning_banner");
  console.log(`Dynamic config is ${JSON.stringify(config)}`)
}

/**
 * A wrapper method to log CRUD events
 * @param tag 
 * @param message 
 * @param info 
 */
export function logEvent(tag: string, message: string, info: any){
  Statsig.logEvent(user, tag, message, info);
}
