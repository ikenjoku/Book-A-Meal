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
app.use(express.static(path.join(__dirname, '../client')));
app.use('/api/v1', routes);
app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'client/index.html')));


/**
 * catches errors
 *
 * @param {Object} error error object being passed
 * @param {Object} req express http request obect
 * @param {Object} res express http response obect
 */
app.use((error, req, res) => {
  if (error.name === 'SequelizeDatabaseError' && error.parent.routine === 'DateTimeParseError') {
    return res.status(400).send({
      message: 'Invalid date. Use this format YYYY-MM-DD'
    });
  }
  
  res.status(error.status || 500).send({ message: 'Server error', error });
});


export default app;
