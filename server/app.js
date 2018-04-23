import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('*', (req, res) => {
    res.status(200).send({ message: 'We are also trying to figure how you got here' });
});

module.exports = app;