import express from 'express';
import {categoriseHandler} from "./http-api/categorise-handler";
import {v4 as uuid} from 'uuid';
import {RequestObject} from "./http-api/request-object";

const app = express();
const port = 3000;

app.use(express.json());

// Append a request id to each request object
app.use((req, res, next) => {
    (req as RequestObject).requestId = uuid();
    next();
});

app.post('/categorise', categoriseHandler as any); // Lazily typing around the request object for the purpose of demo

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})