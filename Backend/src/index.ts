import express from "express";
import cors from "cors";
import { env } from "./config.js";
import {healthRouter }from "./routes/health.route.js";
import productsRouter  from  "./routes/product.route.js"
import morgan from "morgan";


const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"))

app.use("/api" , healthRouter)
app.use("/api", productsRouter)

app.listen(env.PORT, () => {
  console.log(`[SERVER] SignalForge API is running on PORT ${env.PORT}....`);
});
