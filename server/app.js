import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import path from 'path';
import errorHandler from './middlewares/errorHandler';

import routes from './routes';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '200mb' }));
app.use(bodyParser.urlencoded({ limit: '200mb', extended: false }));
if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}
// routes
app.use('/api-docs', express.static(path.join(__dirname, '/docs')));
app.use('/api/v1', routes);
app.get('/*', (req, res) => res.sendFile(path.join(path.dirname(__dirname), 'client/index.html')));

// Errorhandler
app.use(errorHandler);

export default app;
