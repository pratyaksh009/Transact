import express, { json } from "express";
import cors from "cors";

import { mainRouter } from "./routes/index.js";

const app = express();
app.use(cors());
app.use(json());

app.use("/api/v1", mainRouter);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
