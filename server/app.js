import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import path from 'path';

import routes from './routes';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}
// routes
app.use('/api-docs', express.static(path.join(__dirname, '/docs')));
app.use(express.static(path.join(path.dirname(__dirname), 'client')));
app.use('/api/v1', routes);
app.get('*', (req, res) => res.sendFile(path.join(path.dirname(__dirname), 'client/index.html')));


/**
 * catches errors
 *
 * @param {Object} error error object being passed
 * @param {Object} req express http request obect
 * @param {Object} res express http response obect
 */

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).send({
      message: 'This meal name already exists',
    });
  }
  if (error.name === 'SequelizeDatabaseError' && error.parent.routine === 'DateTimeParseError') {
    return res.status(400).send({
      message: 'Invalid date. Use this format YYYY-MM-DD',
    });
  }
  console.log(error);
  res.status(500).send({ message: 'Something broke!' });
});

export default app;
