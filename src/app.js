import express from 'express';
import responseTime from 'response-time';
import Routes from './routes';
const app = express();

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

app.use((req, res) => {
  return res.status(404).send({ message: 'Invalid Url' });
});

export default app;
