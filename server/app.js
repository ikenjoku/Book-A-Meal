import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import path from 'path';

import routes from './routes';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use('/api-docs', express.static(path.join(__dirname, '/docs')));
app.use('/api/v1', routes);

// Errorhandler
app.use((error, req, res, next) => {
  if (error.statusText && error.statusText === 'Bad Request') {
    let messages = [];

    error.errors.forEach((err) => {
      messages = [...messages, ...err.messages];
    });

    return res.status(400).json({
      statusText: error.statusText,
      errors: {
        messages,
      }
    });
  }
  res.status(error.status || 500);
  res.send({ Error: error });
});

export default app;
