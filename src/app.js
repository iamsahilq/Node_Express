import express from 'express';
import responseTime from 'response-time';
import dotenv from 'dotenv';
import cors from 'cors';

import Routes from './routes';
import errorHandler from './middleware/errorHandler';

dotenv.config();
require('../config/sequelize');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  responseTime((req, res, time) => {
    console.log(`${req.method} ${req.url} ${time}`);
  }),
);
app.use('/api', Routes);

app.get('/ping', (req, res) => {
  res.send(true);
});

app.use(errorHandler);

app.use((req, res) => {
  return res.status(404).send({ message: 'Invalid Url' });
});

export default app;
