import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import path from 'path';
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpack from "webpack";
import errorHandler from './middlewares/errorHandler';

import routes from './routes';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
 const config = require('../webpack.config');
 const compiler = webpack(config);
 app.use(webpackDevMiddleware(compiler, {
   publicPath: config.output.publicPath,
   contentBase: config.devServer.contentBase,
   historyApiFallback: config.devServer.historyApiFallback,
   hot: true,
 }));
 app.use(webpackHotMiddleware(compiler, {
  path: '/__webpack_hmr',
}));
}

app.use('/api-docs', express.static(path.join(__dirname, '/docs')));
app.use(express.static(path.join(__dirname, '../client/dist')));
// routes
app.use('/api/v1', routes);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../client/dist/index.html')));

// Errorhandler
app.use(errorHandler);

export default app;
