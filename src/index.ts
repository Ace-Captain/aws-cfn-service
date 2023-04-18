import 'reflect-metadata';
import { json } from 'body-parser';
import { plainToInstance } from 'class-transformer';
import express from 'express';
import { Spec } from './models';

const port = 3000;
const app = express();

app.use(json());

app.post('/sync', (req, res) => {
  plainToInstance(Spec, res.json);
});

app.listen(port, () => {
  console.log(`TypeScript with Express http://localhost:${port}/`);
});
