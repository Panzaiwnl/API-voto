import express from "express"
import "reflect-metadata"

import { router } from "./routes";

import "../../container";

import "../typeorm/index"


const app = express();

app.use(express.json());

app.use(router);



app.listen(3000, () => {
    console.log("Server listening on port 3000!");
})

