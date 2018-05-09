import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import routes from './routes';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization, Content-Type');
    next();
  });
}

// routes
app.use('/api/v1', routes);

// catch 404
app.use((req, res, next) => {
  const err = new Error('Oops! Page Not Found');
  err.status = 404;
  return res;
});

// Errorhandler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({ msg: 'Something is not right. Server Error' });
});

export default app;
