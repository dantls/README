import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import path from 'path';
import './database';
import { errors } from 'celebrate';
import routes from './routes';

const app = express();
app.use(cors());

app.use(express.json());

app.use(routes);

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

app.use(errors());

app.listen(3333, () => {
  console.log('Server Ok.');
});
