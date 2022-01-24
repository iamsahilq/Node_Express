import express from 'express';
import responseTime from 'response-time';
import dotenv from 'dotenv';
import cors from 'cors';

import Routes from './src/routes';
import errorHandler from './src/middleware/errorHandler';

dotenv.config();
require('./config/sequelize');

const app = express();
// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  responseTime((req, res, time) => {
    console.log(`${req.method} ${req.url} ${time}`);
  }),
);
// index page
app.get('/', function (req, res) {
  res.render('pages/index');
});
app.get('/dash', function (req, res) {
  res.render('pages/dashboard');
});

app.get('/login', function (req, res) {
  res.render('pages/login');
});
app.use('/api', Routes);

app.get('/ping', (req, res) => {
  res.send(true);
});

app.use(errorHandler);

app.use((req, res) => {
  return res.render('pages/404');
});

export default app;
