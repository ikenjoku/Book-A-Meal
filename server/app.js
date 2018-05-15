import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import routes from './routes';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use('/api/v1', routes);

// Errorhandler
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(err.status || 500);
  res.send({ msg: 'Something is not right. Server Error' });
});

export default app;
