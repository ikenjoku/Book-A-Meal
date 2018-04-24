const mealController = require('../controllers').meals;
const menuController = require('../controllers').menu;

module.exports = (app) => {
    app.get('/api/v1', (req, res) => res.status(200).send({
        message: 'Welcome to Book-A-Meal API'
    }));

    app.get('/api/v1/meals', mealController.list);
    app.post('/api/v1/meals', mealController.create);

    app.put('/api/v1/meals/:id', mealController.update);
    app.delete('/api/v1/meals/:id', mealController.destroy);

    app.get('/api/v1/menu', menuController.list);
    app.post('/api/v1/menu', menuController.create);
};