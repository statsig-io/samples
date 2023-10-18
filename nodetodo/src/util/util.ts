import { Statsig } from "statsig-node";
import { FEATURE_NODE } from "../constants/AppConstant";

const user = {
  userID: "12345",
  email: "12345@gmail.com",
};

export async function initializeFeature() {
  try {
    const tempUser = {
      userId: user.userID,
      email: user.email,
      country: "IN",
    };
    const enableDelete = await Statsig.checkGate(tempUser, FEATURE_NODE);
    console.log(`Is feature enable ${enableDelete}`);
  } catch (error) {
    console.error("Error in initializing feature :", error);
  }
}
