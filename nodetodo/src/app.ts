import Statsig from "statsig-node";
import express, {Request, Response } from 'express';
import { PORT, SERVER_KEY } from "./constants/AppConstant";

const app = express();

// To disable the certificate verification, without this sdk initialization
// is giving error
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

async function initializeStatsig() {
  try {
    await Statsig.initialize(
      SERVER_KEY,
      { environment: { tier: "staging" } }
    );
    console.log("Statsig initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Statsig:", error);
  }
}

initializeStatsig();

app.get('/', (req: Request, res: Response) => {
  res.send('A Sample Node Todo App');
});

app.listen(PORT, () => {
  console.log(`Node server is running on port ${PORT}`);
});