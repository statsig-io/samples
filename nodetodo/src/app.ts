import cors from "cors";
import express, { Request, Response } from "express";
import { PORT } from "./constants/AppConstant";
import { router } from "./network/todoApis";
import { createTodoTable, db } from "./db/db";
import { initializeStatsigSdk } from "./util/util";

const app = express();

// To disable the certificate verification, without this sdk initialization
// is giving error
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

initializeStatsigSdk();

app.use(express.json());

app.use(cors());

db.serialize(() => {
  createTodoTable();
});

app.get("/", (req: Request, res: Response) => {
  res.send("A Sample Node Todo App");
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Node server is running on port ${PORT}`);
});
