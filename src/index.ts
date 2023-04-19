import 'reflect-metadata';
import { json } from 'body-parser';
import { plainToInstance } from 'class-transformer';
import express from 'express';
import { CloudFormationReconciler } from './aws/cloud-formation-reconciler';
import { UserInput } from './models';

const port = 3000;
const app = express();

app.use(json());

app.post('/sync', (req, res) => {
  let input = plainToInstance(UserInput, req.body.parent);
  let reconciler = new CloudFormationReconciler(input.spec.region);
  void reconciler.apply(input.metadata.name, input.spec.template);
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`TypeScript with Express http://localhost:${port}/`);
});
