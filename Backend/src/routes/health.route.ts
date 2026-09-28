import { Router } from "express";
import { pingDatabricks } from "../databricks/sql.js";

const healthRouter = Router()


healthRouter.get("/", async (_req,res) => {

    const dataBricksConnected= await pingDatabricks().catch( ()=> false )

    res.status(200).json({
        ok:dataBricksConnected,
        result:{dataBricksConnected}
    })
})

export default healthRouter