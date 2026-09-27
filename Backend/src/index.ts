import express from "express";
import cors from "cors";
import { env } from "./config.js";



const app = express();
app.use(cors());
app.use(express.json());



app.listen(env.PORT, () => {
  console.log(`[SERVER] SignalForge API is running on PORT ${env.PORT}....`);
});
