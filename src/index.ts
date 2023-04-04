import 'reflect-metadata';
import { json } from 'body-parser';
import express from 'express';

const port = 3000;
const app = express();

app.use(json());

app.post('/sync', (req, res) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`TypeScript with Express http://localhost:${port}/`);
});
