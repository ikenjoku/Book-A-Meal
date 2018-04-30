import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import mealsRouter from './routes/mealsRouter';
import menuRouter from './routes/menuRouter';
import ordersRouter from './routes/ordersRouter';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/menu', menuRouter);
app.use('/api/v1/orders', ordersRouter);


app.get('/', (req, res) => {
  res.status(200).send('Welcome home, Book_A_Meal');
});

module.exports = app;
