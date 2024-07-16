import express from 'express';
import {categoriseHandler} from "./http-api/categorise-handler";

const app = express();
const port = 3000;

app.use(express.json());

app.post('/categorise', categoriseHandler);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})