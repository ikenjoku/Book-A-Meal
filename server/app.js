import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import path from 'path';
import errorHandler from './middlewares/errorHandler';

import routes from './routes';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use('/api-docs', express.static(path.join(__dirname, '/docs')));
app.use('/api/v1', routes);

// Errorhandler
app.use(errorHandler);

export default app;
